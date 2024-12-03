const fs = require("fs");
const input = fs
  .readFileSync("day17e.txt", { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split("").map((a) => parseInt(a)));

const nextMoves = {
  "0,1": ["1,0", "-1,0"],
  "0,-1": ["1,0", "-1,0"],
  "1,0": ["0,1", "0,-1"],
  "-1,0": ["0,1", "0,-1"],
};

let min = Infinity;

let c = 0;
for (let i = 0; i < input.length; i++) {
  c += input[i][i];
  if (input[i][i + 1]) {
    c += input[i][i + 1];
  }
}
min = c;

const paths = new Map();
while (true) {
	
}
