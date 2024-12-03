const fs = require("fs");
const garden = fs
  .readFileSync("day21e.txt", { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split(""));

const start = garden.reduce(
  (p, line, i) => (line.indexOf("S") !== -1 ? [i, line.indexOf("S")] : p),
  [0, 0]
);

