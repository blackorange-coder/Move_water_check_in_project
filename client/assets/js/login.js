//入口函数
window.addEventListener('load', function() {
    // var input = document.querySelectorAll('input');
    // // console.log(input);
    // var i;
    // for (i = 0; i < input.length; i++) {
    //     input[i].addEventListener('focus', function() {
    //         // console.log(this);
    //         this.value = '';
    //     })
    // }
    // for (i = 0; i < input.length; i++) {
    //     input[i].addEventListener('blur', function() {
    //         // console.log(this);
    //         input[0].value = '账户';
    //         input[1].value = '密码';
    //     })
    // }


    var btnLogin = document.querySelector('.loginButton');
    var usernumber = document.querySelector('.usernumber');
    var password = document.querySelector('.password');
    //点击登陆时触发
    btnLogin.addEventListener('click', function() {

        if (usernumber.value.length === 0 || password.value.length === 0) {
            alert('输入不能为空！')
        } else {
            // str = str.replace(/\s*/g,"");匹配正则表达式去除字符串全部空格
            var usernames = usernumber.value.replace(/\s*/g, "");
            var passwords = password.value.replace(/\s*/g, "");

            console.log(usernames);
            console.log(passwords);
            console.log('==============');
            var datas = {

                // username: usernumber.value.trim(),
                // password: password.value.trim()
                username: usernames,
                password: passwords
            }
            console.log(datas);

            $.ajax({
                method: 'POST',
                url: 'http://127.0.0.1:3007/api/login',
                data: datas,
                success: function(res) {
                    console.log(res);
                    // console.log('server return datas is:' + res);
                    var token = res.token;
                    localStorage.setItem('token', token);
                    location.href = './html/index.html'
                }
            })

        }

        usernumber.value = '';
        password.value = '';
    })

})