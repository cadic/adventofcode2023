const fs = require("fs");

const input = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .map((r) => r.split(","))
  .map((r) => r.map((c) => c.split("-").map((a) => parseInt(a))));

const isFullOverlap = (r1, r2) =>
  (r1[0] <= r2[0] && r1[1] >= r2[1]) || (r2[0] <= r1[0] && r2[1] >= r1[1]);

const fullOverlaps = input.filter((i) => isFullOverlap(i[0], i[1]));
const score1 = fullOverlaps.length;
console.log(score1);

const isOverlap = (r1, r2) =>
  (r2[0] <= r1[0] && r1[0] <= r2[1]) || (r1[0] <= r2[0] && r2[0] <= r1[1]);

const overlaps = input.filter((i) => isOverlap(i[0], i[1]));
const score2 = overlaps.length;
console.log(score2);
