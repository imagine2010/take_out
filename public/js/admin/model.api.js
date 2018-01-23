;(function () {
    "use strict";


    window.Model=Model;

    function Model(name) {
        this.name=name;
        this.page=1;
        this.list=[];
        this.row={};
    }


    Model.prototype.read=function (by,dire) {
        let me =this;
        $.post('/api/'+this.name+'/read',{page:this.page,by:by,dire:dire})
            .then(function (e) {
                me.list=e.data;
                if (me.after_read){//如果存在这个定义的函数，渲染后台管理的姐妹拿
                    me.after_read();//执行他
                }
                 if (me.home_cat){//home.js用到，在首页定义一个函数，如果这个函数存在，执行他，把cat数据传进去
                    me.home_cat();
                }
                if (me.home_product){
                    me.home_product();
                }
            })
    };
    Model.prototype.read_cat=function (id) {
        let me=this;
        $.post("/api/product/read_cat",{id:id})
            .then(function (r) {
                console.log("r",r);
                me.list=r.data;
                if (me.after_read){//如果存在这个定义的函数
                    me.after_read();//执行他
                }

            })
    }
    Model.prototype.read_cat_null=function () {
        let me=this;
        $.post("/api/product/cat_null")
            .then(function (r) {
                me.list=r.data;
                if (me.after_read){//如果存在这个定义的函数
                    me.after_read();//执行他
                }

            })
    }

    
    
    Model.prototype.remove=function (id) {
        let me=this;
        if (me.name==="cat"){
            if (!confirm("当您删除一个分类的时候,此分类下的商品将自动归类为无分类产品"))
                return

        }else {
            if (!confirm('确定删除？'))
                return;
        }
        $.post('/api/'+this.name+'/remove',{id:id})
            .then(function (r) {
                console.log("r",r);
                me.read();
            })
    }
})();