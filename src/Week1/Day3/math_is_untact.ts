// 백준 19532

import { PWD } from '../../pwd'

const fs = require('fs')
const input = fs
  .readFileSync(`${PWD}/src/Week1/Day3/math_is_untact.txt`)
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const [a, b, c, d, e, f] = input

/**
 * ax + by = c
 * dx + ey = f
 *
 * x = (ce - bf) / (ae - bd)
 * y = (af - cd) / (ae - bd)
 */

const solution = () => {
  if (a * e - b * d === 0) {
    for (let x = -999; x <= 999; x++) {
      for (let y = -999; y <= 999; y++) {
        if (a * x + b * y === c && d * x + e * y === f) {
          console.log(x, y)
          return
        }
      }
    }
  } else {
    const x = (c * e - b * f) / (a * e - b * d)
    const y = (a * f - c * d) / (a * e - b * d)

    console.log(x, y)
  }
}

solution()
