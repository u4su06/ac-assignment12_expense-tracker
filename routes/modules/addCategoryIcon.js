//附加 category 圖示在每一筆資料中
const categoryList = require('../../models/seeds/categoryList.json').category

function addCategoryIcon(records) {
  if (!records) return
  const recordsWithIcon = []
  for (let i = 0; i < records.length; i++) {
    const itemCate = records[i].category
    const cateList = categoryList.find(cate => cate.name === itemCate)
    const cateIcon = cateList.icon
    records[i].icon = cateIcon
    recordsWithIcon.push(records[i])
  }
  return recordsWithIcon
}

module.exports = addCategoryIcon