# 3주차 - bfs, dfs

## bfs, dfs 구현

### bfs

```ts
const graph = Array.from({ length: N }).map(() =>
  Array.from({ length: M }).map(() => Math.ceil(Math.Random() * 100))
)

const visited = Array.from({ length: N }).map(() => Array.from({ length: M }).map(() => false))

const dx = [1, -1, 0, 0]
const dy = [1, -1, 0, 0]

const solution = () => {
  const queue = []

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (visited[x][y]) continue
      visited[x][y] = true

      while (queue.length) {
        const [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
          const xx = x + dx[i]
          const yy = y + dy[i]

          if (xx < 0 || yy < 0 || xx > N - 1 || yy > M - 1) continue
          visited[xx][yy] = true
          queue.push([xx, yy])
        }
      }
    }
  }
}
```

### dfs

```ts
const graph = Array.from({ length: N }).map(() =>
  Array.from({ length: M }).map(() => Math.ceil(Math.Random() * 100))
)

const visited = Array.from({ length: N }).map(() => Array.from({ length: M }).map(() => false))

const dx = [1, -1, 0, 0]
const dy = [1, -1, 0, 0]

const dfs = ([x, y]: number[]) => {
  for (let i = 0; i < 4; i++) {
    const xx = x + dx[i]
    const yy = y + dy[i]

    if (xx < 0 || yy < 0 || xx > N - 1 || yy > M - 1) continue
    visited[xx][yy] = true
    dfs(xx, yy)
  }
}

const solution = () => {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (visited[x][y]) continue
      visited[x][y] = true
      dfs(x, y)
    }
  }
}
```
