const fs = require("fs");

const elves = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n\n")
  .map((elf) => elf.split("\n").map((i) => parseInt(i)));

const weights = elves.map((elf) => elf.reduce((p, i) => p + i, 0));
weights.sort((a,b) => b-a);
console.log(weights);
const max = Math.max(...weights);
console.log(max)
console.log(weights[0] +weights[1] +weights[2])