import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs
  .readFileSync(`${PWD}/src/Week2/Day1/6603_german_lotto.txt`)
  .toString()
  .trim()
  .split('\n')
  .slice(0, -1) as string[]

const hashMap: Record<string, number[]> = {}
let cnt = 0
const solution = (parentArr: number[]) => {
  const combination = (arr: number[], current: number) => {
    const joined = arr.join(' ')
    if (arr.length === 6) {
      console.log(joined)
      return
    }

    for (let i = current; i < parentArr.length; i++) {
      if (arr.includes(parentArr[i])) continue
      const newArr = [...arr, parentArr[i]]
      cnt++
      console.log(hashMap[joined])
      combination(newArr, i)
      newArr.pop()
    }
  }

  combination([], 0)
}

for (const arr of input) {
  const [k, ...items] = arr.split(' ').map(Number)
  solution(items)
  console.log('')
}

console.log(cnt)
