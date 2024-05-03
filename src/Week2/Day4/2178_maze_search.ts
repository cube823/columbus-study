import { PWD } from '../../pwd'

const fs = require('fs')

const [constants, ...input] = fs
  .readFileSync(`${PWD}/src/Week2/Day4/2178_maze_search.txt`)
  .toString()
  .trim()
  .split('\n')

const [N, M] = constants.split(' ').map(Number) as number[]
const maze = input.map((str: string) => str.split('').map(Number)) as number[][]

// (0,0)  부터 (N-1, M-1) 까지 최소 이동경로

const dx = [1, -1, 0, 0]
const dy = [0, 0, 1, -1]

const solution = () => {
  let count = 0

  const queue: number[][] = []

  const visited = Array.from({ length: N }).map(() => Array.from({ length: M }).map(() => false))

  const counts: number[][] = Array.from({ length: N }).map(() =>
    Array.from({ length: M }).map(() => 0)
  )

  queue.push([0, 0])

  while (queue.length) {
    const [x, y] = queue.shift() as number[]

    if (x === M - 1 && y === N - 1) return counts[N - 1][M - 1] + 1

    if (visited[y][x]) continue

    visited[y][x] = true
    count++

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx < 0 || yy < 0 || xx > M - 1 || yy > N - 1) continue

      if (!visited[yy][xx] && maze[yy][xx]) {
        queue.push([xx, yy])

        counts[yy][xx] = counts[y][x] + 1
      }
    }
  }
}

console.log(solution())
