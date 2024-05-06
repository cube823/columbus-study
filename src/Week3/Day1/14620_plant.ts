import { PWD } from '../../pwd'

const fs = require('fs')
const [n, ...input] = fs
  .readFileSync(
    process.platform === 'linux' ? '/dev/stdin' : `${PWD}/src/Week3/Day1/14620_plant.txt`
  )
  .toString()
  .trim()
  .split('\n')

const N = Number(n)
const K = 3
const grid = input.map((item: string) => item.split(' ').map((value) => +value))

const dx = [0, 1, -1, 0, 0]
const dy = [0, 0, 0, 1, -1]

const checkInGrid = (x: number, y: number) => {
  if (x - 1 < 0 || x + 1 > N - 1 || y - 1 < 0 || y + 1 > N - 1) return false
  return true
}

const checkDuplicated = (items: number[][]) => {
  const [coord1, coord2, coord3] = items

  const coord = new Set<string>()

  for (let i = 0; i < 5; i++) {
    const xx = coord1[0] + dx[i]
    const yy = coord1[1] + dy[i]
    coord.add(`${xx}-${yy}`)
  }

  for (let i = 0; i < 5; i++) {
    const xx = coord2[0] + dx[i]
    const yy = coord2[1] + dy[i]
    coord.add(`${xx}-${yy}`)
  }

  for (let i = 0; i < 5; i++) {
    const xx = coord3[0] + dx[i]
    const yy = coord3[1] + dy[i]
    coord.add(`${xx}-${yy}`)
  }

  return coord.size === 15
}

const maps = (): number[][] => {
  const result: number[][] = []
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      result.push([x, y])
    }
  }
  return result
}

const map = maps()

const combinations = (items: number[][]): number[][][] => {
  const result: number[][][] = []

  const helper = (newItem: number[][], currentCombination: number[][]) => {
    if (currentCombination.length === K) {
      result.push([...currentCombination])

      return
    }

    newItem.forEach((item, index) => {
      currentCombination.push(item)
      const _newItem = [...newItem.slice(index + 1)]
      helper(_newItem, currentCombination)
      currentCombination.pop()
    })
  }

  helper(items, [])

  return result
}

const combination = combinations(map)

const bfs = () => {
  let min = 200 * 5 * 3

  combination.forEach((arr) => {
    let temp = 0

    if (checkDuplicated(arr) && arr.every((item) => checkInGrid(item[0], item[1]))) {
      for (let i = 0; i < 3; i++) {
        const item = arr[i]

        for (let j = 0; j < 5; j++) {
          const xx = item[0] + dx[j]
          const yy = item[1] + dy[j]

          temp += grid[xx][yy]
        }
      }

      if (min > temp) min = temp
    }
  })

  return min
}

console.log(bfs())
