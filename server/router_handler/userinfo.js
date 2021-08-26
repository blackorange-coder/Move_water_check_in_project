const db = require('../db/index');




// 获取用户信息处理函数
exports.getUserInfo = (req, res) => {
    // console.log(req.user.username);
    //1.先查询到我自己的ID
    //2.查询成功后添加处理
    const sql = `select * from move_water_userinfo where username=?`;
    db.query(sql, req.user.username, function(err, results) {
        // console.log(req.user);
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc("获取用户信息失败！");
        // console.log(results[0].count);
        var name = req.user.username;
        const mycount = results[0].count;
        var count = mycount + 1;
        const date = new Date();
        var datemm = date.getTime();
        var arr = { name, date, count, datemm };
        const sqlStr = `INSERT INTO move_water_count (username,date,count) VALUES (?,?,?)`;
        db.query(sqlStr, [arr.name, arr.date, arr.count], function(err, results) {
            if (err) return res.cc(err);
            if (results.length < 0) return res.cc("获取用户信息失败！");
            //查询成功后执行
            const sqlStr = 'update move_water_userinfo set count=?,date=? where username=?'
                // 3.调用 db.query() 执行 SQL 语句的同时，使用数组依次为占位符指定具体的值
            db.query(sqlStr, [arr.count, arr.datemm, arr.name], (err, results) => {
                if (err) return console.log(err.message) //失败
                    // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
                if (results.affectedRows === 1) {
                    console.log('更新数据成功') //成功
                }
                res.send({
                    status: 0,
                    message: '签到成功'
                })
            })


        })
    })
}