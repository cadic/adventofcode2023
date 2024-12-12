const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "example.txt"), {
    encoding: "utf-8",
  })
  .split("\n")
  .map((r) => r.split("").map((e) => parseInt(e)));

const trails = [];

for (let c = 0; c < input.length; c++) {
  for (let r = 0; r < input[0].length; r++) {
    if (input[r][c] === 0) {
      trails.push([r, c, 0]);
    }
  }
}

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const stepFrom = (r, c) => {
  const current = input[r][c];
  if (current === 9) {
    return 9;
  }
  for (let d in dirs) {
    const dr = d[0];
	const dc = d[1];
  }
};

const trailScore = (trail) => {};

console.log(trails);
