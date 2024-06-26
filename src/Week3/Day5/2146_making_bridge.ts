import { Queue } from '../../Common/queue'
import { PWD } from '../../pwd'

const fs = require('fs')
const [N, ...input] = fs
  .readFileSync(`${PWD}/src/Week3/Day5/2146_making_bridge.txt`)
  .toString()
  .trim()
  .split('\n')

const LENGTH = Number(N)

const grid = input.map((str: string) => str.split(' ').map(Number)) as number[][]
const visited = Array.from({ length: LENGTH }).map(() =>
  Array.from({ length: LENGTH }).map(() => false)
)

let answer = 100 * 100

const dx = [1, -1, 0, 0]
const dy = [0, 0, 1, -1]

const groups = []
// 10^6
for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    if (visited[x][y] || grid[x][y] === 0) continue

    const queue = new Queue()
    const group = new Set<string>()
    queue.push([x, y])

    while (queue.length) {
      const [xx, yy] = queue.pop() as number[]

      for (let i = 0; i < 4; i++) {
        const nx = xx + dx[i]
        const ny = yy + dy[i]

        if (nx < 0 || ny < 0 || nx > N - 1 || ny > N - 1) continue
        if (visited[nx][ny]) continue

        if (grid[nx][ny] === 0) {
          group.add(`${xx}-${yy}`)
          continue
        }

        visited[nx][ny] = true

        queue.push([nx, ny])
      }
    }

    groups.push(group)
  }
}

const islands = [] as number[][][]

groups.forEach((group) => {
  const target: number[][] = []
  group.forEach((coordStr) => {
    const coord = coordStr.split('-').map(Number)
    target.push(coord)
  })
  islands.push(target)
})

const findRoad = (sx: number, sy: number, tx: number, ty: number) => {
  const tempVisited = Array.from({ length: LENGTH }).map(() =>
    Array.from({ length: LENGTH }).map(() => false)
  )
  const queue = new Queue()
  queue.push([sx, sy, 1])

  const mx = Math.min(sx, tx)
  const my = Math.min(sy, ty)

  const xLen = Math.abs(sx - tx)
  const yLen = Math.abs(sy - ty)

  while (queue.length) {
    const [x, y, cnt] = queue.pop() as number[]

    if (cnt >= answer) return 100 * 100

    if (x === tx && y === ty) {
      return cnt - 2
    }

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx < mx || yy < my || xx > xLen + mx || yy > yLen + my) continue
      if (tempVisited[xx][yy]) continue

      tempVisited[xx][yy] = true
      queue.push([xx, yy, cnt + 1])
    }
  }

  return 1
}

let currentLen = 100 * 100
let currentSX = 0
let currentSY = 0
let currentTX = 0
let currentTY = 0

for (let i = 0; i < islands.length - 1; i++) {
  const island = islands[i]

  for (let j = i + 1; j < islands.length; j++) {
    for (let ii = 0; ii < island.length; ii++) {
      const [sx, sy] = island[ii]

      const targetIslands = islands[j]

      for (let jj = 0; jj < targetIslands.length; jj++) {
        const [tx, ty] = targetIslands[jj]

        const len = Math.abs(sx - tx) + Math.abs(sy - ty)
        if (currentLen > len) {
          currentLen = len
          currentSX = sx
          currentSY = sy
          currentTX = tx
          currentTY = ty
        }
      }
    }
  }
}

const cnt = findRoad(currentSX, currentSY, currentTX, currentTY)

console.log(cnt)
