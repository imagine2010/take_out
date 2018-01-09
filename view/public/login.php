<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/lib/bootstrap.css">
    <link rel="stylesheet" href="/css/public/login.css">
    <title>登录</title>
</head>
<body>
<div class="col-md-12 title">
    <!--    <h2>表食堂</h2>-->
    <div class="col-md-6">

        <div class="col-md-3">
            <a href="/">
                <img class="logo" src="../phone/biao_logo.png" alt="">
            </a>
        </div>
        <div class="col-md-2" style="padding-top: 44px;">
            <span>欢迎登陆</span>
        </div>
    </div>


    <div class="col-md-6 alert_i">

    </div>

</div>
<div class="col-md-12 login_nav">
    <div class="col-md-7">
        <img src="../phone/1.jpg" alt="">
    </div>


    <div class="col-md-5">
        <div class="login">
            <form id="from">
                <label for="exampleInputEmail1" class="msg">用户名:</label>
                <input type="text" name="username" class="form-control" id="exampleInputName2" placeholder="用户名"
                       value="whh09">
                <br>
                <label for="exampleInputEmail1" class="msg">密码:</label>
                <input type="password" class="form-control" name="password" placeholder="密码" value="123456">
                <br>
                <input type="checkbox" name="love_me" checked class="msg"> 记住我<br>
                <br>
                <a href="signup" class="msg_i">还没有账号?马上注册</a>
                <br>
                <br>
                <button class="btn btn-default btn_login" type="submit">登录</button>
            </form>
        </div>
    </div>
</div>

<div class="col-md-12" style="text-align: center">
    <div class="buttom">
        <span>关于我们</span>
        <span>Copyright © 1860-2017 表食堂 Download All Rights Reserved.</span>
        <br>
        <div>
            <a href="http://www.sda.gov.cn/WS01/CL0001/" target="_Blank">食品药品监督局</a>
            <a href="http://www.119.gov.cn/xiaofang/" target="_Blank">公安部消防网</a>
            <a href="http://www.ccdi.gov.cn/" target="_Blank">中纪委监察</a>
            <a href="http://www.315.gov.cn/" target="_Blank">315消费者权益网</a>
            <a href="http://www.saic.gov.cn/" target="_Blank">中国工商行政管理总局</a>
            <a href="http://www.cfsn.cn/" target="_Blank">中国食品安全网</a>
        </div>

    </div>
</div>


<?php
import("public/js/util/similarity");
?>
<script src="/js/admin/user_admin.js"></script>
<script src="/js/public/login.js"></script>
</body>
</html>