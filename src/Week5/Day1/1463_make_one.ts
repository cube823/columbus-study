import { PWD } from "../../pwd";
const fs = require("fs");

const input = fs
  .readFileSync(`${PWD}/src/Week5/Day1/1463_make_one.txt`)
  .toString()
  .trim();

const N = Number(input);

const dp = Array(N + 1).fill(0);

for (let i = 2; i <= N; i++) {
  dp[i] = dp[i - 1] + 1;
  if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
}

console.log(dp[N]);
