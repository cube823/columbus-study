// 백준 18312

import { PWD } from '../../pwd'

const clock_fs = require('fs')

const clock_input = clock_fs
  .readFileSync(`${PWD}/src/Week1/Day3/clock.txt`)
  .toString()
  .trim()
  .split(' ')

const [N, K] = clock_input

const numberN = Number(N)
let result = 0

const getPad = (num: number) => `${num}`.padStart(2, '0')

// 최대 반복 횟수 24 * 60 * 60 = 10^5 미만
for (let i = 0; i <= numberN; i++) {
  for (let j = 0; j < 60; j++) {
    for (let k = 0; k < 60; k++) {
      if (getPad(i).includes(K) || getPad(j).includes(K) || getPad(k).includes(K)) {
        result++
      }
    }
  }
}

console.log(result)
