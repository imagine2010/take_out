;(function () {
    "use strict";

    window.User = User;

    function User(from_i) {
        let me=this;
        this.from = document.querySelector(from_i);
        this.login = function () {
            this.from.addEventListener("submit", function (r) {
                r.preventDefault();
                let row=this.get_data();
                $.ajax({
                    url: '/api/user/login',
                    method: 'POST',
                    data: row,
                    cache: false,
                    contentType: false,
                    processData: false
                })
                    .then(function (r) {
                        if (r.success) {
                            location.href="home";
                        } else {
                            if(me.alert_msg){
                                me.alert_msg();
                            }
                            // alert("用户名或者密码有误")
                        }
                    })
            })
        }
    }


})();