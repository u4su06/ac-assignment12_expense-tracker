const Category = require('../category.js') // 載入 model
const categoryList = require('./categoryList.json').category
const db = require('../../config/mongoose') // 載入連線設定

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