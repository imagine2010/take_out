;(function () {
    "use strict";
    
    let user =new Ui("user","#form","#list tbody");
    user.read();

    user.table_tpl_maker=function (item) {
        return `
        <td class="col-md-1 col_cat">${item.id}</td>
        <td class="col-md-1 col_cat">${item.username}</td>
        <td class="col-md-1 col_cat">${item.permissions}</td>
        <td class="col-md-1 col_cat"> <button class="remove">删除</button></td>
        <td class="col-md-1 col_cat"> <button class="update">更新</button></td>
        
        
        `
    }
    let  permission_arr=["user","admin"];
    let select=document.querySelector("#permissions-selector");
    init();
    function init() {
        select.innerHTML='';
        permission_arr.forEach(function (item) {
            let el =document.createElement("option")
            el.value=item;
            el.innerText=`${item}`;
            select.appendChild(el);
        })
    }

    let form=document.querySelector("#form");
    
    form.addEventListener("submit",function (e) {
        e.preventDefault();
        let row =this.get_data();
        $.ajax({
            url: '/api/user/signup',
            method: 'post',
            data: row,
            cache: false,
            contentType: false,
            processData: false
        })
            .then(function (r) {
                console.log("r",r);
               if(r.success===true){
                   user.read();
               }else {
                   let msg=r.mag;
                   alert("添加失败，失败原因",msg);
               }
               user.clear_form_data(form);
            })
    })




    let user_ = document.querySelector(".user");
    user_event();
    function user_event() {
        let user_btn = document.querySelector("#user_btn");
        console.log("user_btn", user_btn);
        if (user_) {
            user_.addEventListener("mouseover", function () {
                user_btn.style.display = "block";
                user_.addEventListener("mouseout", function () {
                    user_btn.style.display = "none";
                })
            })
        }
    }

   

})();