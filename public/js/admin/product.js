;(function () {
    "use strict";
    let cat_id = document.querySelector("#cat_id");
    let show_cat = document.querySelector("#show_rule");
    let btn=document.querySelector("#btn_button");

    let product = new Ui("product", "#form", "#list tbody");//最后一个参数,list下面的tbody
    product.read();


    product.table_tpl_maker = function (item) {
        return `
        <td class="col-md-1 col_cat">${item.id}</td>
        <td class="col-md-1 col_cat">${item.title}</td>
        <td class="col-md-1 col_cat">¥  ${item.price}</td>
        <td class="col-md-1 col_cat" id="cat_title">${item.cat_id}</td>
        <td class="col-md-1 col_cat"> <img src="/upload/${item.cover}" alt=""class="img_product" > </td>
         <td class="col-md-1 col_cat"><button class="remove">删除</button></td>
         <td class="col-md-1 col_cat"><button class="update">更新</button></td>
        `
    }
    product.add();

    //通过cat_id找title函数


    init();

    function init() {
        read_cat();
        btn.addEventListener("click",function () {
            read_cat();
        })
    }


    //渲染分类数据
    function read_cat() {
        $.post("/api/cat/read")
            .then(function (r) {
                push_data_from(r.data, cat_id);
                push_data_from(r.data, show_cat);
            })
    }

    //渲染分类数据
    function push_data_from(data, text_el) {
        text_el.innerHTML = '';
        if (text_el == show_cat) {
            text_el.innerHTML = `
         <option value="all">查看所有</option>
        <option  value="price_is">价格由高到低</option>
        <option value="price_sm">价格由底到高</option>
        <option value="null_cat">查看未分类的商品</option>
        `;
            text()
        }


        data.forEach(function (item) {
            let el = document.createElement("option");
            el.value = item.id;
            el.innerText = `${item.title}`
            text_el.appendChild(el);
        })

    }



    function text() {
        $(document).ready(function () {
            $("#show_rule").on("change", function () {
                var checkText = $("#show_rule").find("option:selected").val();
                if ($("option:selected", this).val() == 'all') {
                    product.read();
                }
                else if ($("option:selected", this).val() == 'price_is') {
                    product.read("price", "desc");
                }
                else if ($("option:selected", this).val() == 'price_sm') {
                    product.read("price", "asc");
                }
                else if ($("option:selected", this).val() == 'null_cat') {
                    product.read_cat_null();
                }
                else {
                    product.read_cat(checkText);
                }
            });
        });
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