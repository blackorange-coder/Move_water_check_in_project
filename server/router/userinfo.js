const express = require('express')
    // 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const userinfoHandler = require('../router_handler/userinfo');

// 接口3、获取用户信息
router.get('/add', userinfoHandler.getUserInfo);




// 将路由对象共享出去
module.exports = router