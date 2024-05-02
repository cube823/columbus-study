import { PWD } from '../../pwd'

const fs = require('fs')
const [[N, M], ...input] = fs
  .readFileSync(`${PWD}/src/Week2/Day4/14502_lab.txt`)
  .toString()
  .trim()
  .split('\n')
  .map((str: string) => str.split(' ').map(Number)) as number[][]

const K = 3

// 3 <= N, M <= 8
// 64 P 3 === 64 * 63 * 62 === 250,000 === 2.5 * 10^5
// for 문을 10^5 번만큼 돌리고
// 그 안에서 DFS 로 2를 확산시킨 후
// 0의 갯수를 구한다.

// 1. input[x][y] === 0 인 공간의 좌표 어레이를 구한다.
// 2. 이 좌표를 3개 골라서 담는 어레이를 구한다.
// 3. 2번의 어레이를 for문을 돌려 각각 2가 최대로 확산되었을 때 0의 개수를 구한다.
// 4. 0 어레이에서 최댓값을 구해서 반환한다.

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

const safes: number[][] = []
const viruses: number[][] = []

for (let x = 0; x < N; x++) {
  for (let y = 0; y < M; y++) {
    if (input[x][y] === 0) {
      safes.push([x, y])
    } else if (input[x][y] === 2) {
      viruses.push([x, y])
    }
  }
}

const result = combinations(safes)
const zeros = safes.length

const dx = [1, -1, 0, 0]
const dy = [0, 0, 1, -1]

const solution = (grids: number[][], currentViruses: number[][]): number => {
  const visited = Array.from({ length: N }).map(() => Array.from({ length: M }).map(() => false))
  let newZeros = zeros - 3

  while (currentViruses.length) {
    const [x, y] = currentViruses.pop() as number[]

    if (visited[x][y]) continue

    if (grids[x][y] === 1) continue

    visited[x][y] = true

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (yy < 0 || xx < 0 || yy > M - 1 || xx > N - 1) continue
      if (!visited[xx][yy] && grids[xx][yy] === 0) {
        grids[xx][yy] = 2
        newZeros--
        currentViruses.push([xx, yy])
      }
    }
  }

  return newZeros
}

let answer = 0
result.forEach((threes, index) => {
  const grids = [...input.map((item) => [...item])]
  const currentViruses = [...viruses]

  threes.forEach(([x, y]) => {
    grids[x][y] = 1
  })

  const result = solution(grids, currentViruses)
  if (result > answer) answer = result
})

console.log(answer)
