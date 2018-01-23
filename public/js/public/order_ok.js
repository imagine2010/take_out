;(function () {
    "use strict";
    let recently_order = document.querySelector(".recently_order");
    let user_id = parseInt(document.querySelector(".user_id").value);
    let comment_order = document.querySelector(".comment_order");
    let order_nav_comment = document.querySelector(".order_nav_comment");
    let all_order = document.querySelector(".all_order");
    let user = document.querySelector(".user");
    let or_con=document.querySelector(".or_con")
    let time_or=document.querySelector(".time_or");


    init();

    function init() {
        setInterval(get_order_data, 1000);
        get_order_data();
        get_data_comment();
        user_event();
    }

    function user_event() {
        let user_btn = document.querySelector("#user_btn");
        console.log("user_btn", user_btn);
        if (user) {
            user.addEventListener("mouseover", function () {
                user_btn.style.display = "block";
                user.addEventListener("mouseout", function () {
                    user_btn.style.display = "none";
                })
            })
        }
    }

    //首先获取所有的订单数据
    function get_order_data() {
        $.post("/api/order/render_data", {id: user_id})
            .then(function (r) {
                //拿到数据之后渲染
                render_order(r.data, recently_order);

            })
    }

    function get_data_comment() {
        $.post("/api/order/render_data_comment", {id: user_id})
            .then(function (r) {
                console.log("r",r);
                render_order(r.data, comment_order);
            })
    }

    function render_order(data, el_fa) {
        el_fa.innerHTML = '';

        //首先迭代一个整个订单数据
        data.forEach(function (item) {
            if (el_fa == comment_order) {
                if (item.comment) {
                    return;
                }
            }
            let state = item.condition;
            //解码订单快照的json数据
            let snapshot = JSON.parse(item.snapshot);
            let time_or = item.created_at;
            //创建总的订单容器;
            let el = document.createElement("div");
            el.classList.add("col-md-12")//给总的订单数据占据整宽
            el.classList.add("show_order")//给总的订单数据占据整宽
            let product_i = document.createElement("div");//创建总的商品区域
            product_i.classList.add("col-md-3")//给总的商品区域定
            product_i.innerHTML = `
             <span class="time_ca">订单时间:${time_or}</span>
                <br>
            `;
            for (let product in snapshot.product) {//迭代商品数组
                let el_product = document.createElement("div");//创建每一个商品区域
                el_product.innerHTML = `
               <div class="pro_show">
                ${snapshot.product[product].title}*
                ${snapshot.product[product].count}* ¥
                ${snapshot.product[product].price}
</div>
               
            `;
                product_i.appendChild(el_product);//将商品数据显示在商品区域
            }


            let location_i = document.createElement("div");//创建总的地址区域
            location_i.classList.add("col-md-3")//给总的地址区域定宽
            let el_location = document.createElement("div");//创建每一个地址区域
            el_location.classList.add("loca_show");
            location_i.innerHTML = `
            <span class="time_ca">收货信息</span>
            `;
            el_location.innerHTML = `
<div class="pro_show">
    ${snapshot.location.location}
                <br>
                                ${snapshot.location.username}
                                <br>
                ${snapshot.location.phone}
</div>
            
            `;
            location_i.appendChild(el_location);//将商品数据显示在商品区域


            let invoice_i = document.createElement("div");//创建总的发票区域;
            invoice_i.classList.add("col-md-3")//给总的发票区域定宽
            let el_invoice = document.createElement("div");
            invoice_i.innerHTML = `
            <span class="time_ca">订单号/发票</span>
            `;
            el_invoice.innerHTML = `
<div class="pro_show">
 ${snapshot.order_number}
              <br>
              ${snapshot.other.invoice_title}
              <br>
              ${snapshot.other.invoice_msg}
              <br>
              ${snapshot.other.note}
</div>
             
            `;
            invoice_i.appendChild(el_invoice);


            let money = document.createElement("div");//创建新的总金额区域
            money.classList.add("col-md-2");//给总的金额区域定宽
            money.innerHTML=`
            <span class="time_ca">状态/总金额</span>
            `;
            let el_money = document.createElement("div");
            el_money.innerHTML = `
<div class="pro_show">
<span class="total_money">¥${snapshot.price}</span>
         <br>
         <span class="state_">${state}</span>
</div>
            `;
            money.appendChild(el_money);

            if (state == "商家已发货") {
                let ok_order = document.createElement("div");
                // ok_order.classList.add("col-md-1")
                ok_order.innerHTML = `
                <button class="ok_order">确认收货</button>
                `;
                let ok_order_i = ok_order.querySelector(".ok_order");
                ok_order_i.addEventListener("click", function () {
                    $.post("/api/merchant/chant_accept", {id: item.id, state: "订单完成"})
                        .then(function (r) {
                            // console.log("r",r);
                        })
                })
                money.appendChild(ok_order);
            }


            //创建新的订单状态区域***************************************************************************


            if (state == "订单完成") {
                let order_other = document.createElement("div");
                order_other.classList.add("col-md-1");
                order_other.classList.add("text___")
                let el_other = document.createElement("div");
                el_other.classList.add("con_state")
                if (!item.comment) {
                    el_other.innerHTML = `
        <a href="/user/comment?order_num=${item.order_num}"><button class="evaluate">评价</button> </a>
            `;
                    order_other.appendChild(el_other);
                } else {
                    el_other.innerHTML = `
                <span class="text_con">已评价</span>
            `;
                    order_other.appendChild(el_other);
                }
                el.appendChild(product_i);//将商品区域写进dom
                el.appendChild(location_i);//将地址信息写进dom
                el.appendChild(invoice_i);//将发票信息新进dom
                el.appendChild(money);//将发票信息新进dom
                el.appendChild(order_other);//将其他信息的写进dom
            } else {
                el.appendChild(product_i);//将商品区域写进dom
                el.appendChild(location_i);//将地址信息写进dom
                el.appendChild(invoice_i);//将发票信息新进dom
                el.appendChild(money);//将发票信息新进dom
            }

            el_fa.appendChild(el);
        })
    }


    order_nav_comment.addEventListener("click", function () {

        recently_order.hidden = true;
        time_or.style.border="none";
        all_order.style.color="black"


        comment_order.hidden = false;
        order_nav_comment.style.color="#409EFF";
        or_con.style.borderBottom="2px solid #409EFF";

    })

    all_order.addEventListener("click", function () {
        recently_order.hidden = false;
        all_order.style.color="#409EFF";
        time_or.style.borderBottom="2px solid #409EFF"

        comment_order.hidden = true;
        order_nav_comment.style.color="black";
        or_con.style.border="none";


    })


})();