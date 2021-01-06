//產出把 category 資料留在表單裡需要的物件
const categoryList = require('../../models/seeds/categoryList.json').category
// console.log(categoryList)

function selectData(data) {
  if (!data) return
  const cate = categoryList.find(cate => cate.name === data)
  const options = {
    home: false,
    transportation: false,
    entertainment: false,
    food: false,
    other: false
  }
  options[cate.nameEN] = true;
  return options
}

module.exports = selectData