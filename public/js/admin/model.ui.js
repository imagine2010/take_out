;(function () {
    "use strict";


    window.Ui = Ui;

    function Ui(name, form_selector, table_selector) {
        Model.call(this, name);//拷贝父级的自有属性
        this.el_form = document.querySelector(form_selector);//选中的元素,需要渲染的区域
        this.el_table = document.querySelector(table_selector);//选中的元素
        this.table_tpl_maker = null;
        this.after_read = function () {
            this.reader();
        }
        //把数据写进输入框
        this.push_form_data = function (item, el) {
            let me = this;
            let push = el.querySelector(".update");
            push.addEventListener("click", function () {
                me.el_form.set_data(item);
                // for (let key in item) {
                //     let input = me.el_form.querySelector(`[name=${key}]`);
                //     if (!input) {
                //         ``
                //         continue;
                //     } else {
                //         input.value = item[key];
                //     }
                // }
            })
        }

        //删除按钮
        this.remove_btn = function (item, el) {
            let me = this;
            let cat = el.querySelector(".remove");
            cat.addEventListener("click", function () {
                me.remove(item.id);
            })
        }


        //通过商品的cat_id寻找他的分类标签,通过text两个函数渲染出来
        this.find_title = function (id, el) {
            let me = this;
            $.post("/api/cat/find_id", {id: id})
                .then(function (r) {
                    if (r.data[0]) {
                        me.text(el, r);
                    } else {
                        me.text_null(el);
                    }
                })
        };


        //渲染所有的数据
        this.reader = function () {
            let me = this;
            me.el_table.innerHTML = "";
            me.list_each(
                function (item) {
                    let el = document.createElement("tr");
                    el.classList.add("show_")
                    el.innerHTML = me.table_tpl_maker(item);
                    if (me.name === "product") {
                        me.find_title(item.cat_id, el);
                    }
                    me.remove_btn(item, el);
                    me.push_form_data(item, el);
                    me.el_table.appendChild(el);
                }
            )
        }

        //为没有分类的商品渲染
        this.text_null = function (el) {
            let cat_title = el.querySelector("#cat_title");
            cat_title.innerText = "无分类"
        }
        //渲染有分类的商品分类标签
        this.text = function (el, r) {
            let cat_title = el.querySelector("#cat_title");
            cat_title.innerHTML = `${r.data[0].title}`;
            cat_title.value = r.data[0].id;

        }



        //增加操作
        this.add = function () {
            let me = this;
            me.el_form.addEventListener("submit", function (e) {
                e.preventDefault();
                let row = this.get_data();
                $.ajax({
                    url: '/api/' + me.name + '/add',
                    method: 'post',
                    data: row,
                    cache: false,
                    contentType: false,
                    processData: false
                })
                    .then(function (r) {
                        console.log("r",r);
                        me.read();
                        me.el_form.$reset();
                    })


            })
        }


        //清楚表单数据
        this.clear_form_data = function (su) {
            let input = su.querySelectorAll("[name]");
            for (let i = 0; i < input.length; i++) {
                let item = input[i];
                if (item.name === "cat_id") {
                    continue;
                } else {
                    item.value = '';
                }
            }
        }
    }


    Ui.prototype = Object.create(Model.prototype); // 借父级的原型属性
    Ui.prototype.constructor = Ui;
    Ui.prototype.list_each = function (callback) {
        this.list.forEach(function (item, index) {
            callback(item, index);
        })
    }
})();