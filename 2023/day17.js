const fs = require("fs");
const input = fs
  .readFileSync("day17e.txt", { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split(""));

console.log(input);
