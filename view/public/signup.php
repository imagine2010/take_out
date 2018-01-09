<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/lib/bootstrap.css">
    <link rel="stylesheet" href="/css/public/signup.css">
    <title>注册</title>
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
        <div class="col-md-2"style="padding-top: 44px;">
            <span>欢迎注册</span>
        </div>
    </div>
    <div class="col-md-6 alert_i">
    </div>

</div>

<div class="col-md-12 login_nav">
    <div class="col-md-7">
        <img src="../phone/signup2.jpg" alt="">

    </div>


<div class="col-md-5">
    <div class="login">
        <form id="from">
            <label for="exampleInputEmail1" class="msg">用户名:</label>
            <br>
            <label for="exampleInputEmail1" class="msg">最大长度24，最低长度4，仅支持文字，英文，数字</label>
            <input type="text" name="username" class="form-control" id="exampleInputName2" placeholder="用户名">
            <br>
            <label for="exampleInputEmail1" class="msg">密码:</label>
            <br>
            <label for="exampleInputEmail1" class="msg">最大长度64，最低长度6，仅支持数字英文组合</label>
            <input type="password" name="password" class="form-control" id="exampleInputName2" placeholder="密码">
            <br>
            <a href="login" class="class="msg_i">已有账号？马上登陆</a>
            <br>
            <br>
            <button class="btn btn-default" type="submit">注册</button>
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
<script src="/js/public/signup.js"></script>
</body>
</html>