// 백준 15721
// A <= 2000
// T <= 10000
// K === 0 | 1

// T 가 10^4 이하이므로 O(n^2) 이하로 풀어야 한다.

import { PWD } from '../../pwd'

const pupaFs = require('fs')

const pupaInput = pupaFs
  .readFileSync(`${PWD}/src/Week1/Day2/pupa.txt`)
  .toString()
  .trim()
  .split('\n')

const [A, T, K] = pupaInput.map(Number)

let n = 1
let count = 0
let target = 0

const getNum = (val: number) => {
  return val ** 2 + 7 * val
}

while (true) {
  if (T * 2 <= getNum(n)) break
  count += getNum(n) / 2
  target += getNum(n)
  n++
}

const getArr = () => {
  const arr = []
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) arr.push(0)
    else arr.push(1)
  }

  const residual = getNum(n) - getNum(n - 1)

  for (let i = 0; i < residual - 4; i++) {
    if (i < (residual - 4) / 2) arr.push(0)
    else arr.push(1)
  }

  return arr
}

const arr = getArr()

while (arr.length) {
  const num = arr.shift()
  if (num === K) count++
  target++

  if (count === T) break
}

console.log((target - 1) % A)
