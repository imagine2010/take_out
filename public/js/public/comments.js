;(function () {
    "use strict";

    let a = new URL(document.URL)
    let i = a.searchParams.get("order_num");
    //i是一个点击过来的订单号

    let order_time = document.querySelector(".order_time");
    let order_product = document.querySelector(".order_product");
    let form_comment = document.querySelector(".form_comment");
    let user_id_i = document.querySelector(".user_id");
    let user_id = parseInt(user_id_i.value);
    let user = document.querySelector(".user")


    init();

    function init() {
        get_order_data(i);
        push_form_data();
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


    function get_order_data(i) {
        $.post("/api/order/render_data", {order_num: i})
            .then(function (r) {
                let data = r.data[0];
                render_time(data);//渲染订单号和创建时间
                render_content(data);//渲染商品
            })
    }

    function render_time(data) {////渲染订单号和创建时间
        order_time.innerHTML = '';
        let el_order_time = document.createElement("div");
        el_order_time.classList.add("el_order_time")
        el_order_time.innerHTML = `
        <span class="ord_num">订单号:</span>
        <span>${data.order_num}</span>
        &nbsp;&nbsp;
        <span class="ord_time">下单时间:</span>
        <span>${data.created_at}</span>
        `;
        order_time.appendChild(el_order_time);
    }


    function render_content(data) {//渲染商品
        let pri = JSON.parse(data.snapshot);
        let price = pri.price;
        console.log("price", price);
        order_product.innerHTML = '';
        let product = JSON.parse(data.product);


        let el_ = document.createElement("div")
        el_.classList.add("col-md-12")
        el_.classList.add("show_pro")
        el_.innerHTML = `
            <div class="col-md-4" style="text-align: left">
            商品
</div>
            <div class="col-md-4">
            数量
</div>
            <div class="col-md-4">
           单价
</div>
            `;
        order_product.appendChild(el_);
        let el = document.createElement("div");
        for (let key in product) {
            console.log("key", key);
            let el = document.createElement("div");
            el.classList.add("col-md-12")
            el.classList.add("show_pro")

            el.innerHTML = `
<div class="col-md-4 title_pr">
        ${product[key].title}
</div>
<div class="col-md-4">
        ${product[key].count}
</div>
<div class="col-md-4">
        ¥${product[key].price}
</div>
        <br>
        `;
            order_product.appendChild(el);
        }
        el.innerHTML = `
        <div class="col-md-4 money_all">
        <span class="a_money">
        ¥${price}
</span>
</div>
        `;


        order_product.appendChild(el);

    }


    form_comment.addEventListener("submit", function (e) {
        e.preventDefault();
        let formdata = form_comment.get_data();
        $.ajax({
            url: '/api/comment/add',
            method: 'post',
            data: formdata,
            cache: false,
            contentType: false,
            processData: false
        })
            .then(function (r) {
                if (r.success) {
                    alert("评论成功");
                    window.location = "/order_ok"
                }
            })
    })


    function push_form_data() {
        let el = document.createElement("div");
        el.innerHTML = `
        <input type="text" name="user_id" value="${user_id}" hidden>
        <input type="text" name="order_num" value="${i}" hidden>
        `;
        form_comment.appendChild(el);
    }


})();