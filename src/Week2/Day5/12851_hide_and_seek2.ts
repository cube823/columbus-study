import { PWD } from '../../pwd'

const fs = require('fs')
const [N, K] = fs
  .readFileSync(`${PWD}/src/Week2/Day5/12851_hide_and_seek2.txt`)
  .toString()
  .trim()
  .split(' ')
  .map(Number)

// N(0 <= N <= 10^5)
// K(0 <= K <= 10^5)

// X 위치에서 선택할 수 있는 경우의 수
// X + 1, X - 1, 2*X

// BFS 로 최단거리를 구하되
// 최단거리를 구할 수 있는 가짓수도 구해야 함

// K <= N 인 경우
// N - K, 1

// N < K 인 경우
// BFS + array

// break case
// X 가 0 이하일 때

const dx = [1, -1, 2]
const MAX = 2 * 10 ** 5

const solution = () => {
  const visited = Array.from({ length: MAX }).map(() => false)

  let minCnt = 10 ** 5
  let count = 10 ** 5

  let currentTime = N
  let currentCnt = 0

  const queue = [{ currentTime, currentCnt }]

  while (queue.length) {
    const { currentTime, currentCnt } = queue.pop() as { currentTime: number; currentCnt: number }

    if (currentTime === K) {
      console.log(currentTime, currentCnt)

      if (currentCnt < minCnt) {
        minCnt = currentCnt
        count = 1
      } else if (currentCnt === minCnt) {
        count += 1
      }

      continue
    }

    for (let i = 0; i < 3; i++) {
      const xx = i === 2 ? currentTime * dx[i] : currentTime + dx[i]
      if (visited[xx] || xx > visited.length - 1) continue
      visited[xx] = true

      if (currentCnt + 1 > minCnt) continue
      if (currentTime > K && xx > K) continue

      queue.push({ currentTime: xx, currentCnt: currentCnt + 1 })
    }
  }

  return { minCnt, count }
}

console.log(solution())
