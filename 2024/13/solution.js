const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const games = input.split("\n\n").map((g) => {
  const m = g.match(
    /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X\=(\d+), Y\=(\d+)/
  );
  return {
    a: [parseInt(m[1]), parseInt(m[2])],
    b: [parseInt(m[3]), parseInt(m[4])],
    x: [10000000000000 + parseInt(m[5]), 10000000000000 + parseInt(m[6])],
  };
});

const play = (game) => {
  const ax = game.a[0],
    ay = game.a[1],
    bx = game.b[0],
    by = game.b[1],
    rx = game.x[0],
    ry = game.x[1];

  /**
   * System:
   * ax * a + bx * b = rx
   * ay * a + by * b = ry
   */

  const divider = by - (ay * bx) / ax;
  if (divider === 0) {
    return 0;
  }

  // Round hack to fix JS floating point collisions :(
  const b = Math.round(((ry - (ay * rx) / ax) / divider) * 1000) / 1000;
  const a = Math.round(((rx - bx * b) / ax) * 1000) / 1000;

  console.log(game, a, b);
  if (a > 0 && b > 0 && Math.floor(a) === a && Math.floor(b) === b) {
    return a * 3 + b;
  }
  return 0;
};

const results = games.map((g) => play(g));
const step2 = results.reduce((p, v) => p + v, 0);
console.log("step 2", step2);
