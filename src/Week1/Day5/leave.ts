// 백준 14501

import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs
  .readFileSync(`${PWD}/src/Week1/Day5/leave.txt`)
  .toString()
  .trim()
  .split('\n') as string[]

const N = Number(input.shift())

// nestedLoop 로 풀리는가?
// permutation 로직으로 풀리는가?

// 시간제한 2초
// 메모리제한 256MB

// 1 <= N <= 15
// 1 <= Ti <= 5, 1 <= Pi <= 10^3

// 시간제한이 2초이므로 순회 가능한 경우의 수는 10^9 이하이어야 한다.

const dp: number[] = Array(N + 1).fill(0)
const times = input.map((time) => Number(time.split(' ')[0]))
const profits = input.map((time) => Number(time.split(' ')[1]))

for (let i = 0; i <= N; i++) {
  for (let j = 0; j < i; j++) {
    dp[i] = Math.max(dp[i], dp[j])

    if (j + times[j] === i) {
      dp[i] = Math.max(dp[i], dp[j] + profits[j])
    }
  }
}

console.log(Math.max(...dp))
