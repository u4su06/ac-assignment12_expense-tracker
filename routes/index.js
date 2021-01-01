// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組
const home = require('./modules/home') // 引入 home 模組程式碼
const records = require('./modules/records') // 引入 records 模組程式碼

router.use('/', home) // 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/records', records) // 將網址結構符合 /records 字串開頭的 request 導向 records 模組 


// 匯出路由器
module.exports = router