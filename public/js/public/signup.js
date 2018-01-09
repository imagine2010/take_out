;(function () {
    "use strict";
    let alert_i=document.querySelector(".alert_i");
    let from = document.querySelector("#from");

    from.addEventListener("submit", function (r) {
        r.preventDefault();
        let row=this.get_data();
        $.ajax({
            url: '/api/user/signup',
            method: 'post',
            data: row,
            cache: false,
            contentType: false,
            processData: false
        })
        // $.post("/api/user/signup",from.get_data())
            .then(function (r) {
                console.log("r",r);
                if (r.success===false){
                    alert_ii();
                }else {
                    alert("注册成功");
                    location.href="login";
                }
            })
    })


    function alert_ii() {
        alert_i.innerHTML=`
       <div class="alert alert-danger" role="alert">用户名已存在或密码不符合规定</div>
        `;
        setTimeout(function () {
            console.log("1",1);
            alert_i.innerHTML='';
        },3000)
        // clearInterval();
    }

})();