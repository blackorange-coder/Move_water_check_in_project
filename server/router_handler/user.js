const db = require('../db/index');

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken');


// 登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body;
    //判断数据是否合法
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不能为空！' });
    }

    const sql = `select * from move_water_userinfo where username=?`;
    db.query(sql, userinfo.username, function(err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err);
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！');
        // TODO：判断用户输入的登录密码是否和数据库中的密码一致

        // 1.剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = {...results[0], password: '', user_pic: '' };
        // 2.导入配置文件
        const config = require('../config');

        // 3.生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
    })
}


//得到大家的搬水次数
exports.getCount = (req, res) => {
    const sql = `select * from move_water_userinfo`;
    db.query(sql, function(err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err);
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length <= 0) return res.cc('查询无果！');
        res.send({
            status: 0,
            message: results

        })
    })
}


//得到自己的搬水次数
exports.getMyCount = (req, res) => {
    const sql = `select * from move_water_userinfo where username=?`;
    db.query(sql, req.user.username, function(err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err);
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('查询失败！');
        res.send({
            status: 0,
            message: results[0]
        })
    })
}