import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs.readFileSync(`${PWD}/src/Week2/Day3/11725_tree.txt`).toString().trim().split('\n')

const N = Number(input.shift())
const edges = input.map((str: string) => str.split(' ').map(Number))

const hashMap: Record<number, number[]> = {}

const bfs = (node1: number, node2: number) => {
  if (hashMap[node1]) hashMap[node1].push(node2)
  else hashMap[node1] = [node2]

  if (hashMap[node2]) hashMap[node2].push(node1)
  else hashMap[node2] = [node1]
}

// 2 <= N <= 10^5
const solution = () => {
  for (let i = 0; i < edges.length; i++) {
    const [v1, v2] = edges[i] as number[]
    bfs(v1, v2)
  }

  const answer: number[] = []
  for (let i = 2; i <= N; i++) {
    if (hashMap[i]) answer.push(hashMap[i][0])
    else answer.push(1)
  }

  return answer.join('\n')
}

console.log(solution())
