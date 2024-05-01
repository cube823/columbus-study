import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs.readFileSync(`${PWD}/src/Week2/Day3/11725_tree.txt`).toString().trim().split('\n')

const N = Number(input.shift())
const edges = input.map((str: string) => str.split(' ').map(Number))

const hashMap: number[][] = Array.from({ length: N + 1 }).map(() => [])
const visited = Array.from({ length: N + 1 }).map(() => false)
const parent = Array.from({ length: N + 1 }).map(() => 0)

for (let i = 0; i < edges.length; i++) {
  const [v1, v2] = edges[i]

  hashMap[v1].push(v2)
  hashMap[v2].push(v1)
}

const dfs = (node: number) => {
  if (visited[node]) return
  visited[node] = true

  for (let i = 0; i < hashMap[node].length; i++) {
    const child = hashMap[node][i]
    if (visited[child]) continue

    parent[child] = node
    dfs(child)
  }
}

dfs(1)

console.log(parent.slice(2).join('\n'))
