<?php
require_once("../util/helper.php");
import("api/user");
import("api/cat");
import("api/product");
import("api/cart");
import("api/location");
import("api/user_location");
import("api/order");
import("api/comment");
import("api/merchant");
//phpinfo(); die();

init();
function iNIt()
{
    session_start();
    parse_uri();
}

function parse_uri()
{

    $uri = explode('?', $_SERVER['REQUEST_URI'])[0];
    $uri = trim($uri, '/');
    $arr = explode('/', $uri);
    $param = array_merge($_GET, $_POST);

    switch ($arr[0]) {
        case '':
            import('view/public/nav_home');
            break;
        case"home":
            import('view/public/home');
            break;
        case"api":
            $klass = $arr[1];//类名
            $method = $arr[2];//方法


            if (!has_permission_to($method, $klass)) {
                json_die("permission_is_not");
            }
//        dd($klass);
//        dd($method);
//        dd($_FILES);
            $msg = [];
            $r = (new $klass)->$method($param, $msg);
            //$r是一个实例化的类,
            if ($r === false)
                json_die(e($msg));
            json_die(s($r));
            break;


        case "user":
            if ($arr[1] == "comment") {
                import("view/public/comments");
            }
            break;


        case"login":
            import("view/public/login");
            break;
        case "signup":
            import("view/public/signup");
            break;
        case "admin":
            import("view/admin/" . $arr[1]);
            break;
        case "referral":
            import("view/public/referral");
            break;
        case 'logout':
            User::logout();
            redirect('/login');
            break;
        case "order":
            if (!$_SESSION["user"][0]["id"]) {
                import('view/public/home');
                die();
            }
            import("view/public/order");
            break;
        case "center":
            import("view/public/center");
            break;
        case "location":
            import("view/public/location");
            break;
        case "order_ok":
            import("view/public/order_ok");
            if (!$_SESSION["user"][0]["id"]) {
                import('view/public/home');
                die();
            }
            break;

    }


}


function has_permission_to($model, $klass)
{
    //$model是方法
    //$klass是类名
//    dd($model, $klass);

    $public = [//开放端口
        'user' => ['signup', 'login', 'logout', 'is_logged_in'],
        'product' => ['read'],
        "cat" => ['read'],
        "order" => ["add_order"],
        "user_location" => ["read_user_location", "text", "find_location_title"]
    ];

    $private = [//权限端口
        'product' => [
            'add' => ['admin'],
            'test' => ['admin'],
            'remove' => ['admin'],
            'buy' => ['user', 'admin'],
            'his_product' => ['user', 'admin'],
            'find_id' => ['admin', 'user'],
            'read_cat' => ['admin'],
            'cat_null' => ['admin'],
            "add_i" => ["admin"],

        ],
        'cat' => [
            'read' => ['user', 'admin', 'hr'],
            'add' => ['admin'],
            'remove' => ['admin'],
            'update' => ['admin'],
            'test' => ['admin'],
            'find_id' => ['admin'],
        ],
        'user' => [
            'read' => ["admin"],
            'remove' => ['admin'],
            'update' => ['admin'],
        ],
        'cart' => [
            'read' => ['user', 'admin', 'hr'],
            'add' => ['admin', 'user'],
            'read_user_id' => ['admin', 'user'],
            'remove' => ['admin', "user"],
            'update' => ['admin'],
            'test' => ['admin'],
            'find_id' => ['admin'],
        ],
        "location" => [
            'read_type' => ["user", "admin"],
            'render_data' => ["user", "admin"],
            'remove' => ["admin", "user"]
        ],
        "user_location" => [
            'text' => ["user", "admin"],
            'read_user_location' => ["user", "admin"],
            'remove' => ["admin", "user"],
            'find_location_title' => ["admin", "user"],

        ],

        "comment" => [
            'add' => ["user", "admin"],
            'read_user_id' => ["user", "admin"],
            'read' => ["user", "admin"],

        ],
        "order" => [
            'render_data' => ["user", "admin"],
            'render_data_comment' => ["user", "admin"]
        ],
        "merchant" => [
            'read_submit' => ["admin"],
            'chant_accept' => ["admin"],
            'money' => ["admin"],

        ],
    ];


    //$klass=cat
    //$model=read

    //检查传进来的方法是否是已经定义的
    //如果是没有定义的,返回
    if (!key_exists($klass, $public) && !key_exists($klass, $private)) {
        var_dump(1);
        return false;
    }


    //如果请求接口在public中就直接返回true;
    $klass_public = @$public[$klass];
    //如果有这个数组,或者床进来的方法,在这个数组中
    //返回true
    if ($klass_public && in_array($model, $klass_public)) {
        return true;
    }


    //检查传进来的类名是否在权限数组中定义了
    $klass_arr = @$private[$klass];
    //如果没有这个数组,或者传进来的方法不在这个数组中
    if (!$klass_arr && in_array($model, $klass_arr)) {
        return true;
    };

//    dd($model);

//    dd($klass_arr);
    //拿到权限数组表
    $permissions_arr = @$klass_arr[$model];
    //拿到当前用户的权限
    $user_permissions = @$_SESSION["user"][0]["permissions"];
//dd($user_permissions);
//    dd($permissions_arr);

    //检查用用户的权限是否出现在权限数组中

    if (!in_array($user_permissions, $permissions_arr)) {
        return false;
    }


    return true;

}



