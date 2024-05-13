import { PWD } from '../../pwd'

const fiboFs = require('fs')

const fiboInput = fiboFs.readFileSync(`${PWD}/src/Week4/Day1/fibo2.txt`).toString().trim()

const targetNumber = Number(fiboInput)

const fibo_map: Record<string, bigint> = {}

const fibo = (n: number): bigint => {
  const bigN = BigInt(n)

  if (bigN === 0n) return 0n
  if (bigN === 1n) return 1n

  if (fibo_map[n]) return fibo_map[n]

  const result = fibo(n - 1) + fibo(n - 2)
  fibo_map[n] = result

  return result
}

console.log(BigInt(fibo(targetNumber)).toString())
