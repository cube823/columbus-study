import { PWD } from '../../pwd'

class Node {
  item: number[]
  next: Node | null
  constructor(item: number[]) {
    this.item = item
    this.next = null
  }
}

class Queue {
  head: Node | null
  tail: Node | null
  length: number
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(item: number[]) {
    const node = new Node(item)
    if (this.head == null) {
      this.head = node
    } else {
      if (this.tail) this.tail.next = node
    }

    this.tail = node
    this.length += 1
  }

  pop() {
    const popItem = this.head
    if (this.head) this.head = this.head.next
    this.length -= 1
    return popItem?.item
  }
}

const fs = require('fs')
const [info, ...input] = fs
  .readFileSync(`${PWD}/src/Week3/Day3/2206_break_the_wall.txt`)
  .toString()
  .trim()
  .split('\n')

const [N, M] = info.split(' ').map(Number) as number[]
const grid = input.map((str: string) => str.split('').map(Number)) as number[][]

const answerMap = Array.from({ length: N }).map(() => Array.from({ length: M }).map(() => [0, 0]))

const dx = [1, -1, 0, 0]
const dy = [0, 0, 1, -1]

const solution = () => {
  const queue = new Queue()
  queue.push([0, 0, 0, 1, -1]) // x, y, flag, cnt

  if (N === 1 && M === 1) return 1

  while (queue.length) {
    const [x, y, flag] = queue.pop() as number[]

    if (x === N - 1 && y === M - 1) return answerMap[x][y][flag]

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx < 0 || yy < 0 || xx > N - 1 || yy > M - 1) continue
      if (answerMap[xx][yy][flag]) continue
      if (flag && grid[xx][yy] === 1) continue

      if (xx === N - 1 && yy === M - 1) {
        answerMap[xx][yy][flag] = answerMap[x][y][flag] + 1
        return answerMap[xx][yy][flag] + 1
      }

      if (grid[xx][yy] === 1 && !flag) {
        answerMap[xx][yy][flag + 1] = answerMap[x][y][flag] + 1
        queue.push([xx, yy, flag + 1])
      } else {
        answerMap[xx][yy][flag] = answerMap[x][y][flag] + 1
        queue.push([xx, yy, flag])
      }
    }
  }

  return answerMap[N - 1][M - 1][0] || answerMap[N - 1][M - 1][1] || -1
}

console.log(solution())
