import { Queue } from '../../Common/queue'
import { PWD } from '../../pwd'

const fs = require('fs')

const [T, ...input] = fs
  .readFileSync(`${PWD}/src/Week3/Day5/7562_movement_of_nights.txt`)
  .toString()
  .trim()
  .split('\n')

const horseX = [-2, -1, 1, 2, -2, -1, 1, 2]
const horseY = [-1, -2, -2, -1, 1, 2, 2, 1]

const counts: number[] = []

for (let t = 0; t < Number(T); t++) {
  const start = t * 3

  const N = Number(input[start])
  console.log(N)

  const visited = Array.from({ length: N }).map(() => Array.from({ length: N }).map(() => false))

  const [sX, sY] = input[start + 1].split(' ').map(Number)
  const [dX, dY] = input[start + 2].split(' ').map(Number)

  const queue = new Queue()
  queue.push([sX, sY, 0])

  let cnt = 0

  while (queue.length) {
    const [x, y, count] = queue.pop() as number[]

    if (x === dX && y === dY) {
      cnt = count
      break
    }

    for (let i = 0; i < 8; i++) {
      const xx = x + horseX[i]
      const yy = y + horseY[i]

      if (xx < 0 || yy < 0 || xx > N - 1 || yy > N - 1) continue
      if (visited[xx][yy]) continue

      visited[xx][yy] = true

      queue.push([xx, yy, count + 1])
    }
  }

  counts.push(cnt)
}

console.log(counts.join('\n'))
