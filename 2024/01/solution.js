const fs = require("fs");

const l = fs.readFileSync("input.txt", { encoding: "utf-8" }).split("\n");

const l1 = [],
  l2 = [];

l.forEach((i) => {
  const parts = i.split("   ");
  l1.push(parts[0]);
  l2.push(parts[1]);
});

l1.sort();
l2.sort();

let dist = 0;
let similarity = 0;

for (let i = 0; i < l1.length; i++) {
  const diff = Math.abs(l2[i] - l1[i]);
  dist += diff;
  const count = l2.filter((e) => e === l1[i]).length;
  similarity += l1[i] * count;
}

console.log(dist, similarity);
