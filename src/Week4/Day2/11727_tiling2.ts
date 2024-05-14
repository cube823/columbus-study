import { PWD } from '../../pwd'

const fs = require('fs')
const N = Number(fs.readFileSync(`${PWD}/src/Week4/Day2/11727_tiling2.txt`).toString().trim())

const hashMap: Record<number, number> = { 1: 1, 2: 3 }

const recursive = (n: number): number => {
  if (n === 2) return 3
  if (n === 1) return 1
  if (hashMap[n]) return hashMap[n]

  const item = (n % 2 === 0 ? recursive(n - 1) * 2 + 1 : recursive(n - 1) * 2 - 1) % 10007

  hashMap[n] = item

  return item
}

console.log(recursive(N))
