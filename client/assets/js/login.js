//入口函数
window.addEventListener('load', function() {

    var btnLogin = document.querySelector('.loginButton');
    var usernumber = document.querySelector('.usernumber');
    var password = document.querySelector('.password');
    //点击登陆时触发
    btnLogin.addEventListener('click', function(e) {
        e.preventDefault();
        if (usernumber.value.length === 0 || password.value.length === 0) {
            alert('输入不能为空！')
        } else {
            // str = str.replace(/\s*/g,"");匹配正则表达式去除字符串全部空格
            var usernames = usernumber.value.replace(/\s*/g, "");
            var passwords = password.value.replace(/\s*/g, "");
            var datas = {
                username: usernames,
                password: passwords
            }
            $.ajax({
                method: 'POST',
                url: '/api/login',
                data: datas,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        alert('用户名或密码错误！请重试...');
                    } else {
                        var token = res.token;
                        localStorage.setItem('token', token);
                        location.href = './index.html'
                    }

                }
            })
        }
        usernumber.value = '';
        password.value = '';
    })

})