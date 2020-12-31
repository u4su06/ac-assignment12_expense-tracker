// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser

const Record = require('./models/record.js') // 載入 record model

const app = express()

mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定首頁路由
app.get('/', (req, res) => {
  Record.find() // 取出 record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(records => res.render('index', { records })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// new 頁面
app.get('/records/new', (req, res) => {
  return res.render('new')
})

//  Create 動作
app.post('/records', (req, res) => {
  const newItem = req.body       // 從 req.body 拿出表單裡的 name 資料

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
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    // .then((record) => console.log(record))
    .catch(error => console.log(error))
})

// edit 動作，修改資料並返回首頁
app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const item = req.body
  return Record.findById(id)
    .then(record => {
      record.name = item.name
      record.date = item.date
      record.category = item.category
      record.categoryEN = item.categoryEN
      record.amount = item.amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除一筆資料
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})