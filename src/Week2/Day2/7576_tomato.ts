// 7576

import { PWD } from '../../pwd'

// 2 <= M, N <= 1,000
// 정수 1은 익은 토마토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.

// Output
// 여러분은 토마토가 모두 익을 때까지의 최소 날짜를 출력해야 한다.
// 만약, 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고,
// 토마토가 모두 익지는 못하는 상황이면 -1을 출력해야 한다.

const fs = require('fs')
const [condition, ...input] = fs
  .readFileSync(`${PWD}/src/Week2/Day2/7576_tomato.txt`)
  .toString()
  .trim()
  .split('\n')

const [M, N] = condition.split(' ').map(Number) as number[]

const tomatoes = Array.from({ length: N }).map((_) => Array.from({ length: M }).map(() => 0))
const visited: boolean[][] = []

for (let i = 0; i < tomatoes.length; i++) {
  visited.push([])
  for (let j = 0; j < tomatoes[i].length; j++) visited[i].push(false)
}

const coords = [] as number[][]

for (let x = 0; x < M; x++) {
  for (let y = 0; y < N; y++) {
    const arr = input[y].split(' ').map(Number) as number[]

    if (arr[x] === -1) visited[y][x] = true
    if (arr[x] === 1) coords.push([x, y])

    tomatoes[y][x] = arr[x]
  }
}

const dy = [0, 0, 1, -1]
const dx = [1, -1, 0, 0]

let stack: number[][] = []
let render = 0

const dfs = (x: number, y: number) => {
  visited[y][x] = true

  for (let i = 0; i < 4; i++) {
    const yy = y + dy[i]
    const xx = x + dx[i]

    if (xx < 0 || yy < 0 || xx >= M || yy >= N) continue
    if (visited[yy][xx]) continue
    if (tomatoes[yy][xx] === 0) {
      visited[yy][xx] = true
      stack.push([xx, yy])
      render++
    }
  }
}

const solution = () => {
  let cnt = 0
  while (coords.length) {
    const [x, y] = coords.pop() as number[]

    dfs(x, y)

    if (!coords.length && stack.length) {
      while (stack.length) coords.push(stack.pop() as number[])
      cnt++
    }
  }

  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[i].length; j++) {
      if (visited[i][j] === false) return -1
    }
  }

  console.log(render)
  return cnt
}

console.log(solution())
