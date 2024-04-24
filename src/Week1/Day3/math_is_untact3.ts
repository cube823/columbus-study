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
 * -999 <= a, b, c, d, e, f <= 999
 * ax + by = c
 * dx + ey = f
 *
 * x = (ce - bf) / (ae - bd)
 * y = (af - cd) / (ae - bd)
 */

const solution = () => {
  for (let x = -999; x <= 999; x++) {
    for (let y = -999; y <= 999; y++) {
      if (a * x + b * y === c && d * x + e * y === f) {
        console.log(x, y)
        return
      }
    }
  }
}

solution()
