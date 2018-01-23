;(function () {
    "use strict";
    let user = document.querySelector(".user");
    let user_id = parseInt(document.querySelector(".user_id").value);
    let location_add = document.querySelector("#location_add");
    let show_location_i = document.querySelector(".show_location_i");
    let arr = [];
    let user_location = [];


    init();

    function init() {
        get_data();
        user_event();
        get_location();
    }

//用户事件
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

//获取数据库所有的地址
    function get_data() {
        $.post("/api/location/read_type")
            .then(function (r) {
                arr = r.data;
                render();
            })
    }

    //渲染这个用户的地址
    function read_location(date) {
        show_location_i.innerHTML = '';
        date.forEach(function (item) {
            console.log("item", item);
            let el_i = document.createElement("div");
            el_i.classList.add("col-md-4")
            el_i.innerHTML = `
<div class="card_lo">
<div class="size">
 <span>${item.username}</span>
 <sapn> &nbsp;&nbsp;先生/女士</sapn>
 <br>
 <br>
 <span class="loca">${item.location}</span>
 <br>
            <span class="phone_">${item.phone}</span>
            <br>
            <span class="remove">删除地址</span>
</div>
</div>
           
            `;
            let remove = el_i.querySelector(".remove")
            remove.addEventListener("click", function () {//删除订单操作
                let id = item.id;
                $.post("/api/user_location/remove", {id: id})
                    .then(function (r) {
                        if (r.success) {
                            get_location();
                        }
                    })
            })
            show_location_i.appendChild(el_i);
        })
    }

    //获取这个用户的所有地址
    function get_location() {
        $.post("/api/user_location/read_user_location", {user_id: user_id})
            .then(function (r) {
                user_location = r.data;
                read_location(user_location);
            })
    }


//添加新的地址
    location_add.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("1", 1);
        get_from_data(location_add);
        get_location();
        location_add.$reset();

    })

//获取数据,请求添加新的地址
    function get_from_data(location_add) {

        let input = location_add.querySelectorAll('[name]')
        let text = {};
        let i = 1;
        text.user_id = user_id;
        input.forEach(function (item) {
            if (item.name == "site") {
                text.site = item.value
            }
            else if (item.name == "phone") {
                text.phone = item.value;
            }
            else if (item.name == "username") {
                text.username = item.value;
            }
            else {
                text[i] = item.value;
                i++;
            }

        })
        $.post("/api/user_location/text", text)
            .then(function (r) {
                console.log("r", r);
            })
    }


    let detail = document.querySelector(".detail");
    let phone = document.querySelector(".phone");
    let username = document.querySelector(".username");
    let btn_add = document.querySelector(".btn_add");

    /*
    * 渲染一级
    * @param Number parent_id 父级id
    * @param HTMLElement children_el 子级元素
    * */
    function render(parent_id, children_el) {

        /*如果有子级元素，先清空子级内容*/
        if (children_el)
            children_el.innerHTML = '';
        /*如果是默认选项直接返回*/
        if (parent_id === '')
            return;

        /*父级id默认为0*/
        parent_id = parseInt(parent_id) || null;

        /*通过传入的父级id过滤得到新的数据*/
        var list = arr.filter(function (location) {
            return parent_id == location.parent_id;
        });
        // console.log(arr);
        /*如果新数据不存在（也就是没有子级）*/
        if (!list.length) {
            detail.hidden = false;
            detail.style.display ="block";
            btn_add.hidden = false;
            btn_add.style.display ="block";
            phone.hidden = false;
            phone.style.display ="block";
            username.hidden = false;
            username.style.display ="block";
            return;
        }

        /*创建当前层级以下的总容器（可参考Demo中的HTML结构）*/
        var el = document.createElement('span');
        el.innerHTML = `
  <select name="select" class="form-control se_lo"></select>
  <span class="children"></span>
  `;
        var select = el.querySelector('select');
        var children = el.querySelector('.children');

        /*设置默认项*/
        var default_option = document.createElement('option');
        default_option.innerText = '- 请选择 -';
        default_option.value = '';
        select.appendChild(default_option);

        /*迭代之前过滤后的新数据*/
        list.forEach(function (location) {
            var option = document.createElement('option');
            option.innerHTML = location.name;
            option.value = location.id;
            select.appendChild(option);
        });
        /*如果是最顶级（没有父级id）*/
        if (!parent_id) {
            /*将生成的元素添加到#wrapper中*/
            document.querySelector('#wrapper').appendChild(el);
        } else {
            /*否则将生成的元素添加到子级的.children元素下*/
            if (children_el)
                children_el.appendChild(el);
        }

        /*当选项发生变化时，渲染子级选项*/
        select.addEventListener('change', function () {
            render(this.value, children);
        });
    }


})();