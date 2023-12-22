const { question } = require("readline-sync");
const fs = require("fs");
const input = fs
  .readFileSync("day16.txt", { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split("").map((e) => ({ t: e, e: 0, d: new Map() })));

const w = input[0].length;
const h = input.length;

const rules = {
  "/": {
    ">": "^",
    "^": ">",
    v: "<",
    "<": "v",
  },
  "\\": {
    ">": "v",
    "^": "<",
    v: ">",
    "<": "^",
  },
};

const init = () => {
  for (let i = 0; i < input.length; i++) {
    for (let ii = 0; ii < input[0].length; ii++) {
      input[i][ii].e = 0;
      input[i][ii].d = new Map();
    }
  }
};

const beam = (pos, direction) => {
  const x =
    direction === ">" ? pos[0] + 1 : direction === "<" ? pos[0] - 1 : pos[0];
  const y =
    direction === "v" ? pos[1] + 1 : direction === "^" ? pos[1] - 1 : pos[1];

  // Beam stops if out of range or cell was travelled all 4 directions.
  if (x < 0 || y < 0 || x >= w || y >= h) {
    return;
  }

  if (input[y][x].d.has(direction)) {
    return;
  }

  input[y][x].d.set(direction, 1);
  input[y][x].e++;

  switch (input[y][x].t) {
    case "|":
      if ([">", "<"].includes(direction)) {
        beam([x, y], "^");
        beam([x, y], "v");
      } else {
        beam([x, y], direction);
      }
      break;

    case "-":
      if (["v", "^"].includes(direction)) {
        beam([x, y], "<");
        beam([x, y], ">");
      } else {
        beam([x, y], direction);
      }
      break;

    case "\\":
    case "/":
      beam([x, y], rules[input[y][x].t][direction]);
      break;

    case ".":
    default:
      beam([x, y], direction);
      break;
  }
};

beam([-1, 0], ">");

const score = (a) =>
  a
    .map((line) => line.reduce((p, v) => p + (v.e > 0 ? 1 : 0), 0))
    .reduce((p, v) => p + v, 0);
const score1 = score(input);
console.log("Part A", score1);

const energy = [];
for (let i = 0; i < input.length; i++) {
  init();
  beam([-1, i], ">");
  energy.push(score(input));
  init();
  beam([input.length, i], "<");
  energy.push(score(input));
  init();
  beam([i, -1], "v");
  energy.push(score(input));
  init();
  beam([i, input.length], "^");
  energy.push(score(input));
}
console.log(Math.max(...energy));
