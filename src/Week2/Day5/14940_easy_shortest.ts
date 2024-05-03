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
  if (xx < 0 || yy < 0 || xx > N - 1 || yy > M - 1) return false
  return true
}

const getStart = () => {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (grid[x][y] === 2) {
        answers[x][y] = 0
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

    visited[x][y] = true

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (!checkInGrid([xx, yy])) continue

      if (grid[xx][yy] === 0 && answers[xx][yy] === -1) answers[xx][yy] = 0

      if (grid[xx][yy] === 1 && answers[xx][yy] === -1) {
        answers[xx][yy] = answers[x][y] + 1
        visited[xx][yy] = true
        queue.push([xx, yy])
      }
    }
  }

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (grid[x][y] === 0) answers[x][y] = 0
    }
  }
}

bfs()
console.log(answers.map((ans) => ans.join(' ')).join('\n'))
