// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 載入 record model
const Record = require('../../models/record')

const addCategoryIcon = require('./addCategoryIcon')  // 載入加上 category icon 的工具包
const totalAmount = require('./totalAmount')  //載入計算總金額的工具包

// 設定首頁路由
router.get('/', (req, res) => {
  Record.find() // 取出 record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'desc' }) //排序資料
    .then((records) => {
      const recordsWithIcon = addCategoryIcon(records)  //為每一筆資料加上 icon
      const total = totalAmount(records)  //用 records 資料計算總金額
      res.render('index', { recordsWithIcon, total }) // 將資料傳給 index 樣板
    })
    .catch(error => console.error(error)) // 錯誤處理
})

// 匯出路由模組
module.exports = router
