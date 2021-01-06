// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 載入 record model
const Record = require('../../models/record')
// 載入把 category 資料留在表單裡的工具包
const selectData = require('./selectData')

// new 頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//  Create 動作
router.post('/', (req, res) => {
  const newItem = req.body  // 從 req.body 拿出表單裡的 name 資料
  return Record.create({  // 存入資料庫
    name: newItem.name,
    date: newItem.date,
    category: newItem.category,
    amount: newItem.amount,
  })
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// edit 頁面，顯示特定一筆資料
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      const options = selectData(record.category)
      res.render('edit', { record, options })
    })
    // .then((record) => console.log(record))
    .catch(error => console.log(error))
})

// edit 動作，修改資料並返回首頁
router.put('/:id', (req, res) => {
  const id = req.params.id
  const item = req.body
  return Record.findById(id)
    .then(record => {
      record.name = item.name
      record.date = item.date
      record.category = item.category
      record.amount = item.amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router