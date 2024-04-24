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
  let x = -999
  let y = -999

  while (x < 1000) {
    while (y < 1000) {
      if (a * x + b * y === c && d * x + e * y === f) {
        console.log(x, y)
        break
      }
      y++
    }
    x++
    y = -999
  }
}

solution()
