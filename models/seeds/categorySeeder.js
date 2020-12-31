const mongoose = require('mongoose')
const Category = require('../category.js') // 載入 model
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const categoryList = require('./categoryList.json').category

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected! c')

  for (let i = 0; i < categoryList.length; i++) {
    Category.create({
      category: categoryList[i].name,
      categoryEN: categoryList[i].nameEN,
      categoryIcon: categoryList[i].icon,
    })
  }

  console.log('categorySeeder done')
})