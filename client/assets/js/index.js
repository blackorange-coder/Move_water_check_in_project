window.addEventListener('load', function() {
    var data = [{
        name: '孙鹏程',
        num: 12
    }, {
        name: '马宇航',
        num: 90
    }, {
        name: '郭\t\t洋',
        num: 100
    }, {
        name: '吴雨辰',
        num: 11
    }, ]


    for (var j = 0; j < data.length - 1; j++) {
        for (var i = 0; i < data.length - 1; i++) {
            // console.log(data[i].num);
            // console.log(data[i + 1].num);
            if (data[i].num < data[i + 1].num) {
                var num2 = data[i].num
                data[i].num = data[i + 1].num
                data[i + 1].num = num2
                var name2 = data[i].name
                data[i].name = data[i + 1].name
                data[i + 1].name = name2
            }
        }
    }
    console.log(data);

    var listContent = document.getElementById('listContent');
    for (var i = 0; i < data.length; i++) {
        listContent.innerHTML += `
        <div class="listContent" id="studentName">${data[i].name}</div>
        <div class="listContent">搬水<span>${data[i].num}</span>次</div><br />
        `
    }
    var click_btn = document.querySelector('.click_btn');
    click_btn.addEventListener('click', function() {
        localStorage.removeItem('token');
    })

    // var datalength = data.length
    // console.log(data);

    // console.log(datalength);


    // var back = history.back()
    // if (back) {
    //     console.log(back);
    // }



})