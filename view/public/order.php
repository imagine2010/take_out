<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>订单页</title>
    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/lib/bootstrap.css">
    <link rel="stylesheet" href="/css/public/order.css">
</head>
<body>

<div class="col-md-12 nav">
    <div class="_container">
        <div class="col-md-6">
            <a href="/home"><span class="nav_tit">表食堂</span></a>
        </div>
 <div class="col-md-6 nav_i" >
     <?php
     echo login_in() ? "<div style='text-align: right; padding-right: 40px;padding-bottom: 9px' class='user'>" . his("username") . "
<div id='user_btn' hidden>
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
         <a class="admin_i" style="font-size: 15px;text-decoration: none;color: white" href="/admin/chant">管理</a>
     <?php
     endif;
     ?>


 </div>
    </div>
</div>

<div class="col-md-12 title">
    <div class="_container">
        <div class="col-md-6">
            <div class="title_nav_i">
                <h2 class="title_nav">表食堂</h2>
                <h4 class="title_nav">/确认订单</h4>
            </div>
        </div>
        <div class="col-md-6">
            <img class="img_nav" src="../phone/nav.png" alt="">
        </div>
    </div>
</div>


<div class="_container">
    <div class="col-md-4 buy_content">
        <div class="buy_content_i">
            <div class="buy_title">
                <h4 class="buy_msg">订单信息</h4>
                <span class="buy_go"><a href="/"> < 返回商家修改</a> </span>

            </div>
            <div class="buy_nav">
                <span class="col-md-4 product_title title__">商品</span>
                <span class="col-md-4 product_title">数量</span>
                <span class="col-md-4 product_title money__">小计(元)</span>
            </div>
            <div class="show_buy">

            </div>
            <div class="buy_foot">
                <span class="col-md-6 _msg">配送费</span>
                <span class="col-md-6 _money">¥8</span>
            </div>

            <div class="col-md-12">

                <div class="order_money">

                </div>
            </div>
        </div>

    </div>
    <div class="col-md-8 order_content">
        <h4>收货地址</h4>
        <div class="col-md-12 location_o">
            <!-- 地址显示区       -->
        </div>
        <div class="show_all_location">显示更多地址</div>

        <div class="col-md-12 pay" style="padding: 0">
           <div class="col-md-12" style="padding: 0">
               <h4 style="display: inline-block;padding: 0;margin-top: 20px">付款方式</h4>
               <span style="color:#ff9c00; ;font-size: 13px">目前仅支持货到付款</span>
           </div>
            <!--        显示付款方式-->
            <div class="col-md-6 wx">
                <div class="pay__ wx_">网络付款
                    <br>
                <span style="color: #666">支持微信,支付宝银联</span>
                </div>
            </div>
            <div class="col-md-6 rmb">
                <div class="pay__ _money_">货到付款
                    <br>
                <span style="color: #666">支持人民币,美元,欧元等</span>
                </div>
            </div>
        </div>
        <div class="col-md-12 on_sale" style="padding: 0">
              <h4 style="padding: 0; display:inline-block;margin-top: 35px">选择优惠</h4>
            <br>
            <!--        红包和抵扣-->
            <span style="font-size: 16px;font-weight: 500;margin: 5px;display: inline-block">使用红包</span>
            <span style="font-size: 14px;color: #666">暂无红包可用</span>
            <br>
            <span style="font-size: 16px;font-weight: 500;margin: 8px;display: inline-block">使用优惠券</span>
            <span style="font-size: 14px;color: #666">暂无优惠券可用</span>
        </div>

        <div class="comment">
            <form class="from_order">
                  <h4 style="padding: 0;margin-top: 35px;display: inline-block">其他信息</h4>
                <br>

                   <div class="col-md-12" style="padding: 0;">
                       <div class="col-md-2 text__">
                           <span>订单备注</span>
                       </div>
                       <div class="col-md-10">
                           <input type="text" class="inp__" name="note" placeholder="您的忌口">
                       </div>
                   </div>

                  <div class="col-md-2 text__">
                      <span>发票信息</span>
                  </div>
                  <div class="col-md-10">
                      <input class="invoice_title inp__" type="text" name="invoice_title" placeholder="在此填写您的发票信息">
                      <select name="invoice_msg" id="" class="invoice_msg" hidden>
                          <option value="公司">公司</option>
                          <option value="个人">个人</option>
                      </select>
                  </div>

                <div class="col-md-12" style="text-align: left;margin-top: 25px">
                <button  class="btn_ok">确认下单</button>
                </div>
            </form>
        </div>

    </div>
</div>




<div hidden>
    <input class="user_id" type="text" value=" <?php echo $_SESSION["user"][0]["id"] ?>   ">
</div>


<?php
import("public/js/util/similarity");
?>
<script src="/js/public/model_buy.js"></script>
<script src="/js/public/order.js"></script>
</body>

</html>