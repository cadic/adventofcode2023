const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "example.txt"), {
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

  return 0;
};

const results = games.map((g) => play(g));
const step1 = results.reduce((p, v) => p + v, 0);
console.log("step 1", step1);
