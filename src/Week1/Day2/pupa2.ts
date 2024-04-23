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

const solution = () => {
  const arr = [0, 1, 0, 1]
  while (true) {
    n += 1

    for (let i = 0; i < n; i++) arr.push(0)
    for (let i = 0; i < n; i++) arr.push(1)

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === K) count++

      if (count === T) {
        console.log(target % A)
        return
      }

      console.log('target', target)
      target++
    }
  }
}

solution()
