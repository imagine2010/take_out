<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/lib/bootstrap.css">
    <link rel="stylesheet" href="/css/public/order_ok.css">
    <title>订单管理</title>
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
            <a href="">  <div class="nav_bar_i">订单管理</div></a>
            <a href="location"><div class="nav_bar_i">地址管理</div></a>
        </div>
    </div>

    <div class="col-md-10 or_sh">
        <div class="col-md-12">
            <div class="col-md-2">
                <div class="time_or">
                    <h5 class="all_order"> 最近订单</h5>
                </div>
            </div>
            <div class="col-md-2">
                <div class="or_con">
                    <h5 class="order_nav_comment">待评价订单</h5>
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <div class="recently_order">
                <!--最近订单显示区-->
            </div>
            <div class="comment_order" hidden>
                <!--            待评价订单显示区-->
            </div>


        </div>
    </div>



<?php
import("public/js/util/similarity");
?>
<script src="/js/public/order_ok.js"></script>
</body>
</html>