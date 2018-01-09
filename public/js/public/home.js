;(function () {
    "use strict";
    let logout = document.querySelector(".logout");
    let show_cat = document.querySelector("#show_cat");
    let show_product = document.querySelector("#show_product");
    let user = document.querySelector(".user");
    let money = document.querySelector(".money");
    let account = document.querySelector(".account");
    let clear_buy = document.querySelector(".clear_buy");
    let buy_content = document.querySelector("#buy_content");
    let comment = document.querySelector(".comment");
    let show_all = document.querySelector("#show_all");
    let comment_show = document.querySelector(".comment_show");
    let all_product = document.querySelector(".all_product");
    let all_=document.querySelector(".all_");
    let text_i=document.querySelector(".text_i");


    let user_id_i = document.querySelector(".user_id");
    let user_id = parseInt(user_id_i.value);

    init();

    function init() {
        cat_init();
        new_read_i();
        user_event();
        if (logout) {
            logout.addEventListener("click", function () {
                window, location = "logout";
            })
        }
        comment_i();
        all_product_i();
        get_comment();

    }

    function new_read_i() {
        let product_i = new Buy(user_id);
        product_i.read_buy();
        Buy.prototype.read_buy_product_home = function () {
            // console.log("this.row",this.row);
            read_buy_i(this.row[0]);
            money_read(this.row[1])
        }
    }


    function read_buy_i(arr) {
        buy_content.innerHTML = '';
        arr.forEach(function (item) {
            let i = item.count;
            let el = document.createElement("div");
            el.classList.add("buy_su");
            el.innerHTML = `
        <div class="col-md-12 buy_size">
        <div class="col-md-4 title_ii">
         <input type="text" class="product_id" value="${item.product_id}" hidden>
            <input type="text" class="buy_id" value="${item.id}" hidden>
<input type="text" class="user_id" value="${item.user_id}" hidden>
        <span class="title"> ${item.title}</span>
</div>
           
        
        
       <div class="col-md-4 count_i">
        <button class="minus">-</button>
       <input type="text" value="${item.count}" style="width: 29px" class="product_count" readonly="value">
        <button class="add_count">+</button>
</div>
<div class="col-md-4">

        <span class="price"> ${item.price}</span>
</div>
        
</div>
            `;
            let row = {};
            row.count = i;
            row.id = item.id;
            row.product_id = item.product_id;
            row.title = item.title;
            row.user_id = user_id;
            let btn_buy = el.querySelector(".btn_buy")
            handle_add_minus(el, ".add_count", ".minus", i, ".product_count", row)
            buy_content.appendChild(el);
        })
    }


    function money_read(arr) {//渲染总金额
        let i = 0
        for (let u in arr) {
            i += arr[u];
        }
        money.innerHTML = '';
        let el = document.createElement("div");
        el.innerHTML = `
       <div class="money_ii">总金额:${i}</div>
      
        `;
        money.appendChild(el);

    }


    function cat_init() {
        let cat = new Model("cat");
        cat.read();
        //展示分类
        Model.prototype.home_cat = function () {
            // show_cat_fun(show_cat);
            show_product_fun(show_product);
        }


        //渲染分类到分类区
        function show_cat_fun(from) {
            from.innerHTML = '';
            cat.list.forEach(function (r) {
                let el = document.createElement("div");
                if (from === show_cat) {
                    el.style.display = "inline-block"
                }

                el.innerHTML = `
            <span class="cat_show" style="background-color:#eeeeee;">${r.title}</span>
            `;
                from.appendChild(el);
            })
        }


        cler_buy();

        function cler_buy() {
            clear_buy.addEventListener("click", function () {
                let id = user_id;
                $.post("/api/cart/remove", {user_id: id})
                    .then(function (r) {
                        new_read_i();
                        show_product_fun(show_product)
                    })
            })
        }

        //渲染商品到主显示区的分类标签下
        function show_product_fun(from) {

            from.innerHTML = '';
            cat.list.forEach(function (rr) {
                let el = document.createElement("div");
                el.classList.add("cat_from_card")
                el.innerHTML = `
         <span class="col-md-12 cat_show">${rr.title}</span>
            <div class="i${rr.id}"></div>
            `;
                let sq = el.querySelector(`.i${rr.id}`);
                $.post('/api/product/read')
                    .then(function (r) {
                        r.data.forEach(function (item) {//迭代商品数组
                            if (rr.id == item.cat_id) {//如果分类数组的id等于商品数组的cat_id
                                console.log("item", item);
                                //创建一个元素，把符合条件的商品渲染进这个元素中，实现分页
                                let el = document.createElement("div");
                                el.classList.add("col-md-6");
                                el.classList.add("yo");
                                el.innerHTML = `
                                    <div class="card_product">
                                    <span class="_product_id" hidden>${item.id}</span>
                                    <img src="/upload/${item.cover}" alt=""class="product_img" >
            <span class="product_show title_show">${item.title}</span>
            <br>
            <span class="product_show prop">${item.prop}</span>
            <br>
            <span class="product_show sales">月售:${item.sales}份</span>
            <br>
            <span class="product_show price">¥ ${item.price}</span>
            <button class="btn_buy">购买</button>
</div>
                                    `;
                                // new_read(item)
                                // handle(el, item);
                                let btn_buy = el.querySelector(".btn_buy");
                                let card_product = el.querySelector(".card_product")
                                let text = buy_content.querySelectorAll(".buy_su");
                                text.forEach(function (item_i) {
                                    // console.log("item_i", item_i);
                                    let product_id = parseInt(item_i.querySelector(".product_id").value);
                                    let product_count = parseInt(item_i.querySelector(".product_count").value);
                                    let id = parseInt(item_i.querySelector(".buy_id").value);

                                    if (item.id == product_id) {
                                        let i = product_count;
                                        // console.log("item",item);
                                        btn_buy.hidden = true;
                                        let number_buy = document.createElement("div");
                                        number_buy.classList.add("yo1")
                                        number_buy.innerHTML = `
          <div class="number_buy">
             <input class="id" value="${id}" type="text"  hidden>
            <button class="minus">-</button>
            <input type="text" name="number_buy" value="${product_count}" class="input_i" readonly="value">
            <button class="add_i">+</button>
</div>
            `;
                                        let text_ = number_buy.querySelector(".number_buy");
                                        console.log("text", text_);

                                        let row_1 = {};
                                        row_1.count = i;
                                        row_1.title = item.title;
                                        row_1.user_id = user_id;
                                        row_1.product_id = item.id;
                                        row_1.id = id;
                                        handle_add_minus(number_buy, ".add_i", ".minus", i, ".input_i", row_1, btn_buy)
                                        card_product.appendChild(number_buy)
                                    }
                                })

                                new_handle(el, item);
                                show_img(el, item);
                                sq.appendChild(el);
                            }
                        })
                    })
                from.appendChild(el);
            });
        }
    }


    function handle_add_minus(parnode, add, minus, i, input_i, row_1, btn_buy) {
        let add_i = parnode.querySelector(add);
        let input_ii = parnode.querySelector(input_i)
        let minus_i = parnode.querySelector(minus)
        add_i.addEventListener("click", function () {
            i++;
            input_ii.value = i;
            row_1.count = i;
            $.post("/api/cart/add", row_1)
                .then(function (r) {
                    text_id(row_1)
                    new_read_i();
                })
        })

        minus_i.addEventListener("click", function () {


            if (i <= 1) {
                i--;
                // let btt=show_product.querySelector(".btn_buy");
                // console.log("btt",btt);
                // btt.hidden=false;
                xyz(row_1);
                $.post("/api/cart/remove", {id: row_1.id})
                    .then(function (r) {
                        text_id(row_1)
                        new_read_i();
                    })
                // parnode.parentNode.removeChild(parnode);
            } else {
                console.log("2", 2);
                i--;
                input_ii.value = i;
                row_1.count = i;
                $.post("/api/cart/add", row_1)
                    .then(function (r) {
                        text_id(row_1)
                        new_read_i();
                    })
            }
        })
    }

    function xyz(row) {
        let yo = show_product.querySelectorAll(".yo");
        yo.forEach(function (col) {
            let bb = parseInt(col.querySelector("._product_id").innerText);
            if (row.product_id == bb) {
                let number_buy = col.querySelector(".minus");
                col.querySelector(".btn_buy").hidden = false;
                let text = number_buy.parentNode.parentNode;
                text.parentNode.removeChild(text);
            }
        })
    }


    function text_id(row_1) {
        let yo = show_product.querySelectorAll(".yo");
        yo.forEach(function (input) {
            let input_val = input.querySelector(".input_i");
            // let yo=show_product.querySelectorAll(".yo");
            let product_id_show = parseInt(input.querySelector("._product_id").innerText);
            let btn_buy = show_product.querySelector(".btn_buy")
            if (input_val) {
                if (row_1.product_id == product_id_show) {
                    input_val.value = row_1.count
                    if (input_val.value <= 0) {
                        let parnode = input_val.parentNode;
                        btn_buy.hidden = false;
                        parnode.parentNode.removeChild(parnode);
                    }
                }
            }


        })
    }

    function new_handle(el, item) {
        let row = {};
        let btn_buy = el.querySelector(".btn_buy");
        btn_buy.addEventListener("click", function (e) {
            e.stopPropagation();
            let i = 0;
            i++;
            row.count = i;
            row.title = item.title;
            row.product_id = item.id;
            row.user_id = user_id;
            row.id = '';
            add_cart_buy(row, el, item, i);
            new_read_i();
        })
    }


    function add_cart_buy(row, el, item, i) {
        let btn_buy = el.querySelector(".btn_buy");
        let card_product = el.querySelector(".card_product")

        $.post("/api/cart/add", row)
            .then(function (r) {
                row.id = r.data;
                btn_buy.hidden = true;//隐藏购买按钮
                let number_buy = document.createElement("div");
                number_buy.classList.add("yoyyo")
                number_buy.innerHTML = `
          <div class="one_yo">
          <input class="id" value="${row.id}" type="text"  hidden>
            <button id="btn_minus" class="minus">-</button>
            <input type="text" name="number_buy" value="${i}" class="input_i" readonly="value">
            <button class="add_i">+</button>
</div>
            `;
                let add_i = number_buy.querySelector(".add_i");
                let minus = number_buy.querySelector(".minus");
                let input_i = number_buy.querySelector(".input_i")
                let id = number_buy.querySelector(".id");
                add_i.addEventListener("click", function () {
                    i++;
                    row.id = id.value;
                    row.count = input_i.value = i;
                    $.post("/api/cart/add", row)
                        .then(function (we) {
                            text_id(row);
                            new_read_i();
                        })
                })
                minus.addEventListener("click", function () {
                    if (i <= 1) {
                        i--;
                        console.log("i", i);
                        btn_buy.hidden = false;
                        number_buy.parentNode.removeChild(number_buy);
                        $.post("/api/cart/remove", {id: id.value})
                            .then(function (r) {
                                console.log("r", r);
                                text_id(row);
                                new_read_i();

                            })
                    } else {
                        i--;
                        console.log("i", i);
                        row.id = id.value;
                        row.count = input_i.value = i;
                        $.post("/api/cart/add", row)
                            .then(function (we) {
                                text_id(row);
                                new_read_i();
                            })
                    }
                })
                card_product.appendChild(number_buy);
            })
    }


    let show_product_i = document.querySelector(".show_product_i");

    function show_img(el, item) {
        let img = el.querySelector(".product_img");
        img.addEventListener("click", function () {
            console.log("item", item);
            let el = document.createElement("div");
            // el.classList.add("text_img")
            el.classList.add("show_product_el")
            el.innerHTML = `
<div class="el_ii">
<div class="col-md-8">
<img src="/upload/${item.cover}" alt=""class="product_img_up" >
</div>
<div class="col-md-4">
<div class="con_img">

<span class="con_title_i">${item.title}</span>
<hr>
<span style="font-size: 14px">${item.prop}</span>
<hr>
<span style="font-size: 14px">月售:${item.sales}份</span>
<hr>
<span style="color: red;">¥${item.price}</span>
<span id="down" class="fa fa-times clear_show_product"></span>
</div>

</div>

</div>
            `;
            let clear_show_product = el.querySelector(".clear_show_product");
            // el.parentNode.removeChild(el);
            show_product_i.appendChild(el);
            show_product_i.hidden = false;


            document.addEventListener("keydown", function (e) {
                if (e.keyCode == 27) {
                    el.parentNode.removeChild(el);
                    show_product_i.hidden = true;
                }
            })

            clear_show_product.addEventListener("click", function () {
                el.parentNode.removeChild(el);
                show_product_i.hidden = true;
            })
        })
    }


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


    account.addEventListener("click", function () {
        let order = buy_content.querySelectorAll(".buy_su");
        if (order.length >= 1) {
            window.location = "order"
        } else {
            alert("购物车中没有商品")
        }
    })




    function get_comment() {
        $.post("/api/comment/read")
            .then(function (r) {
                render_comment(r.data);
            })
    }


    function render_comment(data) {
        comment_show.innerHTML = '';
        data.forEach(function (item) {
            let el = document.createElement("div");
            el.innerHTML = `
            <div class="col-md-4 user_con">匿名用户</div>
            <div class="col-md-8 comment_con">
            <div class="col-md-12 text_con">${item.text}</div>
           <div class="col-md-12 img_con"> <img src="/upload/${item.cover}" alt=""class="img_product" style="width: 150px;height: 80px;" ></div>
            <div class="col-md-12 time_con">评论时间 ${item.created_at}</div>
            </div>
            `;
            comment_show.appendChild(el);
        })
    }


    function all_product_i() {
        all_product.addEventListener("click", function () {
            show_all.hidden = false;
            all_product.style.color="#0089dc"
            all_.style.borderBottom = '1px solid #0089dc'

            comment_show.hidden = true;
            text_i.style.border="none";
            comment.style.color="black";

        })
    }
    function comment_i() {
        comment.addEventListener("click", function () {
            show_all.hidden = true;
            all_product.style.color="black";
            all_.style.border="none"


            comment_show.hidden = false;
            text_i.style.borderBottom="1px solid #0089dc"
            comment.style.color="#0089dc";
        })
    }


})();

