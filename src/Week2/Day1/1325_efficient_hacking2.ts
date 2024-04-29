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

const solution = () => {
  // 컴퓨터의 신뢰하는 관계가 주어졌을 때, 그 관계 정보를 나타내는 2차원 배열 ( 인접리스트 )
  const graph = Array.from({ length: N + 1 }, () => []) as number[][]

  for (let i = 0; i < M; i++) {
    const [a, b] = input[i].split(' ').map(Number) as number[]

    // a가 b를 신뢰하므로 b가 해킹되면 a도 해킹된다. ( = b가 탐색되면 a도 탐색되어야 한다. )
    graph[b].push(a)
  }

  let max = 0 // 최대 해킹 컴퓨터 수
  let answer: number[] = []

  const DFS = (n: number) => {
    // check: 해킹 여부를 나타내는 배열
    let check = Array.from({ length: N + 1 }, () => 0)
    let count = 1 // 해킹된 컴퓨터 수
    let stack = [n] // DFS 탐색 스택

    check[n] = 1

    // DFS를 탐색하면서 check배열의 값이 0인 노드에 한해서 count를 증가시키면서 stack에 push ( DFS 탐색 )
    while (stack.length) {
      const value = stack.pop() as number
      for (let i = 0; i < graph[value].length; i++) {
        if (!check[graph[value][i]]) {
          count += 1
          check[graph[value][i]] = 1
          stack.push(graph[value][i])
        }
      }
    }

    if (max > count) return
    else if (max === count) answer.push(n)
    else {
      max = count
      answer = [n]
    }
  }

  for (let i = 1; i <= N; i++) {
    DFS(i)
  }

  return answer.join(' ')
}

console.log(solution())
