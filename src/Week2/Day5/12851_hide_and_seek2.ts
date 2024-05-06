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
const MAX = K + 2
const visited = Array.from({ length: MAX }).map(() => 0)
const counts = Array.from({ length: MAX }).map(() => 0)

const solution = () => {
  console.time()

  const queue = [N]
  counts[N] = 1

  if (N >= K) {
    visited[K] = N - K
    counts[K] = 1
    return
  }

  while (queue.length) {
    const currentTime = queue.shift() as number

    if (N >= K) return { minCnt: N - K, count: 1 }

    if (currentTime < 0) continue
    if (currentTime > MAX - 1) continue

    for (let i = 0; i < 3; i++) {
      const xx = i === 2 ? currentTime * dx[i] : currentTime + dx[i]
      if (xx > MAX - 1) continue
      if (xx < 0) continue
      if (!visited[xx]) {
        queue.push(xx)
        visited[xx] = visited[currentTime] + 1
        counts[xx] += counts[currentTime]
      } else if (visited[xx] === visited[currentTime] + 1) {
        counts[xx] += counts[currentTime]
      }
    }
  }
}

solution()
console.timeEnd()
console.log(visited[K])
console.log(counts[K])
