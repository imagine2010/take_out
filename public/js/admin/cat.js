;(function () {
    "use strict";
    let cat = new Ui("cat", "#form", "#list tbody");//最后一个参数,list下面的tbody
    cat.read();


    cat.table_tpl_maker = function (item) {
        return `
        <td class="col-md-1 col_cat">${item.id}</td>
        <td class="col-md-1 col_cat">${item.title}</td>
        <td class="col-md-1 col_cat"><button class="remove">删除</button></td>
        <td class="col-md-1 col_cat"> <button class="update">更新</button></td>
        `
    }
    cat.add();


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