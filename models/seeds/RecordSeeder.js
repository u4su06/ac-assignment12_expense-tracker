const Record = require('../record.js') // 載入 model
const recordList = require('./record.json')
const db = require('../../config/mongoose') // 載入連線設定

db.once('open', () => {
  console.log('mongodb connected! r')

  for (let i = 0; i < recordList.length; i++) {
    Record.create({
      name: recordList[i].name,
      date: recordList[i].date,
      category: recordList[i].category,
      categoryEN: recordList[i].categoryEN,
      amount: recordList[i].amount,
    })
  }

  console.log('recordSeeder done')
})