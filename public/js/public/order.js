;(function () {
    "use strict";
    let user_id_i = document.querySelector(".user_id");
    let user_id = parseInt(user_id_i.value);
    //首先获取这个用户的id
    let show_buy = document.querySelector(".show_buy");
    let order_money = document.querySelector(".order_money");
    let location = document.querySelector(".location_o");
    let user_location = [];
    let from_order = document.querySelector(".from_order");
    let invoice_title = document.querySelector(".invoice_title");
    let invoice_msg = document.querySelector(".invoice_msg");


    init();

    function init() {
        order();
        get_location();
    }

    function order() {
        let su = new Buy(user_id);
        su.read_buy();


        su.read_buy_product = function () {
            show_buy_product(this.row)
            tal_money(this.row);
        }

        function show_buy_product(date) {//渲染订单数据
            show_buy.innerHTML = '';
            let buy_content = date[0];
            buy_content.forEach(function (item) {
                let total_price = item.price * item.count;
                let el = document.createElement("div");
                el.classList.add("item_buy")
                el.classList.add("col-md-12")
                el.innerHTML = `
<div class="col-md-4 pro_i title__">
        <span>${item.title}</span>
</div>
 
<div class="col-md-4 pro_i _count">
      <span><button class="minus">-</button></span>
        <input class="count" value="${item.count}" readonly="value">
        <span><button class="add_i">+</button></span>
</div>
<div class="col-md-4 pro_i money__">
        <span>¥${total_price}</span>
</div>
        `;
                handle_btn(el, item);
                show_buy.appendChild(el);
            })
        }

        function tal_money(data) {//渲染金额
            let money = data[2];

            if (money == "8") {
                alert("购物车中没有商品,您将返回购买页")
                window.location = "/";
            }

            order_money.innerHTML = "";
            let el = document.createElement("div");
            el.classList.add("all_money");
            el.classList.add("col-md-12");
            el.innerHTML = `
        <span>¥${money}</span>
        `;
            order_money.appendChild(el);
        }
    }

//购物车数据的加减事件
    function handle_btn(el, item) {
        let add_i = el.querySelector(".add_i");
        let minus = el.querySelector(".minus");
        let count = el.querySelector(".count")
        add_i.addEventListener("click", function () {
            item.count++;
            $.post("/api/cart/add", item)
                .then(function (r) {
                    count.innerText = `${item.count}`;
                    order();
                })
        })
        minus.addEventListener("click", function () {
            item.count--;
            if (item.count <= 0) {
                $.post("/api/cart/remove", {id: item.id})
                    .then(function (r) {
                        order();
                    })
                return;
            }
            $.post("/api/cart/add", item)
                .then(function (r) {
                    count.innerText = `${item.count}`;
                    order();
                })
        })
    }


    //渲染地址
    function get_location() {
        $.post("/api/user_location/read_user_location", {user_id: user_id})
            .then(function (r) {
                user_location = r.data;
                read_location(user_location);
                location_status()
            })
    }

    function read_location(data) {
        location.innerHTML = '';
        data.forEach(function (item) {
            let el = document.createElement("div");
            el.classList.add("location_input")
            el.classList.add("col-md-12")
            el.innerHTML = `
<div class="lo_in">
<div class="col-md-1 icon__">
<span class="icon_ fa fa-map-marker"></span>
</div>
<div class="col-md-11" style="margin-top: 8px">
           姓名:
           <span class="username">${item.username}</span>,
           <span class="phone">${item.phone}</span>
           <br>
           <span class="location">${item.location}</span>
</div>
       

</div>

            `;
            location.appendChild(el);
        })
    }


    let show_location;

    //设置地址的显示状态
    function location_status() {
        let text = location.querySelectorAll(".location_input");
        let show_all_location = document.querySelector(".show_all_location");

        //默认展示样式
        text.forEach(function (item, index) {
            if (index == 0) {
                item.hidden = false;
                show_location = item;
            } else {
                item.hidden = true;
            }
        })

        //点击事件,点击显示更多地址,选中哪个地址就显示哪个地址
        show_all_location.addEventListener("click", function () {
            text.forEach(function (item, index) {
                item.hidden = false;
                item.addEventListener("click", function () {
                    let i = index;
                    show_location = item;
                    item.hidden = false;
                    text.forEach(function (item, index_i) {
                        if (index_i != i) {
                            item.hidden = true;
                            console.log("item", item);
                        }
                    })
                })
            })
        });
    }


    event_invoice();

    //控制发票事件
    function event_invoice() {
        invoice_title.addEventListener("click", function () {
            invoice_msg.hidden = false;

        })
    }


    let order_mun = {};
    let order_product = {};
    from_order.addEventListener("submit", function (e) {
        e.preventDefault();
        //生成地址信息
        order_mun.location = {};
        order_mun.location.location = show_location.querySelector(".location").innerText;
        order_mun.location.username = show_location.querySelector(".username").innerText;
        order_mun.location.phone = show_location.querySelector(".phone").innerText;
        order_mun.location.user_id = user_id;

        //生成其他信息
        order_mun.other = {};
        order_mun.other = get_from_data(from_order);


        //获取到最新的购物车数据
        //在此处完成商品Json数据的打包
        let su = new Buy(user_id);
        su.read_buy();
        su.read_buy_product = function () {
            //打包好的商品对象
            let order_product = packaging_product(this.row);
            order_mun.product = order_product;
            //打包好的订单快照对象
            //打包好的两个对象发送至后端进行添加订单号操作
            let param = {};
            param.order_mun = order_mun;
            param.order_product = order_product;
            console.log(param);
            $.post("/api/order/add_order", param)
                .then(function (r) {
                    if (r.success) {
                        $.post("/api/cart/remove", {user_id: user_id})
                            .then(function (r) {
                                console.log("r", r);
                                if (r.success) {
                                    alert("下单成功,为您跳转订单页")
                                    window.location = "order_ok";
                                }
                            })
                    }
                }, function (r) {
                    console.log(r);
                })
        }
    })


    //将最终确认的购物车数据下单
    function packaging_product(data) {
        let buy_data = data[0];
        buy_data.forEach(function (item, index) {
            let product_id = item.product_id;
            order_product[product_id] = {};
            order_product[product_id].count = item.count;
            order_product[product_id].title = item.title;
            order_product[product_id].price = item.price;
        })
        order_mun.price = data[2];
        return order_product;
    }


    //选择订单提交时的订单其他信息的数据
    function get_from_data(from) {
        let order_msg = {};
        let input = from.querySelectorAll("[name]");
        input.forEach(function (item) {
            order_msg[item.name] = item.value;
        })
        if (order_msg.invoice_title == "") {
            order_msg.invoice_msg = "无发票";
        }
        return order_msg;
    }

    let user = document.querySelector(".user");
    user_event();

    function user_event() {
        let user_btn = document.querySelector("#user_btn");
        if (user) {
            user.addEventListener("mouseover", function () {
                user_btn.style.display = "block";
                user.addEventListener("mouseout", function () {
                    user_btn.style.display = "none";
                })
            })
        }
    }


})();