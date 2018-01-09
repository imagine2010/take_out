<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/lib/bootstrap.css">
    <link rel="stylesheet" href="/css/admin/chant.css">

    <title>商家管理</title>
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
        <a href="/home"> <div class="nav_bar_i">首页</div> </a>
        <a href=""> <div class="nav_bar_i">商家管理</div> </a>
        <a href="/admin/cat"> <div class="nav_bar_i">分类管理</div> </a>
        <a href="/admin/product"> <div class="nav_bar_i">商品管理</div> </a>
        <a href="/admin/user"> <div class="nav_bar_i">用户管理</div> </a>
    </div>
</div>








<div class="col-md-10">
<div class="col-md-4">
    <span class="text_span">今日营业额:</span>
    <br>
    <span class="money_ii"></span>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
<div class="col-md-12">
    <div class="col-md-6 ord_nav">
        <h5 class="ok_buy_btn">客户已确认</h5>
    </div>
     <div class="col-md-6">
         <h5 class="wait_buy_btn">待客户确认</h5>
    </div>
    <div class="col-md-12 wait_buy" hidden>
    </div>
    <div class="col-md-12 ok_buy">
    </div>
</div>



</div>
<div class="col-md-4">
    <span class="text_span_">待发货</span>
    <div class="wait_out">

    </div>
<!--    显示已经接单的订单-->
<!--    等待发货区-->
</div>
    <div class="col-md-4">
        <span class="text_span_">接单区</span>
        <div class="submit_order" style="background-color:lemonchiffon;;">

        </div>
        <!--        显示刚提交的订单执-->
        <!--        执行接单操作-->
        <!--        执行拒单操作-->
    </div>

</div>
<audio id="bgMusic">
    <source = src="/js/admin/2478.mp3" type="audio/mp3">
</audio>



<?php
import("public/js/util/similarity");
?>
<script src="/js/admin/chant.js"></script>
</body>
</html>