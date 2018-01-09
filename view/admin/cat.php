<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>分类管理</title>
    <link rel="stylesheet" href="/css/lib/bootstrap.css">
    <link rel="stylesheet" href="/css/admin/cat.css">
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
        <a href="/admin/chant"> <div class="nav_bar_i">商家管理</div> </a>
        <a href=""> <div class="nav_bar_i">分类管理</div> </a>
        <a href="/admin/product"> <div class="nav_bar_i">商品管理</div> </a>
        <a href="/admin/user"> <div class="nav_bar_i">用户管理</div> </a>
    </div>
</div>


<!--    <div id="nav">-->
<!--    <ui>-->
<!--        -->
<!--    </ui>-->
<!--</div>-->


<div class="col-md-10">
    <form id="form">
        <input type="text" name="id" hidden>
        <input type="text" name="title" placeholder="分类名称" class="form-control inp_cat">
        <button type="submit" class="btn btn-default btn_cat">提交</button>
    </form>

    <div id="list">
        <table>
            <thead class="text">
            <th class="col-md-1 nav_">id</th>
            <th class="col-md-1 nav_">标题</th>
            <th class="col-md-1 nav_ opt">操作</th>
            <th class="col-md-1 nav_ opt">操作</th>
            </thead>

            <tbody>
            <!--        渲染区域-->

            </tbody>
        </table>
    </div>

</div>
<?php
import("public/js/util/similarity");
?>
<script src="/js/admin/model.api.js"></script>
<script src="/js/admin/model.ui.js"></script>
<script src="/js/admin/cat.js"></script>

</body>
</html>