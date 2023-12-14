const fs = require("fs");
let rocks = fs
  .readFileSync("day14e.txt", { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split(""));

const transpose = (matrix) =>
  matrix[0].map((_, i) => matrix.map((row) => row[i]));

const rotate = (matrix) =>
  matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());

const rotate2 = (matrix) =>
  matrix[0].map((_, index) => matrix.map((row) => row[row.length - 1 - index]));

const tilt = (line) => {
  let tilt = true;
  while (tilt) {
    let tilted = 0;
    for (let i = 1; i < line.length; i++) {
      if (line[i] === "O" && line[i - 1] === ".") {
        line[i - 1] = "O";
        line[i] = ".";
        tilted++;
      }
    }
    if (tilted === 0) {
      tilt = false;
    }
  }
  return line;
};

const tilted = transpose(rocks).map((line) => tilt(line));
const result = transpose(tilted);
const score1 = result.reduce(
  (p, v, i) => p + v.filter((a) => a === "O").length * (result.length - i),
  0
);
console.log("Part 1", score1);
