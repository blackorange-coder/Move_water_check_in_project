const express = require('express')
    // 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user');
// 接口1、注册新用户 展示不写注册接口
router.post('/reguser', (req, res) => {
    res.send('reguser OK')
});
// 接口2、登录
router.post('/login', userHandler.login);

router.get('/paihangbang', userHandler.getCount);

router.get('/mycount', userHandler.getMyCount);



// 将路由对象共享出去
module.exports = router