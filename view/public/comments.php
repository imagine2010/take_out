<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/lib/bootstrap.css">
    <link rel="stylesheet" href="/css/public/comments.css">
    <title>评论</title>
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


<div class="container">
    <div class="col-md-12 order_content">
        <div class="col-md-12" style="text-align: center">
        <h5>评价订单</h5>
        </div>
        <div class="col-md-12 order_time" style="text-align: center">
            <!--        订单号和订单时间-->
        </div>
        <div class="col-md-12">
            <div class="col-md-4 order_product">
                <!--        展示订单商品-->

            </div>

            <div class="col-md-7">
                <form class="form_comment">
                    <textarea name="text" id="" cols="30" rows="8" class="comment form-control" placeholder="输入您的评论"></textarea>
                    <br>
                    <input type="file" name="cover" placeholder="产品图">
                    <div class="col-md-12 btn_con">
                        <button type="submit" class="btn_con_">评论</button>
                    </div>
                </form>

            </div>
        </div>
        <!--   展示订单信息区-->
    </div>
</div>


<?php
import("public/js/util/similarity");
?>
<script src="/js/public/comments.js"></script>

</body>
</html>