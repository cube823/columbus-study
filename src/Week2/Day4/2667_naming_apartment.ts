import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs
  .readFileSync(`${PWD}/src/Week2/Day4/2667_naming_apartment.txt`)
  .toString()
  .trim()
  .split('\n')

const N = Number(input.shift())

const grid = input.map((str: string) => str.split('').map(Number))

// 입력을 N 과 grid 로 분리한다.
// 0으로 둘러쌓여있는 1이 연속된 집합을 bfs 로 구현한다.
// 이 때 1은 0으로 바꿔주어 다시 방문할 일이 없도록 만든다.
// 더이상 상하좌우에 1이 없으면 count 를 리턴하고 다음 node를 순회하며 1로 시작된 군집을 찾는다.
// 모든 node를 순회하고 난 후에 count 가 담긴 배열을 sort 한 후 length 와 배열을 차례로 print 한다.

const dx = [-1, 1, 0, 0]
const dy = [0, 0, 1, -1]

const counts = [] as number[]

const bfs = (node: number[]) => {
  const stack = [node]
  let cnt = 0

  while (stack.length) {
    const [y, x] = stack.shift() as number[]
    cnt++

    for (let i = 0; i < 4; i++) {
      const yy = y + dy[i]
      const xx = x + dx[i]

      if (xx >= 0 && yy >= 0 && yy < N && xx < N && grid[yy][xx]) {
        grid[yy][xx] = 0
        stack.push([yy, xx])
      }
    }
  }

  return cnt
}

for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    if (grid[x][y]) {
      grid[x][y] = 0
      counts.push(bfs([x, y]))
    }
  }
}

console.log(counts.length)
counts.sort((a, b) => a - b).map((r) => console.log(r))
