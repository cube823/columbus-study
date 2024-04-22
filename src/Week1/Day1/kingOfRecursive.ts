import { PWD } from '../../pwd'

// 백준 25501번

const korFs = require('fs')

const korInput = korFs
  .readFileSync(`${PWD}/src/Week1/Day1/kingOfRecursive.txt`)
  .toString()
  .trim()
  .split('\n')

type Palindrome = 0 | 1

const korMap: Record<string, number> = {}

const recursion = (str: string, left: number, right: number): Palindrome => {
  korMap[str] += 1

  if (left >= right) return 1
  if (str[left] !== str[right]) return 0
  return recursion(str, left + 1, right - 1)
}

const korResult: string[] = []

for (const item of korInput.slice(1)) {
  korMap[item] = 0
  const result = recursion(item, 0, item.length - 1)
  korResult.push(`${result.toString()} ${korMap[item]}`)
}

console.log(korResult.join('\n'))
