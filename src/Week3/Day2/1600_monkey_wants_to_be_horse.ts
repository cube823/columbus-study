import { PWD } from '../../pwd'

// K 번만큼 체스의 말 동작을 할 수 있다.
// 기본으로 상하좌우를 움직일 수 있다.
// (0,0) 에서 (H-1, W-1) 로 도달해야 한다.
// 불가능하면 -1을, 가능하면 최소 수를 리턴한다.

// 1 <= W, H <= 200
// 0 <= K <= 30

// 상하좌우만을 이용해 (0,0) 에서 (H-1, W-1) 도달하는 케이스를 만든후
// 말의 동작 K 번을 추가

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
const [K, lengths, ...input] = fs
  .readFileSync(`${PWD}/src/Week3/Day2/1600_monkey_wants_to_be_horse2.txt`)
  .toString()
  .trim()
  .split('\n')

const horseCount = Number(K)
const [W, H] = lengths.split(' ').map(Number) as number[]
const grid = input.map((str: string) => str.split(' ').map(Number)) as number[][]

const visited = Array.from({ length: horseCount + 1 }).map(() =>
  grid.map((list) => list.map(() => false))
)

const dx = [1, -1, 0, 0]
const dy = [0, 0, 1, -1]

const horseX = [-2, -1, 1, 2, -2, -1, 1, 2]
const horseY = [-1, -2, -2, -1, 1, 2, 2, 1]

// 한 번의 동작에 dx or dy or horseX + horseY 만큼 가능
// 예) dx -> horse -> dy
// horse -> dx -> dy
// K번을 소진허지 않았을 경우 0 <= d < 12
// K번을 소진했을 경우 0 <= d < 4

const queue = new Queue()
queue.push([0, 0, 0, 0])
visited[0][0][0] = true

const solution = () => {
  while (queue.length) {
    const [x, y, k, cnt] = queue.pop() as number[]

    if (x === H - 1 && y === W - 1) return cnt

    for (let i = 0; i < 4; i++) {
      const xx = x + dx[i]
      const yy = y + dy[i]

      if (xx < 0 || yy < 0 || xx > H - 1 || yy > W - 1) continue
      if (grid[xx][yy] === 1 || visited[k][xx][yy]) continue

      visited[k][xx][yy] = true
      queue.push([xx, yy, k, cnt + 1])
    }

    if (k >= horseCount) continue

    for (let i = 0; i < 8; i++) {
      const xx = x + horseX[i]
      const yy = y + horseY[i]

      if (xx < 0 || yy < 0 || xx > H - 1 || yy > W - 1) continue
      if (grid[xx][yy] === 1 || visited[k + 1][xx][yy]) continue

      visited[k + 1][xx][yy] = true
      queue.push([xx, yy, k + 1, cnt + 1])
    }
  }

  return -1
}

console.time()
console.log(solution())
console.timeEnd()
