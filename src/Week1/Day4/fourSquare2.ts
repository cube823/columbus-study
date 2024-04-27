import { PWD } from '../../pwd'

// 백준 17626 Four Squares

// 시간 제한 0.5초 메모리 제한 512MB
// 입력 1 <= N <= 50,000
// 출력 4개의 제곱수의 합으로 표현되는 자연수의 최소 개수
// 18 = 16 + 1 + 1
// 18 = 9 + 9
// 0.5초 안에 풀어야 한다는 뜻은 10^7 이내 해결을 요구함
// 50,000 * 50,000 = 2,500,000,000
// 50,000 * 250 = 12,500,000
// 즉 O(NLogN) 이내로 풀어야 함

const fs = require('fs')
const input = Number(fs.readFileSync(`${PWD}/src/Week1/Day4/fourSquare.txt`).toString().trim())

const arrList = Array(input + 1).fill(0)

for (let i = 1; i <= input; i++) {
  arrList[i] = i

  for (let j = 1; j * j <= i; j++) {
    arrList[i] = Math.min(arrList[i], arrList[i - j * j] + 1)
  }
}

console.log(arrList[input])
