import { PWD } from '../../pwd'

const fs = require('fs')
const [N, ...input] = fs
  .readFileSync(`${PWD}/src/Week3/Day4/1991_tree_traversal.txt`)
  .toString()
  .trim()
  .split('\n')

const grid = input.map((str: string) => str.split(' ')) as string[][]

interface Node {
  L: string
  R: string
}

const hashMap: Record<string, Node> = {}

grid.forEach(([root, left, right]) => {
  hashMap[root] = { L: left !== '.' ? left : '', R: right !== '.' ? right : '' }
})

const preOrder = () => {
  const visited: Record<string, boolean> = {}
  const answer = []

  // A부터 시작
  // 왼쪽부터 탐색하면서 왼쪽을 모두 탐색했을 경우 오른쪽 탐색 시작
  // 루트 -> 왼쪽 -> 오른쪽

  const queue = ['A']

  while (queue.length) {
    const node = queue.pop() as string

    if (visited[node]) continue
    visited[node] = true
    answer.push(node)
    if (hashMap[node].R) queue.push(hashMap[node].R)
    if (hashMap[node].L) queue.push(hashMap[node].L)
  }

  return answer.join('')
}

const inOrder = () => {
  const visited: Record<string, boolean> = {}
  const answer: string[] = []

  // A부터 시작
  // 왼쪽부터 탐색하면서 왼쪽을 모두 탐색했을 경우 오른쪽 탐색 시작
  // 왼쪽 -> 루트 -> 오른쪽 순

  const dfs = (node: string) => {
    if (!hashMap[node].L || visited[hashMap[node].L]) {
      answer.push(node)
      if (hashMap[node].R) dfs(hashMap[node].R)
      return
    }

    visited[node] = true

    dfs(hashMap[node].L)
    answer.push(node)
    if (hashMap[node].R) dfs(hashMap[node].R)
  }

  dfs('A')

  return answer.join('')
}

const postOrder = () => {
  const visited: Record<string, boolean> = {}
  const answer: string[] = []

  // A부터 시작
  // 왼쪽부터 탐색하면서 왼쪽을 모두 탐색했을 경우 오른쪽 탐색 시작
  // 왼쪽 -> 오른쪽 -> 루트 순

  const dfs = (node: string) => {
    if (!hashMap[node].L || visited[hashMap[node].L]) {
      if (hashMap[node].R) dfs(hashMap[node].R)
      answer.push(node)
      return
    }

    visited[node] = true

    dfs(hashMap[node].L)
    if (hashMap[node].R) dfs(hashMap[node].R)
    answer.push(node)
  }

  dfs('A')

  return answer.join('')
}

console.log(preOrder())
console.log(inOrder())
console.log(postOrder())
