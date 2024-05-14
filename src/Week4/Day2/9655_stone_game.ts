import { PWD } from '../../pwd'

const fs = require('fs')

const N = Number(fs.readFileSync(`${PWD}/src/Week4/Day2/9655_stone_game.txt`).toString().trim())

console.log(N % 2 === 0 ? 'CY' : 'SK')
