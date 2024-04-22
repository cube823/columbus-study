import { PWD } from '../../pwd'

// 백준 10870번

const fiboFs = require('fs')

const fiboInput = fiboFs.readFileSync(`${PWD}/src/Week1/Day1/fibo.txt`).toString().trim()

const targetNumber = Number(fiboInput)

const fibo_map: Record<number, number> = {}

const fibo = (n: number): number => {
  if (n === 0) return 0
  if (n === 1) return 1

  if (fibo_map[n]) return fibo_map[n]

  const result = fibo(n - 1) + fibo(n - 2)
  fibo_map[n] = result

  return result
}

console.log(fibo(targetNumber))
