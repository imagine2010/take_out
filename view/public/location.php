<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>地址管理</title>
    <link rel="stylesheet" href="/css/lib/bootstrap.css">
<!--    <link href="https://cdn.bootcss.com/picnic/6.4.0/picnic.min.css" rel="stylesheet">-->
    <link rel="stylesheet" href="/css/public/location.css">
</head>
<body>
<div hidden>
    <input class="user_id" type="text" value=" <?php echo $_SESSION["user"][0]["id"] ?>   ">
</div>


<div class="col-md-12 nav">
    <div class="_container">
        <div class="col-md-6">
            <span><a href="/home">表食堂</a> </span>
        </div>

        <div style="text-align: right" class="col-md-6">
            <?php
            echo login_in() ? "<div style='width: 100px;text-align: center' class='user'>" . his("username") . "
<div id='user_btn'>
<div class='user_btn'><a href='/order_ok'>个人中心</a> </div>
<div class='user_btn'><a class='logout' href='logout'>退出登录</a> </div>
<div class='user_btn'></div>
</div>
</div>" : "游客,您好!";
            ?>
            <?php
            if (!login_in()): ?>
                <a href="login">登录</a>
                <a href="signup">注册</a>
            <?php else: ?>
                <!--        <a class="logout" href="">登出</a>-->
            <?php endif; ?>
            <?php
            //dd(his("permissions"));
            if (his("permissions") === "admin"):
                ?>
                <a href="/admin/chant">管理</a>
            <?php
            endif;
            ?>
        </div>
    </div>


</div>







<div class="col-md-2" style="padding: 0">
    <div class="nav_bar">
        <a href="/order_ok">  <div class="nav_bar_i">订单管理</div></a>
        <a href=""><div class="nav_bar_i">地址管理</div></a>
    </div>
</div>






<div class="col-md-10" style="padding: 0">
    <div class="col-md-12 location" style="padding: 0">
        <span class="nav_show">此处显示您已有的地址</span>
        <div class="show_location_i col-md-12" style="padding: 0">
<!--            地址显示区-->
        </div>

        <div class="col-md-12">
            <span class="nav_show">您可以在此新增地址</span>
            <form id="location_add">
                <p id="wrapper"></p>
                <input name="site" type="text" class="detail form-control btn_i" placeholder="请填写详细地点" hidden>
                <br>
                <input name="phone" type="text" class="phone form-control btn_i" placeholder="收货人电话" hidden>
                <br>
                <input name="username" type="text" class="username form-control btn_i" placeholder="收货人姓名" hidden>
                <br>
                <button type="submit" class="btn_add" hidden>添加</button>
            </form>
        </div>

    </div>
</div>





<!--<div class="col-md-12">-->
<!--    <span>关于我们</span>-->
<!--    <span>联系我们</span>-->
<!--    <span>商务合作</span>-->
<!--    <span>团体订餐</span>-->
<!--</div>-->





<?php
import("public/js/util/similarity");
?>

<script src="/js/public/location.js"></script>
</body>
</html>