window.addEventListener('load', function() {

    //通过ajax请求获取全部人的数据并渲染
    $.ajax({
        method: 'GET',
        url: '/api/paihangbang',
        success: function(res) {
            // console.log(res.message);
            var data = []; //保存全部人数据的数组
            var dateArray = []; //保存全部人上次签到时间的数组
            for (var i = 0; i < res.message.length; i++) {
                data.push(res.message[i]);
                dateArray.push(res.message[i].date);
            }
            // console.log(data);
            console.log(dateArray);
            //找到dateArray中最大值 从大到小排序，dateArray[0]项就是最大值
            for (var j = 0; j < dateArray.length; j++) {
                for (var i = 0; i < dateArray.length; i++) {
                    // console.log(dateArray[i]);
                    // console.log(data[i + 1].num);
                    if (dateArray[i] < dateArray[i + 1]) {
                        var num2 = dateArray[i];
                        dateArray[i] = dateArray[i + 1];
                        dateArray[i + 1] = num2;
                    }
                }
            }
            // console.log(dateArray);
            avoidRepeatedClicks(dateArray[0], "本周的水已经搬过了");

            // 搬水次数排序
            for (var j = 0; j < data.length - 1; j++) {
                for (var i = 0; i < data.length - 1; i++) {
                    // console.log(data[i].num);
                    // console.log(data[i + 1].num);
                    if (data[i].count < data[i + 1].count) {
                        var num2 = data[i];
                        data[i] = data[i + 1];
                        data[i + 1] = num2;
                    }
                }
            }
            //数据排序完毕
            // console.log(data);

            //数据渲染
            var listContent = document.getElementById('listContent');
            for (var i = 0; i < data.length; i++) {
                listContent.innerHTML += `
                <div class="listContent" id="studentName">${data[i].username}</div>
                <div class="listContent">搬水<span>${data[i].count}</span>次</div><br />
                `
            }
        }
    })


    //通过ajax请求获取自己的数据并渲染
    $.ajax({
        method: 'GET',
        url: '/my/mycount',
        success: function(res) {
            console.log(res.message);
            var mycount = res.message.count; //私人的搬水次数
            var mytelephone = res.message.telephone;
            //数据渲染
            var number = document.querySelector('.number');
            var mytelephoneclass = document.querySelector('.mytelephone');
            number.innerHTML = mycount;
            mytelephoneclass.innerHTML = mytelephone; //放页面保存起来，不显示

            //比较时间，判断是否可以再次点击
            var oldtime = res.message.date; //后端返回的上次签到时间
            console.log("oldtime=" + oldtime);
            //调用避免重复点击函数
            // avoidRepeatedClicks(oldtime, "您已经搬过水了");
        }
    })

    //调用签到函数
    clickButton();



    //定义点击签到功能的函数
    function clickButton() {
        //点击签到功能
        var click_btn = document.querySelector('.click_btn');
        click_btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('滴！勤劳卡！勤劳的人，迎娶富婆');
            $.ajax({
                method: 'GET',
                url: '/my/add',
                success: function(res) {
                    console.log(res);
                    var mycount = document.querySelector('.number').innerHTML;
                    var mytelephone = document.querySelector('.mytelephone').innerHTML;
                    //调用发送短信的函数
                    // sendTextMessage(mycount + 1, mytelephone);
                    location.reload();
                }
            })
        })
    }



    //定义发送短信的函数
    function sendTextMessage(count, telephone) {

        var data = {
            account: 'C60471620',
            password: '7cb7a387ea2db747be1b473fd4cc7e69',
            mobile: telephone,
            content: '您的验证码是：' + count + '。请不要把验证码泄露给其他人。',
            format: 'JSON'
        }

        console.log(data);

        $.ajax({
            method: 'GET',
            url: '/webservice/sms.php?method=Submit',
            data,
            success: function(res) {
                console.log(res);
            }
        })
    }


    //定义避免重复签到的函数
    function avoidRepeatedClicks(oldtime, msg) {
        var newtime = new Date();
        var newtimer = newtime.getTime(); //前端新获取的时间
        console.log("newtimer=" + newtimer);

        var timeCompare = newtimer - oldtime;
        console.log("timeCompare=" + timeCompare);
        console.log("timeCompare=" + parseInt(timeCompare / 1000 / 60) + "min");
        var click_btn = document.querySelector('.click_btn');
        var astrictTime = 1000 * 60 * 60 * 24 * 5; //*后面是天数
        if (timeCompare < astrictTime) {
            click_btn.disabled = "true";
            alert(msg);
        }
    }

})



//1629949319949第一次签到时间
/*1000毫秒=1s
1000*60 = 1min
1000*60*60=1h
1000*60*60*24=1day=86400000毫秒

分析：
1.控制个人的重复签到行为：
    签到前端新获取的时间 减去 后端返回的上次签到时间 小于 5天的毫秒数，禁止再次签到。

2.控制集体的重复签到行为：
    如果有其中一人数据更新了，其他人本周内就都不能签到了

    把所有人的原来的count数据保存为数组，
    点击之后
*/