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

const beam = (pos, direction) => {
  const x =
    direction === ">" ? pos[0] + 1 : direction === "<" ? pos[0] - 1 : pos[0];
  const y =
    direction === "v" ? pos[1] + 1 : direction === "^" ? pos[1] - 1 : pos[1];

  console.log(`${direction} from [${pos}] to [${x},${y}]`);
  question("");

  // Beam stops if out of range or cell was travelled all 4 directions.
  if (x < 0 || y < 0 || x >= w || y >= h) {
    console.log("Reach corner, beam ends");
    return;
  }

  if (input[y][x].d.has(direction)) {
    console.log(input[y][x]);
    console.log("Been here, beam ends");
    return;
  }

  input[y][x].d.set(direction, 1);
  input[y][x].e++;
  console.log(input[y][x]);

  switch (input[y][x].t) {
    case "|":
      if ([">", "<"].includes(direction)) {
        console.log("Split ^v");
        beam([x, y], "^");
        beam([x, y], "v");
      } else {
        beam([x, y], direction);
      }
      break;

    case "-":
      if (["v", "^"].includes(direction)) {
        console.log("Split <>");
        beam([x, y], "<");
        beam([x, y], ">");
      } else {
        beam([x, y], direction);
      }
      break;

    case "\\":
    case "/":
      console.log("Meet", input[y][x].t, "reflect");
      beam([x, y], rules[input[y][x].t][direction]);
      break;

    case ".":
    default:
      beam([x, y], direction);
      break;
  }
};

beam([-1, 0], ">");
//console.log(input);
input.map((line) => {
  console.log(line.map((e) => e.d.size).join(""));
});
const score1 = input
  .map((line) => line.reduce((p, v) => p + (v.e > 0 ? 1 : 0), 0))
  .reduce((p, v) => p + v, 0);
console.log(score1);
