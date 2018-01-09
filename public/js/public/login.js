;(function () {
    "use strict";

    let alert_i=document.querySelector(".alert_i");


    let login=new User("#from");
    login.login()

    User.prototype.alert_msg=function () {
        alert_i.innerHTML=`
       <div class="alert alert-danger" role="alert">用户名或者密码错误</div>
        `;
        setTimeout(function () {
            console.log("1",1);
            alert_i.innerHTML='';
        },3000)
        // clearInterval();
    }




})();