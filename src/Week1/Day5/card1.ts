// 5568

import { PWD } from '../../pwd'

// 4 <= n <= 10
// 2 <= k <= 4
// 1 <= numbers <= 99

const fs = require('fs')
const input = fs.readFileSync(`${PWD}/src/Week1/Day5/card1.txt`).toString().trim().split('\n')

const N = Number(input.shift())
const K = Number(input.shift())
const strArr = input as string[]

const combinations = (items: string[]): Record<string, number> => {
  const result: Record<string, number> = {}

  const helper = (newItem: string[], currentCombination: string[]) => {
    if (currentCombination.length === K) {
      const newCombination = currentCombination.join('')

      if (!result[newCombination]) {
        result[newCombination] = 1
      }

      return
    }

    newItem.forEach((item, index) => {
      currentCombination.push(item)
      console.log('currentCombination', currentCombination)
      const _newItem = [...newItem.slice(0, index), ...newItem.slice(index + 1)]
      helper(_newItem, currentCombination)
      currentCombination.pop()
    })
  }

  helper(items, [])

  return result
}

const combination = combinations(strArr)
console.log(Object.values(combination).length)
