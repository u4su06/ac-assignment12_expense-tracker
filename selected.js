// 轉換 editItem = req.body 物件
const selected = (categoryEN) => {
  if (!categoryEN) return
  const options = {
    home: false,
    transportation: false,
    entertainment: false,
    food: false,
    other: false
  }
  options[categoryEN] = true;
  return options
}

module.exports = selected;