import { PWD } from '../../pwd'

const fs = require('fs')

const [N, M] = fs
  .readFileSync(`${PWD}/src/Week1/Extra/baekjoon_15649.txt`)
  .toString()
  .trim()
  .split(' ')
  .map(Number) as number[]

const result: number[] = []
const numbers = Array.from({ length: N }).map((_, index) => index + 1)

const combinations = () => {
  if (result.length === M) {
    console.log(result.join(' '))
    return
  }

  numbers.forEach((item, index) => {
    if (!result.includes(item)) {
      result.push(item)

      if (result.length > 1 ? result[result.length - 1] > result[result.length - 2] : true) {
        combinations()
      }

      result.pop()
    }
  })
}

combinations()
