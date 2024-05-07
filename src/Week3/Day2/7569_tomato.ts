import { PWD } from '../../pwd'

// 3차원 문제
// MxN grid 가 H 개 반복되는 2차원 그리드로 푸는게 단순할 것으로 예상
// H 개가 없는 tomato 문제를 풀었던 적이 있다.
// 이때랑 마찬가지로 (아마도) answers map 을 활용하는 방식을 택하면 될 것 같다.
// bfs + answersMap

// 1인 좌표를 담은 배열을 만든다.
// 해당 배열을 queue에 넣어 하루씩 익도록 만든다.
// 배열 내 0이 존재하지 않으면 가장 큰 수를, 0이 존재하면 -1을 리턴한다.

const fs = require('fs').readFileSync(`${PWD}/src/Week3/Day2/7569_tomato2.txt`)
const input = fs
  .toString()
  .trim()
  .split('\n')
  .map((str: string) => str.split(' '))

const queue = [] as number[][]
const stack = [] as number[][]

const [M, N, H] = input.shift().map(Number) as number[]
let cnt = 0

const dx = [1, -1, 0, 0, 0, 0]
const dy = [0, 0, 1, -1, 0, 0]
const dz = [0, 0, 0, 0, 1, -1]

const grid: number[][] = input.map((s: string[]) => s.map((el) => Number(el)))

const tomatoes: number[][][] = Array.from({ length: H }).map(() => [])

grid.forEach((list, index) => {
  tomatoes[Math.floor(index / N)].push(list)
})

const visited = tomatoes.map((list) => list.map((item) => item.map(() => false)))
const answers = tomatoes.map((list) => list.map((item) => item.map(() => 0)))

let freshTomatoes = 0

const solution = () => {
  for (let d = 0; d < H; d++) {
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < M; y++) {
        if (tomatoes[d][x][y] === 1) queue.push([d, x, y])
        else if (tomatoes[d][x][y] === 0) freshTomatoes++
      }
    }
  }

  while (queue.length) {
    const [d, x, y] = queue.pop() as number[]

    for (let i = 0; i < 6; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]
      const dd = d + dz[i]

      if (xx < 0 || yy < 0 || dd < 0 || xx > N - 1 || yy > M - 1 || dd > H - 1) continue
      if (tomatoes[dd][xx][yy] === 0 && !visited[dd][xx][yy]) {
        stack.push([dd, xx, yy])
        answers[dd][xx][yy] = answers[d][x][y] + 1
        freshTomatoes--
      }
      visited[dd][xx][yy] = true
    }

    if (!queue.length && stack.length) {
      while (stack.length) queue.push(stack.pop() as number[])
      cnt++
    }
  }

  return freshTomatoes ? -1 : cnt
}

console.log(solution())
