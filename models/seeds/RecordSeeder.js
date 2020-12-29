const mongoose = require('mongoose')
const Record = require('../record.js') // 載入 model
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const recordList = require('./record.json')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected! r')

  for (let i = 0; i < recordList.length; i++) {
    Record.create({
      name: recordList[i].name,
      date: recordList[i].date,
      category: recordList[i].category,
      amount: recordList[i].amount,
    })
  }

  console.log('recordSeeder done')
})