(function() {
        // disable browser back button
        $(document).ready(function () {
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function () {
                    window.history.pushState('forward', null, '');
                    window.history.forward(1);
                });
            }
            //
            window.history.pushState('forward', null, '');  //disable in IE
            window.history.forward(1);
        });
        let loginForm = document.forms['signin'];
        loginForm.addEventListener('submit', function (event) {
           event.preventDefault();
           event.stopPropagation();

           //console.log(loginForm.username.value)
            if (loginForm.checkValidity()) {
                $.ajax({
                    type: "POST",
                    url: '/signin',
                    data: JSON.stringify({username: loginForm.username.value, password: loginForm.password.value}),
                    contentType: "application/json; charset=utf-8",
                    complete: function (res) {
                       // console.log(res.responseJSON.err_code);
                        if(res.status !== 200) {
                            loginForm.username.value = "";
                            loginForm.password.value = "";
                            $('#loginWarning').show();
                        }else {
                            window.location.href = "/signin";
                        }
                    }
                })
            }

        }, false);



    }
)();