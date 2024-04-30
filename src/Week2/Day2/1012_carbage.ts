/**
 * Input
 * T
 * 1 <= M <= 50
 * 1 <= N <= 50
 * 1<= K <= 2500
 *
 * 각 테스트 케이스에 필요한 최소 지렁이 개수
 */

import { PWD } from '../../pwd'

const fs = require('fs')

const [T, ...input] = fs
  .readFileSync(`${PWD}/src/Week2/Day2/1012_carbage.txt`)
  .toString()
  .trim()
  .split('\n')

interface Map {
  index: number
  M: number
  N: number
  K: number
  map: number[][]
}

const maps: Map[] = []

let currentIndex = -1
while (input.length) {
  const arr = input.shift().split(' ').map(Number) as number[]
  if (arr.length === 3) {
    currentIndex += 1
    maps.push({
      index: currentIndex,
      M: arr[0],
      N: arr[1],
      K: arr[2],
      map: [],
    })
  } else if (arr.length === 2) {
    maps[currentIndex].map.push(arr)
  }
}

const dy = [0, 0, 1, -1]
const dx = [1, -1, 0, 0]

const solution = ({ M, N, K, map }: Map) => {
  let target = 0

  // O(M*N)
  const farm = Array.from({ length: N }).map((_) => Array.from({ length: M }).map(() => 0))

  // O(K)
  for (let i = 0; i < map.length; i++) farm[map[i][1]][map[i][0]] = 1

  // O(M*N)
  const visited = Array.from({ length: N }).map((_) => Array.from({ length: M }).map(() => false))

  const dfs = (x: number, y: number): void => {
    visited[y][x] = true
    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx < 0 || yy < 0 || xx >= M || yy >= N) continue
      if (visited[yy][xx]) continue

      if (farm[yy][xx]) {
        dfs(xx, yy)
      }
    }
  }

  while (map.length) {
    const [x, y] = map.pop() as number[]

    if (visited[y][x]) continue
    dfs(x, y)

    target++
  }

  return target
}

for (let i = 0; i < maps.length; i++) {
  const target = solution(maps[i])
  console.log(target)
}
