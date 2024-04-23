// 백준 2231
// N <= 10^6

// N 이 10^6 이하이므로 O(NLogN) 이하로 풀어야 한다.

// x = abc + a + b + c

import { PWD } from '../../pwd'

const digitGeneratorFs = require('fs')

const digitGeneratorInput = digitGeneratorFs
  .readFileSync(`${PWD}/src/Week1/Day2/digitGenerator.txt`)
  .toString()
  .trim()

const num = Number(digitGeneratorInput)
let answer = num - digitGeneratorInput.length * 9

while (true) {
  if (answer >= num) {
    answer = 0
    break
  }

  const str = String(answer)
  let sum = answer
  for (const n of str) {
    sum += +n
  }

  if (sum === num) break

  answer += 1
}

console.log(answer)
