import { Queue } from '../../Common/queue'
import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs
  .readFileSync(`${PWD}/src/Week3/Day4/16954_escape_from_moving_maze.txt`)
  .toString()
  .trim()
  .split('\n')
  .map((str: string) => str.split('')) as string[][]

// 8 x 8 grid
// (8, 1) -> (1, 8) 도달 가능 여부
// dx, dy 는 상하좌우 + 대각선
// 말 이동 후 전체 벽이 (x+1, y) 만큼 움직인다.
// (currentX, currentY) === (wallX, wallY) 가 되는 순간 return 0
// grid 내에 wall 이 없어지는 순간 return 1
// (currentX, currentY) === (1, 8) 이 되는 순간 return 1

// 1. Queue class 를 복붙해온다.
// 2. 가능한 좌표 + 이동횟수를 queue 에 담고 이동한다.
// 3. 다시 queue를 돌 때 모든 wall coord 의 x값을 +1 해준다.
// 4. 모든 wall coord의 x 값이 8 이상이면 1을 return 한다.

const queue = new Queue()
queue.push([7, 0, 0])

const dx = [1, -1, 0, 0, 1, 1, -1, -1, 0]
const dy = [0, 0, 1, -1, 1, -1, 1, -1, 0]

const walls = Array.from({ length: 8 }).map((_, k) =>
  input.map((list, x) => list.map((item, y) => item))
)

const findWall = (cnt: number) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (walls[cnt][i][j] === '#') return true
    }
  }

  return false
}

const solution = () => {
  while (queue.length) {
    const [x, y, cnt] = queue.pop() as number[]

    if (!findWall(cnt)) return 1

    const temp = new Queue()

    for (let i = 0; i < 9; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx < 0 || yy < 0 || xx > 7 || yy > 7) continue
      if (walls[cnt][xx][yy] === '#') continue

      temp.push([xx, yy])
    }

    const newCnt = cnt + 1

    if (newCnt > 7) return 1

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i === 0) walls[newCnt][0][j] = '.'
        walls[newCnt][i][j] = walls[cnt][i - 1][j]
      }
    }

    while (temp.length) {
      const [xx, yy] = temp.pop() as number[]
      if (walls[newCnt][xx][yy] === '#') continue

      if (xx === 0 && yy === 7) return 1
      queue.push([xx, yy, newCnt])
    }
  }

  return 0
}

console.log(solution())
