const fs = require("fs");

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const getOperations = (string) => {
  return string.match(/mul\((\d+),(\d+)\)/g);
};
const operations = getOperations(input);

const calculate = (operations) => {
  return operations.reduce((prev, o) => {
    const [m, a, b] = o.match(/mul\((\d+),(\d+)\)/);
    return prev + parseInt(a) * parseInt(b);
  }, 0);
};
const result1 = calculate(operations);

const groups = [];
let mode = true;
let search = "don't()";
let prev = 0;

while (true) {
  const pos = input.indexOf(search, prev);
  if (-1 === pos) {
    break;
  }
  if (mode) {
    groups.push(input.substring(prev, pos));
    mode = false;
    search = "do()";
  } else {
    mode = true;
    search = "don't()";
  }
  prev = pos;
}

const groupOps = groups
  .map(getOperations)
  .map(calculate)
  .reduce((p, v) => p + v, 0);

console.log("Step 1", result1);
console.log("Step 2", groupOps);