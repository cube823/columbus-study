import { Queue } from '../../Common/queue'
import { PWD } from '../../pwd'

const fs = require('fs')
const [info, ...input] = fs
  .readFileSync(`${PWD}/src/Week3/Day3/2206_break_the_wall.txt`)
  .toString()
  .trim()
  .split('\n')

const [N, M] = info.split(' ').map(Number) as number[]
const grid = input.map((str: string) => str.split('').map(Number)) as number[][]

const visited = Array.from({ length: N }).map(() => Array.from({ length: M }).map(() => false))

const dx = [1, -1, 0, 0]
const dy = [0, 0, 1, -1]

const solution = () => {
  const queue = new Queue()
  queue.push([0, 0, 0, 1]) // x, y, flag, cnt

  while (queue.length) {
    const [x, y, flag, cnt] = queue.pop() as number[]

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx < 0 || yy < 0 || xx > N - 1 || yy > M - 1) continue
      if (visited[xx][yy]) continue
      if (flag && grid[xx][yy] === 1) continue

      visited[xx][yy] = true

      if (xx === N - 1 && yy === M - 1) {
        return cnt + 1
      }

      if (grid[xx][yy] === 1) {
        queue.push([xx, yy, flag + 1, cnt + 1])
      } else {
        queue.push([xx, yy, flag, cnt + 1])
      }
    }
  }

  return -1
}

console.log(solution())
