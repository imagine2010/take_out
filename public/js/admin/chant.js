;(function () {
    "use strict";
    let submit_order = document.querySelector(".submit_order");
    let wait_out = document.querySelector(".wait_out");
    let ok_buy = document.querySelector(".ok_buy");
    let wait_buy = document.querySelector(".wait_buy");
    let wait_buy_btn_ = document.querySelector(".wait_buy_btn");
    let ok_buy_btn_ = document.querySelector(".ok_buy_btn");
    let money_ii = document.querySelector(".money_ii");
    let bgMusic = document.querySelector("#bgMusic");


    function hanld() {
        wait_buy_btn_.addEventListener("click", function () {
            wait_buy.hidden = false;
            wait_buy_btn_.style.color="#409EFF"

            ok_buy.hidden = true;
            ok_buy_btn_.style.color="black";
            get_submit_data.call(wait_buy_obj);
        })
        ok_buy_btn_.addEventListener("click", function () {
            wait_buy.hidden = true;
            wait_buy_btn_.style.color="black"


            ok_buy.hidden = false;
            ok_buy_btn_.style.color="#409EFF"
        })
    }

    init();

    function init() {
        // get_submit_data();
        setInterval(init_ok, 1000);
        hanld();
    }


    function init_ok() {
        get_submit_data.call(unpaid);
        // 将函数的this重定向成unpaid对象;
        get_submit_data.call(unpaid_wait);
        // get_submit_data.call(ok_buy_obj);
        money();
    }


    //获取已经用户已经提交的订单
    function get_submit_data() {
        let that = this;
        $.post("/api/merchant/read_submit", {state: this.state})//this.state中的
            .then(function (r) {
                if (!r.data.length) {
                    //如过返回来的数据是空,那么就是没有新的订单
                    that.from.innerHTML = '';
                } else {
                    if (that.render instanceof Function) {
                        that.render(r.data);
                    }
                }
            })

    }


    // chant_accept(26, "已结单");
    //点击接单按钮更新数据库的订单状态为"商家已经接单"
    //点击拒单按钮显示商家已经拒单,将订单状态改为关闭状态
    //点击发货按钮更新数据库的订单状态为订单已经发货
    //函数的传参必须是两个,第一个是订单的索引id ,另外一个是订单的状态
    function chant_accept(id, state) {
        $.post("/api/merchant/chant_accept", {id: id, state: state})
            .then(function (r) {
                // console.log("r",r);
            })
    }

    //发货以后用户界面显示确认收货,如果商家发货超过3小时还显示未收货,系统将将订单设为完成状态


    //渲染新的订单数据
    //在新订单以后调用
    function render_new_order(data) {
        submit_order.innerHTML = '';
        data.forEach(function (item) {
            let order_id = item.id;
            let order = JSON.parse(item.snapshot);
            let el = document.createElement("div");
            el.classList.add("new_order");

            let el_ord=document.createElement("div");
            el_ord.innerHTML=`
                商家单号:
${order_id}
<br>
                `;
            el.appendChild(el_ord);




            for (let key in order.product) {
                let val = order.product[key];
                let el_product = document.createElement("div");

                // el.appendChild(el_product);


                el_product.innerHTML = `
           产品：
               ${val.title}
               &nbsp;&nbsp;
               数量：
               ${val.count}
               &nbsp;&nbsp;
               价格：
               ${val.price}
               <br>
                `;
                el.appendChild(el_product);
            }

            let val = order.location;
            let el_location = document.createElement("div");
            el_location.innerHTML = `
                地址：
               ${val.location}
               <br>
               电话：
               ${val.phone}
               <br>
               姓名：
               ${val.username}
               <br>
                `;
            el.appendChild(el_location);


            let inva = order.other;
            let el_other = document.createElement("div");
            if (inva.invoice_msg == "无发票") {
                el_other.innerHTML = `
            <span>无需发票</span>
            <br>
             总金额:
              <span class="all_mon">¥${order.price}</span>
                <br>
            <button class="no_order">拒单</button> 
                <button class="ok_order">接单</button> 
            `;
                el.appendChild(el_other)
            } else {
                el_other.innerHTML = `
                发票抬头:
                ${inva.invoice_msg}
                <br>
                发票性质:
                ${inva.invoice_title}
                <br>
                订单备注:
                ${inva.note}
                <br>
                总金额:
              <span class="all_mon">¥${order.price}</span>
                <br>
                <button class="no_order">拒单</button> 
                <button class="ok_order">接单</button> 
            `;
                el.appendChild(el_other);
            }

            let no_order = el.querySelector(".no_order");
            no_order.addEventListener("click", function () {
                let id = item.id;
                chant_accept(id, "商家拒单");
            });

            let ok_order = el.querySelector(".ok_order")
            ok_order.addEventListener("click", function () {
                let id = item.id;
                chant_accept(id, "商家已接单");
            })
            submit_order.appendChild(el);
            bgMusic.play();
        })
    }

    function render_wait_out(data) {
        wait_out.innerHTML = '';
        data.forEach(function (item) {
            let order_id = item.id;
            let order = JSON.parse(item.snapshot);
            let el = document.createElement("div");
            el.classList.add("wait_pro")





            let el_ord=document.createElement("div");
            el_ord.innerHTML=`
                商家单号:
${order_id}
<br>
                `;
            el.appendChild(el_ord);
            for (let key in order.product) {
                let val = order.product[key];
                let el_product = document.createElement("div");
                el_product.innerHTML = `

      
                产品：
               ${val.title}
               &nbsp;&nbsp;
               数量：
               ${val.count}
               &nbsp;&nbsp;
               价格：
               ${val.price}
               <br>
                `;
                el.appendChild(el_product);
            }

            let val = order.location;
            let el_location = document.createElement("div");
            el_location.innerHTML = `
                地址：
               ${val.location}
               <br>
               电话：
               ${val.phone}
               <br>
               姓名：
               ${val.username}
               <br>
                `;
            el.appendChild(el_location);


            let inva = order.other;
            let el_other = document.createElement("div");
            if (inva.invoice_msg == "无发票") {
                el_other.innerHTML = `
            <span>无需发票</span>
            <br>
            总金额:
               <span class="all_mon">¥${order.price}</span>
                <br>
            <button class="wait_out_">发货</button> 
            `;
                el.appendChild(el_other)
            } else {
                el_other.innerHTML = `
                发票抬头:
                ${inva.invoice_msg}
                <br>
                发票性质:
                ${inva.invoice_title}
                <br>
                订单备注:
                ${inva.note}
                <br>
                总金额:
               <span class="all_mon">¥${order.price}</span>
                <br>
                <button class="wait_out_">发货</button> 
            `;
                el.appendChild(el_other);
            }
            let wait = el.querySelector(".wait_out_");
            wait.addEventListener("click", function () {
                let id = item.id;
                chant_accept(id, "商家已发货");
            })
            wait_out.appendChild(el);
        })
    }


    //-------------------------------------------

    let unpaid = {
        //需要在获取数据的函数中的传参在对象中定义
        state: '已提交',
        //渲染数据的函数定义为对象中的一个值
        render: render_new_order,
        from: submit_order
    }

    let unpaid_wait = {
        state: '商家已接单',
        render: render_wait_out,
        from: wait_out
    }


    let wait_buy_obj = {
        state: '商家已发货',
        render: render_wait_order,
        from: wait_buy
    }


    function render_ok_order(data) {
        ok_buy.innerHTML = ``;
        data.forEach(function (item) {
            let order_id = item.id;
            let order = JSON.parse(item.snapshot);
            let el = document.createElement("div");
            let el_product = document.createElement("div");
            el.classList.add("ok_order_");
            el_product.innerHTML = `
商家单号:
${order_id}
               总价：
               ${order.price}
               <br>
                `;
            el.appendChild(el_product);

            let val = order.location;
            let el_location = document.createElement("div");
            el_location.innerHTML = `
               电话：
               ${val.phone}
               姓名：
               ${val.username}
               <br>
                <span class="state__">状态:客户已确认,订单完成</span>
               
                `;
            el.appendChild(el_location);
            ok_buy.appendChild(el);
        })
    }

    function render_wait_order(data) {
        wait_buy.innerHTML = ``;
        data.forEach(function (item) {
            let order_id = item.id;
            let order = JSON.parse(item.snapshot);
            let el = document.createElement("div");
            el.classList.add("ok_order_");
            let el_product = document.createElement("div");
            el_product.innerHTML = `
商家单号:
${order_id}
               总价：
               ${order.price}
               <br>
                `;
            el.appendChild(el_product);

            let val = order.location;
            let el_location = document.createElement("div");
            el_location.innerHTML = `
               电话：
               ${val.phone}
               姓名：
               ${val.username}
               <br>
               <span class="state__">状态:等待客户确认</span>
               
                `;
            el.appendChild(el_location);


            wait_buy.appendChild(el);
        })
    }

    function render_money_i(data) {
        money_ii.innerHTML = "";
        let i = 0;
        data.forEach(function (item) {
            let money_i = JSON.parse(item.snapshot);
            let money = parseInt(money_i.price);
            i += money;
        })
        money_ii.innerHTML = `¥${i}`;
    }

    function money() {
        $.post("/api/merchant/money")
            .then(function (r) {
                console.log("r",r);
                render_money_i(r.data)
                render_ok_order(r.data);
            })
    }


    let user = document.querySelector(".user");
    user_event();

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


})();