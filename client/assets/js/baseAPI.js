$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    if (options.url === "/webservice/sms.php?method=Submit") {
        options.url = "http://106.ihuyi.com" + options.url;
        console.log(options.url);

    } else {
        options.url = 'http://127.0.0.1:3008' + options.url;
        console.log(options.url);

        // options.url = 'http://300e1cbd.cpolar.io' + options.url;
    }



    // 统一为有权限的接口，设置 headers 请求头
    //         /my/  判断路径带my的就添加headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    /*options.complete = function(res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }*/

})