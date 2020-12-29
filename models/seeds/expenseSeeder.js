const mongoose = require('mongoose')
const Expense = require('../expense.js') // 載入 model
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < 10; i++) {
    Expense.create({ name: 'name-' + i })
  }

  console.log('done')
})