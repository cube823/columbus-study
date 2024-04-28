// 2961

import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs
  .readFileSync(`${PWD}/src/Week1/Day5/deliciousFood.txt`)
  .toString()
  .trim()
  .split('\n')

const N = Number(input.shift())
const ingredients: string[][] = input.map((item: string) => item.split(' '))

// ingredients 는 [[S, B]] 구조이다.
// S 는 product, B 는 plus 다.

let result = 10 ** 9

function getPermutations(k: number) {
  function generatePermutation(currentPermutation: string[][], remainingNumbers: string[][]): void {
    if (currentPermutation.length === k) {
      const numbers: number[] = []

      currentPermutation.forEach((item) => {
        numbers.push(Number(item[0]))
        numbers.push(Number(item[1]))
      })

      let S = 1
      let B = 0

      numbers
        .filter((_, index) => index % 2 === 0)
        .forEach((item) => {
          S *= item
        })

      numbers
        .filter((_, index) => index % 2 === 1)
        .forEach((item) => {
          B += item
        })

      const difference = Math.abs(S - B)
      if (difference < result) {
        result = difference
      }
      return
    }

    for (let i = 0; i < remainingNumbers.length; i++) {
      if (result === 0) {
        return
      }

      const newNumber = remainingNumbers[i]
      const newPermutation = [...currentPermutation, newNumber]

      generatePermutation(newPermutation, remainingNumbers.slice(i + 1))
    }
  }

  generatePermutation([], ingredients)
}

for (let i = 1; i <= N; i++) {
  getPermutations(i)
}

console.log(result)
