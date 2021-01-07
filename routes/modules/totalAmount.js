// 計算總金額
function totalAmount(records) {
  let total = 0

  for (let i = 0; i < records.length; i++) {
    total += records[i].amount
  }
  return total
}

module.exports = totalAmount