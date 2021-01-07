// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 載入 record model
const Record = require('../../models/record')
// 載入把 category 資料留在表單裡的工具包
const selectData = require('./selectData')

router.get('/', (req, res) => {
  const filter = req.query.filter
  const options = selectData(filter)
  Record.find() // 取出 record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'desc' }) //排序資料
    .then(records => res.render('index', { records, options })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 匯出路由模組
module.exports = router