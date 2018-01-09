;(function () {
    "use strict";
    let login = document.querySelector(".login");
    let sigout = document.querySelector(".sigout");
    init();

    function init() {
        _login();
        _sigout();
    }

    function _login() {
        login.addEventListener("click", function () {
            window.location = "login";
        })
    }

    function _sigout() {
        sigout.addEventListener("click", function () {
            window.location = "signup"
        })
    }


})();