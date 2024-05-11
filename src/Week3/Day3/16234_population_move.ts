import { PWD } from '../../pwd'

const fs = require('fs')
const [info, ...input] = fs
  .readFileSync(`${PWD}/src/Week3/Day3/16234_population_move.txt`)
  .toString()
  .trim()
  .split('\n')

const [N, L, R] = info.split(' ')
const grid = input.map((str: string) => str.split(' ').map(Number))

// 인접한 칸 (상하좌우) 의 인구가 L <= x <= R 이면 dfs를 반복한다.
// 더이상 반복하지 않는 덩어리가 되었을 때. 인구수는 전체를 더하여 나눈 것만큼 변경한다.
// 이를 더이상 일어나지 않을 떄까지 반복하여 반복한 횟수를 리턴한다.

// stack 에 dfs를 추가한다. 해당 dfs 가 비워질때까지 반복한다.
// 하루가 지나면 visited 를 초기화한다.

// 시간 제한 2 x 10^8
// 메모리 제한 2^9

const dx = [1, -1, 0, 0]
const dy = [0, 0, 1, -1]

const solution = () => {
  const stack = []

  let days = 0
  let flag = true
  while (flag) {
    const visited = Array.from({ length: N }).map(() => Array.from({ length: N }).map(() => false))
    flag = false

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        if (visited[x][y]) continue
        visited[x][y] = true
        let coords = [] as number[][]
        let sum = grid[x][y]

        stack.push([x, y])
        coords.push([x, y])

        while (stack.length) {
          const [x, y] = stack.pop() as number[]

          for (let i = 0; i < 4; i++) {
            const xx = x + dx[i]
            const yy = y + dy[i]

            if (xx < 0 || yy < 0 || xx > N - 1 || yy > N - 1) continue
            if (visited[xx][yy]) continue

            const populationGap = Math.abs(grid[x][y] - grid[xx][yy])

            if (L <= populationGap && R >= populationGap) {
              flag = true
              visited[xx][yy] = true
              coords.push([xx, yy])
              sum += grid[xx][yy]
              stack.push([xx, yy])
            }
          }
        }

        coords.forEach(([x, y]) => {
          grid[x][y] = Math.floor(sum / coords.length)
        })
      }
    }

    if (flag) days += 1
  }

  return days
}
console.time()
console.log(solution())
console.timeEnd()
