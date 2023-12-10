const fs = require("fs");
const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const rucksacks = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .map((r) => [r.slice(0, r.length / 2), r.slice(r.length / 2)]);

const items = rucksacks.map((ru) => {
  const l = ru[0].split("");
  const r = ru[1].split("");
  const item = l.reduce((p, i) => (p + r.includes(i) ? i : ""), "");
  return item;
});

const priorities = items.map((i) => priority.split("").indexOf(i) + 1);
const score1 = priorities.reduce((p, v) => p + v, 0);
console.log(score1);
