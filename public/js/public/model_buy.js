;(function () {
    "use strict";



    window.Buy=Buy;

    //获取购物车数据
    //首先获取到这个用户的Id
    //根据id获取他在购物车中的所有的数据


     function Buy(user_id) {
         //第一个参数用户id
         //第二个参数渲染区域
         // this.show_buy=document.querySelector(show_buy);
         this.row=[];
        this.user_id = user_id;
        this.read_buy = function () {
            let me =this;
            $.post("/api/cart/read_user_id",{id:me.user_id})
                .then(function (r) {
                    me.row=r.data;
                    if (me.read_buy_product){
                        me.read_buy_product();
                    }
                    if (me.read_buy_product_home){
                        me.read_buy_product_home()
                    }
                })
        }
    }




})();