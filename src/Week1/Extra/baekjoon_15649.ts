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

const permutations = () => {
  if (result.length === M) {
    console.log(result.join(' '))
    return
  }

  for (let i = 0; i < N; i++) {
    if (result.includes(numbers[i])) continue

    result.push(numbers[i])
    permutations()
    result.pop()
  }
}

permutations()
