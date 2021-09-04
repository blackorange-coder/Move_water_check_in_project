const mysql = require('mysql');
const db = mysql.createPool({
    host: '47.242.230.64',
    user: 'root',
    password: '1',
    database: 'move_water',
})


// 向外共享 db 数据库连接对象
module.exports = db;