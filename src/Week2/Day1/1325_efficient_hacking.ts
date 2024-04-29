/**
 * 해커 김지민은 잘 알려진 어느 회사를 해킹하려고 한다. 
 * 이 회사는 N개의 컴퓨터로 이루어져 있다. 
 * 김지민은 귀찮기 때문에, 한 번의 해킹으로 여러 개의 컴퓨터를 해킹 할 수 있는 컴퓨터를 해킹하려고 한다.
 * 
 * 이 회사의 컴퓨터는 신뢰하는 관계와, 신뢰하지 않는 관계로 이루어져 있는데, 
 * A가 B를 신뢰하는 경우에는 B를 해킹하면, A도 해킹할 수 있다는 소리다.

이 회사의 컴퓨터의 신뢰하는 관계가 주어졌을 때, 
한 번에 가장 많은 컴퓨터를 해킹할 수 있는 컴퓨터의 번호를 출력하는 프로그램을 작성하시오.
 */

import { PWD } from '../../pwd'

/**
 * Input
 * 0 < N <= 10^4
 * 0 <= M <= 10^5
 */

const fs = require('fs')
const input = fs
  .readFileSync(`${PWD}/src/Week2/Day1/1325_efficient_hacking.txt`)
  .toString()
  .trim()
  .split('\n')

const [N, M] = input[0].split(' ').map(Number) as number[]
const graph = Array.from({ length: N + 1 }, () => []) as number[][]
let cnt = 0

for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].split(' ').map(Number)
  graph[B].push(A)
}

const dfs = (_node: number) => {
  const visited = Array(N + 1).fill(false)

  const hack = (node: number) => {
    if (visited[node]) return

    visited[node] = true
    const nodes = graph[node]
    if (!nodes) return

    for (const value of nodes.values()) {
      console.log('value', value)
      cnt++
      hack(value)
    }
  }

  hack(_node)

  return visited.filter((visit) => visit).length
}

let max = 0
const arr: number[] = [0]

for (let i = 1; i <= N; i++) {
  if (!graph[i].length) continue
  const visited = dfs(i)
  arr.push(visited)

  if (visited > max) {
    max = visited
  }
}

const result: number[] = []
for (let i = 1; i <= N; i++) {
  if (arr[i] === max) {
    result.push(i)
  }
}

console.log(cnt)
console.log(result.join(' '))
