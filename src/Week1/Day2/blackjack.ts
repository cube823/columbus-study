// 백준 2798

import { PWD } from '../../pwd'

const blackjackFs = require('fs')

const blackjackInput = blackjackFs
  .readFileSync(`${PWD}/src/Week1/Day2/blackjack.txt`)
  .toString()
  .trim()

const [n, m] = blackjackInput.split('\n')[0].split(' ').map(Number)
const cards = blackjackInput.split('\n')[1].split(' ').map(Number)

let result = 0

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    for (let k = j + 1; k < n; k++) {
      const sum = cards[i] + cards[j] + cards[k]
      if (sum <= m && sum > result) {
        result = sum
      }
    }
  }
}

console.log(result)
