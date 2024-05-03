import { PWD } from '../../pwd'

const fs = require('fs')

const input = fs
  .readFileSync(`${PWD}/src/Week2/Day5/14940_easy_shortest.txt`)
  .toString()
  .trim()
  .split('\n')

const [N, M] = input.shift().split(' ').map(Number) as number[]

const grid = input.map((str: string) => str.split(' ').map(Number))

// 2 <= n, m <= 10^3
// 원래 갈 수 없는 땅 위치, 즉 0 -> 0, 1인 곧 중에 도달할 수 없는 위치는 -1
// target 좌표 (tx, ty) 가 주어진다.
// answer grid 를 만든 후 각 좌표별로 (tx, ty) 까지의 최단거리를 구한다.
// 최단거리를 구하는 함수는 bfs 로 구현한다.

const answers = Array.from({ length: N }).map(() => Array.from({ length: M }).map(() => -1))
const visited = Array.from({ length: N }).map(() => Array.from({ length: M }).map(() => false))

const dx = [1, -1, 0, 0]
const dy = [0, 0, 1, -1]

const checkInGrid = ([xx, yy]: number[]) => {
  if (xx < 0 || yy < 0 || xx > M - 1 || yy > N - 1) return false
  return true
}

const getStart = () => {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (grid[y][x] === 2) {
        grid[y][x] = 0
        answers[y][x] = 0
        return [x, y]
      }
    }
  }
  return [-1, -1]
}

const start = getStart()

const bfs = () => {
  const queue: number[][] = []

  queue.push(start)

  while (queue.length) {
    const [x, y] = queue.shift() as number[]

    if (visited[y][x]) continue
    visited[y][x] = true

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (!checkInGrid([xx, yy])) continue

      if (grid[yy][xx] === 0) answers[yy][xx] = 0

      if (grid[yy][xx] === 1 && answers[yy][xx] === -1) {
        answers[yy][xx] = answers[y][x] + 1
        queue.push([xx, yy])
      }
    }
  }
}

bfs()
console.log(answers.map((ans) => ans.join(' ')).join('\n'))
