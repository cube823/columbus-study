import { PWD } from '../../pwd'

const fs = require('fs')
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : `${PWD}/src/Week2/Day1/1325_efficient_hacking.txt`
const [info, ...input] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((item: string) => item.split(' ').map((value) => +value))

const [N, M] = info

const solution = () => {
  const graph = Array.from({ length: N + 1 }, () => []) as number[][]

  for (let i = 0; i < M; i++) {
    const [a, b] = input[i]

    graph[b].push(a)
  }

  let max = 0 // 최대 해킹 컴퓨터 수
  let answer: number[] = []

  const DFS = (n: number) => {
    // check: 해킹 여부를 나타내는 배열
    const visited = Array(N + 1).fill(false)
    let count = 1 // 해킹된 컴퓨터 수
    let stack = [n] // DFS 탐색 스택

    visited[n] = true

    while (stack.length) {
      const value = stack.pop() as number
      for (let i = 0; i < graph[value].length; i++) {
        if (!visited[graph[value][i]]) {
          count += 1

          visited[graph[value][i]] = true
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
