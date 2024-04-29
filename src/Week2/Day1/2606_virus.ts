import { PWD } from '../../pwd'

/**
 * 신종 바이러스인 웜 바이러스는 네트워크를 통해 전파된다.
 * 한 컴퓨터가 웜 바이러스에 걸리면
 * 그 컴퓨터와 네트워크 상에서 연결되어 있는 모든 컴퓨터는 웜 바이러스에 걸리게 된다.
 *
 * 예를 들어 7대의 컴퓨터가 <그림 1>과 같이 네트워크 상에서 연결되어 있다고 하자.
 * 1번 컴퓨터가 웜 바이러스에 걸리면 웜 바이러스는
 * 2번과 5번 컴퓨터를 거쳐 3번과 6번 컴퓨터까지 전파되어
 * 2, 3, 5, 6 네 대의 컴퓨터는 웜 바이러스에 걸리게 된다.
 *
 * 하지만 4번과 7번 컴퓨터는 1번 컴퓨터와 네트워크상에서 연결되어 있지 않기 때문에 영향을 받지 않는다.
 *
 * 어느 날 1번 컴퓨터가 웜 바이러스에 걸렸다.
 * 컴퓨터의 수와 네트워크 상에서 서로 연결되어 있는 정보가 주어질 때,
 * 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 출력하는 프로그램을 작성하시오.
 */

/**
 * Input
 * 0 < C <= 100
 */

const fs = require('fs')

const [C, L, ...input] = fs
  .readFileSync(`${PWD}/src/Week2/Day1/2606_virus.txt`)
  .toString()
  .trim()
  .split('\n')

const hashMap: Record<number, number[]> = {}
const visited = Array(C).fill(false)

for (const item of input) {
  const [node1, node2] = item.split(' ').map(Number) as number[]
  if (hashMap[node1]) {
    hashMap[node1].push(node2)
  } else {
    hashMap[node1] = [node2]
  }

  if (hashMap[node2]) {
    hashMap[node2].push(node1)
  } else {
    hashMap[node2] = [node1]
  }
}

const infect = (node: number) => {
  if (!hashMap[node]) {
    visited[node] = true
    return
  }
  if (visited[node]) return

  visited[node] = true

  for (let i = 0; i < hashMap[node].length; i++) {
    infect(hashMap[node][i])
  }
}

infect(1)

console.log(visited.filter((item) => item).length - 1)
