import { PWD } from '../../pwd'

const fs = require('fs')
const N = Number(fs.readFileSync(`${PWD}/src/Week4/Day3/2839_sugar.txt`).toString().trim())

// 3, 5
// greedy

let result = 0
let remains = N

const recursive = () => {
  if (remains <= 2) return

  if (remains % 5 === 0) {
    result += Math.round(remains * 0.2)
    remains = 0
    return
  }

  if (remains % 5 === 1 || remains % 5 === 2 || remains % 5 === 4) {
    if (remains >= 3) {
      result += 1
      remains -= 3
      recursive()
      return
    }
  }

  if (remains % 5 === 3) {
    if (remains >= 5) {
      result += 1
      remains -= 5
      recursive()
      return
    }

    result += 1
    remains -= 3
    recursive()
    return
  }

  result += 1
  remains -= 3
  recursive()
  return
}

recursive()
const ans = remains ? -1 : result
console.log(ans)
