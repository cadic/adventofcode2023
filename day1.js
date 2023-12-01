const fs = require("fs");

function caliber(number) {
  const p = parseInt(Math.log10(number));
  const left = parseInt(number / Math.pow(10, p));
  const right = number % 10;
  return `${left}${right}`;
}

const lines = fs.readFileSync("day1.txt", { encoding: "utf-8" }).split("\n");
const numbers = lines.map((line) => parseInt(line.replace(/[^\d]/g, "")));
const calibrations = numbers.map((number) => caliber(number));
const result = calibrations.reduce((a, b) => a + parseInt(b), 0);

console.log(result);
