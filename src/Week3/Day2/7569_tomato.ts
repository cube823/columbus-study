import { PWD } from '../../pwd'

const fs = require('fs').readFileSync(`${PWD}/src/Week3/Day2/7569_tomato2.txt`)
const input = fs
  .toString()
  .trim()
  .split('\n')
  .map((str: string) => str.split(' '))

const queue = [] as number[][]
const stack = [] as number[][]

const [M, N, H] = input.shift().map(Number) as number[]

const dx = [1, -1, 0, 0, N, -N]
const dy = [0, 0, 1, -1, 0, 0]

const tomatoes: number[][] = input.map((s: string[]) => s.map((el) => Number(el)))

// 3차원 문제
// MxN grid 가 H 개 반복되는 2차원 그리드로 푸는게 단순할 것으로 예상
// H 개가 없는 tomato 문제를 풀었던 적이 있다.
// 이때랑 마찬가지로 (아마도) answers map 을 활용하는 방식을 택하면 될 것 같다.
// bfs + answersMap

// 1인 좌표를 담은 배열을 만든다.
// 해당 배열을 queue에 넣어 하루씩 익도록 만든다.
// 배열 내 0이 존재하지 않으면 가장 큰 수를, 0이 존재하면 -1을 리턴한다.

const visited = Array.from({ length: N * H }).map(() => Array.from({ length: M }).map(() => false))

const solution = () => {
  let cnt = 0

  for (let x = 0; x < N * H; x++) {
    for (let y = 0; y < M; y++) {
      if (tomatoes[x][y] === 1) queue.push([x, y])
    }
  }

  while (queue.length) {
    const [x, y] = queue.pop() as number[]

    for (let i = 0; i < 6; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx < 0 || yy < 0 || xx > N * H - 1 || yy > M - 1) continue
      if (tomatoes[xx][yy] === 0 && !visited[xx][yy]) stack.push([xx, yy])
      visited[xx][yy] = true
    }

    if (!queue.length && stack.length) {
      while (stack.length) queue.push(stack.pop() as number[])
      cnt++
    }
  }

  for (let i = 0; i < N * H; i++) {
    for (let j = 0; j < M; j++) {
      if (visited[i][j] === false) return -1
    }
  }

  return cnt
}

console.log(solution())
