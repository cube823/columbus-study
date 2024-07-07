import { PWD } from "../../pwd";

const fs = require("fs");

const [N, ...commands] = fs
  .readFileSync(`${PWD}/src/Week5/Day1/10828_stack.txt`)
  .toString()
  .trim()
  .split("\n");

const arr: number[] = [];
const answers: number[] = [];
const commandMap: Record<string, Function> = {
  push: (num: number) => arr.push(num),
  pop: () =>
    arr.length === 0 ? answers.push(-1) : answers.push(arr.pop() as number),
  empty: () => (arr.length === 0 ? answers.push(1) : answers.push(0)),
  size: () => answers.push(arr.length),
  top: () =>
    arr.length === 0 ? answers.push(-1) : answers.push(arr[arr.length - 1]),
};

for (let i = 0; i < Number(N); i++) {
  const [command, num] = commands[i].split(" ");
  if (num) commandMap[command](+num);
  else commandMap[command]();
}

console.log(answers.join("\n"));
