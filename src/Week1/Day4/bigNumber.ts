// 백준 18511번 큰 수

import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs.readFileSync(`${PWD}/src/Week1/Day4/bigNumber.txt`).toString().trim().split('\n')

// K 개의 수 중에서 N개만큼 중복하여 숫자를 골라 조합할 수 있는 경우의 수
// 10^1 <= N <= 10^8

// 8^8=16777216

const [N, K] = input[0].split(' ')
const numbers = input[1].split(' ').map(Number)

// numbers 중에서 N의 자릿수만큼 중복하여 숫자를 골라 조합할 수 있는 경우의 수
// 10^1 <= N <= 10^8

const digit = N.length
const targetNumber = Number(N)
const result: number[] = []

function nestedLoops(level: number, counter: number = 0) {
  if (level === 1) {
    for (const item of numbers) {
      const newItem = counter + item
      if (newItem <= targetNumber) {
        result.push(newItem)
      }
    }

    return
  }

  for (const item of numbers) {
    nestedLoops(level - 1, counter + 10 ** (level - 1) * item)
  }
}

nestedLoops(digit)

if (result.length === 0) {
  nestedLoops(digit - 1)
}

console.log(Math.max(...result))
