// 根據種類 category 篩選資料
function filterRecord(data, category) {
  let result = data.filter(item => item.category === category)
  return result
}

module.exports = filterRecord