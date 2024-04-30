import { PWD } from '../../pwd'

const fs = require('fs')
const [info, ...input] = fs
  .readFileSync(
    process.platform === 'linux' ? '/dev/stdin' : `${PWD}/src/Week2/Day1/1325_efficient_hacking.txt`
  )
  .toString()
  .trim()
  .split('\n')
  .map((item: string) => item.split(' ').map((value) => +value))

const [N, M] = info as number[]

const solution = () => {
  const graph = Array.from({ length: N + 1 }, () => []) as number[][]

  for (let i = 0; i < M; i++) {
    const [A, B] = input[i] as number[]
    graph[B].push(A)
  }

  let max = 0
  let arr: number[] = []

  const dfs = (n: number) => {
    const visited = Array(N + 1).fill(false)
    let count = 1
    const stack = [n]

    visited[n] = true

    while (stack.length) {
      const value = stack.pop() as number
      for (let i = 0; i < graph[value].length; i++) {
        if (!visited[graph[value][i]]) {
          count++
          stack.push(graph[value][i])
        }
      }
    }

    if (max > count) return
    else if (max === count) arr.push(n)
    else {
      max = count
      arr = [n]
    }
  }

  for (let i = 1; i <= N; i++) {
    dfs(i)
  }

  console.log(arr.join(' '))
}

solution()
