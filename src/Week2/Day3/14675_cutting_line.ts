import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs
  .readFileSync(`${PWD}/src/Week2/Day3/14675_cutting_line.txt`)
  .toString()
  .trim()
  .split('\n') as string[]

const N = Number(input.shift())
let Q = 0

const edges: number[][] = []
const queries: number[][] = []
const tree: number[][] = Array.from({ length: N + 1 }).map(() => [])

let mode = 'tree'

input.forEach((str) => {
  const item = str.split(' ')

  if (item.length === 1) {
    mode = 'query'
    Q = Number(str)
  } else if (mode === 'tree') {
    const [a, b] = item.map(Number)
    edges.push([a, b])
    tree[a].push(b)
    tree[b].push(a)
  } else {
    queries.push(item.map(Number))
  }
})

const checkCuttingNode = (node: number) => {
  if (tree[node].length === 1) return 'no'
  return 'yes'
}

const checkCuttingEdge = (node1: number, node2: number) => {
  const answer1 = checkCuttingNode(node1)
  const answer2 = checkCuttingNode(node2)

  console.log('answer1', answer1)
  console.log('answer2', answer2)
  if (answer1 === 'no' && answer2 === 'no') return 'no'

  return 'yes'
}

const answer: string[] = []
queries.forEach((query, index) => {
  const [type, target] = query

  if (type === 1) answer.push(checkCuttingNode(target))
  else if (type === 2) {
    answer.push(checkCuttingEdge(edges[target - 1][0], edges[target - 1][1]))
  }
})

console.log(answer.join('\n'))
