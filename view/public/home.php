<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>表食堂</title>
    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/lib/bootstrap.css">
    <link rel="stylesheet" href="/css/public/home.css">
</head>
<body>
<div class="col-md-12 nav_">
    <div class="row">
        <div class="nav">
            <div class="_container">
                <div class="col-md-6">
                    <span style="margin-right: 40px;font-size: 15px">表食堂</span>
                    <span style="font-size: 15px"><a href="order_ok">订单中心</a> </span>
                </div>

                <div style="text-align: right;" class="col-md-6">
                    <?php
                    echo login_in() ? "<div style='text-align: right; padding-right: 40px;padding-bottom: 9px' class='user'>" . his("username") . "
<div id='user_btn'>
<div><a style='color: #000;font-size: 15px' href='/order_ok'>个人中心</a> </div>
<div><a class='logout' style='color: #000;font-size: 15px' href='logout'>退出登录</a> </div>
</div>
</div>" : "<span style='font-size: 15px'>游客,您好!</span>     ";
                    ?>
                    <?php
                    if (!login_in()): ?>
                        <a href="login" style="margin-left: 40px;font-size: 15px">登录</a>
                        <a style="font-size: 15px" href="signup">注册</a>
                    <?php else: ?>
                        <!--        <a class="logout" href="">登出</a>-->
                    <?php endif; ?>
                    <?php
                    //dd(his("permissions"));
                    if (his("permissions") === "admin"):
                        ?>
                        <a style="font-size: 15px" href="/admin/chant">管理</a>
                    <?php
                    endif;
                    ?>
                </div>
            </div>
        </div>


    </div>


    <div class="col-md-6 title-">
        <div class="img_logo" style="display: inline-block">
            <img src="../phone/zhuti.jpg" alt="">
            <div style="display: inline-block;" class="logo-title">
                <h3 style="margin-top: 8px;">表食堂</h3>
                <h5>🌟🌟🌟🌟🌟月售1088单</h5>
            </div>
        </div>


    </div>

    <div class="col-md-6 title- referral">
        <div class="dip">
            <h4>起送价</h4>
            <h5>¥0</h5>
        </div>
        <div class="dip">
            <h4>配送费</h4>
            <h5>¥8</h5>
        </div>
        <div class="dip">
            <h4>平均送达速度</h4>
            <h5>37分钟</h5>
        </div>
    </div>


</div>

<div class="col-md-12 product_nav">
    <div class="_container">


        <div class="col-md-5 text_">
            <div class="dip all_">
                <h5 class="all_product">所有商品 </h5>
            </div>
            <div class="dip text_i">
                <h5 class="comment">评价</h5>
            </div>
            <div class="dip">
                <h5><a href=""></a></h5>
            </div>
        </div>
        <div class="col-md-4">
            <div class="dip">
                <h5>排序方式</h5>
            </div>
            <div class="dip">
                <h5>星级</h5>
            </div>
            <div class="dip">
                <h5>销量</h5>
            </div>
            <div class="dip">
                <h5>价格</h5>
            </div>
        </div>
        <div class="col-md-3">
            <form id="btn_s" class="serch">
                <input type="text" class="form-control input_serch" placeholder="搜索美食">
                <button class="btn btn-default btn_serch">搜索</button>
            </form>

        </div>

    </div>


</div>



<div class="_container">
    <div class="col-md-9">
        <div id="show_all">
            <div id="show_cat">
                <!--        分类展示区-->
            </div>
            <br>
            <div id="show_product">
                <!--        商品展示区-->
            </div>
        </div>
        <div class="comment_show" hidden>

        </div>


    </div>

    <div class="col-md-3">
        <div class="_msg">
            <div class="msg_title">
                <span>商家公告</span>
            </div>
            <div class="msg_conter">
                <span>今日上新:<br>南瓜百分羹,紫薯芋泥.<br>欢迎下单品尝</span>
            </div>
            <div class="msg_foot">
                <span>配送费说明:<br>¥8</span>

            </div>
            <div class="msg_foot_i">
                <span>
                </span>
            </div>
        </div>
    </div>

</div>



<div id="shop_bus">
    <div style="background-color:#fafafa;height: 40px; margin-top:8px;margin-left: 10px">
    <span>购物车</span>
    <span class="clear_buy">[清空]</span>
    </div>
    <div id="buy_content">
        <!--购物车展示区-->
    </div>
    <div id="go_buy">
        <div class="col-md-6 go_buy">
            <div class="money"></div>

        </div>
        <div class="col-md-6 buy_btn_ account">
            <span>去结算-></span>
<!--            <button class="account">结算</button>-->
        </div>
    </div>
</div>



<div class="show_product_i" hidden>
</div>
<div hidden>
    <input class="user_id" type="text" value=" <?php echo $_SESSION["user"][0]["id"] ?>   ">
</div>

<?php
import("public/js/util/similarity");
?>
<script src="/js/public/model_buy.js"></script>
<script src="/js/admin/model.api.js"></script>
<script src="/js/admin/model.ui.js"></script>
<script src="/js/admin/user_admin.js"></script>

<script src="js/public/home.js"></script>
</body>
</html>