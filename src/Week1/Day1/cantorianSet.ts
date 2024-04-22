import { PWD } from '../../pwd'

// 백준 4779번

const cantorianFs = require('fs')

const cantorianInput = cantorianFs
  .readFileSync(`${PWD}/src/Week1/Day1/cantorianSet.txt`)
  .toString()
  .trim()
  .split('\n')

const cantorianSet: Record<number, string> = {}
const cantorianResult: string[] = []

const cantorian_arr = cantorianInput.map(Number)
cantorianSet[0] = '-'

const cantorian = (targetNumber: number): string => {
  if (cantorianSet[targetNumber]) return cantorianSet[targetNumber]

  const newItem =
    cantorian(targetNumber - 1) + ' '.repeat(3 ** (targetNumber - 1)) + cantorian(targetNumber - 1)
  cantorianSet[targetNumber] = newItem

  return newItem
}

for (const item of cantorian_arr) {
  if (cantorianSet[item]) cantorianResult.push(cantorianSet[item])
  else {
    const newItem = cantorian(item)
    cantorianResult.push(newItem)
  }
}

console.log(cantorianResult.join('\n'))
