const fs = require("fs");
const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const rucksacks = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .map((r) => [r.slice(0, r.length / 2), r.slice(r.length / 2)]);

const items = rucksacks.map((ru) => {
  const l = ru[0].split("");
  const r = ru[1].split("");
  const item = l.reduce((p, v) => p + (r.includes(v) ? v : ""), "");
  return item[0];
});

console.log(items.join(""));
const priorities = items.map((i) => priority.split("").indexOf(i) + 1);
const score1 = priorities.reduce((p, v) => p + v, 0);
console.log(score1);

const detect = (r1, r2, r3) => {
  const i1 = r1.reduce((p, v) => p + (r2.includes(v) ? v : ""), "").split("");
  const i2 = i1.reduce((p, v) => p + (r3.includes(v) ? v : ""), "").split("");
  return i2[0];
};

const part2items = [];

for (let i = 0; i < rucksacks.length / 3; i++) {
  const r1 = rucksacks[i * 3].join("").split("");
  const r2 = rucksacks[i * 3 + 1].join("").split("");
  const r3 = rucksacks[i * 3 + 2].join("").split("");
  part2items.push(detect(r1, r2, r3));
}
const p2 = part2items.map((i) => priority.split("").indexOf(i) + 1);
const s2 = p2.reduce((p, v) => p + v, 0);
console.log(s2);