import { PWD } from '../../pwd'

const fs = require('fs')
const [constants, ...input] = fs
  .readFileSync(`${PWD}/src/Week2/Day2/1260_dfs_and_bfs.txt`)
  .toString()
  .trim()
  .split('\n')
  .map((str: string) => str.split(' ').map(Number)) as number[][]

const [N, M, V] = constants

const graph = Array.from({ length: N + 1 }).map(() => []) as number[][]

input.forEach((edge) => {
  const [v1, v2] = edge
  graph[v1].push(v2)
  graph[v2].push(v1)

  graph[v1].sort((a, b) => a - b)
  graph[v2].sort((a, b) => a - b)
})

const solution1 = () => {
  const stack: number[] = []
  const answer: number[] = [V]
  const visited = Array.from({ length: N + 1 }).map(() => false)

  const dfs = (node: number) => {
    if (visited[node]) return

    stack.push(node)
    visited[node] = true

    while (stack.length) {
      const node = stack.pop() as number

      for (let i = 0; i < graph[node].length; i++) {
        if (visited[graph[node][i]]) continue
        answer.push(graph[node][i])
        dfs(graph[node][i])
      }
    }
  }

  dfs(V)
  console.log(answer.join(' '))
}

const solution2 = () => {
  const queue: number[] = [V]
  const answer: number[] = [V]
  const visited = Array.from({ length: N + 1 }).map(() => false)

  const bfs = () => {
    while (queue.length) {
      const node = queue.shift() as number

      visited[node] = true

      for (let i = 0; i < graph[node].length; i++) {
        if (visited[graph[node][i]]) continue

        visited[graph[node][i]] = true

        answer.push(graph[node][i])
        queue.push(graph[node][i])
      }
    }
  }

  bfs()
  console.log(answer.join(' '))
}

solution1()
solution2()
