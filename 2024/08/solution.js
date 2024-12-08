const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map((r) => r.split(""));

const antennas = {};
const h = input.length;
const w = input[0].length;

for (let r = 0; r < input.length; r++) {
  for (let c = 0; c < input[0].length; c++) {
    const a = input[r][c];
    if (a === ".") {
      continue;
    }
    const antenna = antennas[a] || [];
    antenna.push([r, c]);
    antennas[a] = antenna;
  }
}

const antinodes = new Map();
const antinodes2 = new Map();

const getAntinodes = (a1, a2, a) => {
  const rd = a2[0] - a1[0];
  const cd = a2[1] - a1[1];
  const an1 = [a1[0] - rd, a1[1] - cd];
  const an2 = [a2[0] + rd, a2[1] + cd];
  const res = [];
  if (
    an1[0] >= 0 &&
    an1[1] >= 0 &&
    an1[0] < h &&
    an1[1] < w &&
    input[an1[0]][an1[1]] !== a
  ) {
    res.push(an1);
  }
  if (
    an2[0] >= 0 &&
    an2[1] >= 0 &&
    an2[0] < h &&
    an2[1] < w &&
    input[an2[0]][an2[1]] !== a
  ) {
    res.push(an2);
  }
  return res;
};

const getAntinodes2 = (a1, a2, a) => {
  const rd = a2[0] - a1[0];
  const cd = a2[1] - a1[1];
  const res = [];
  let c = 0;
  while (true) {
    const an1 = [a1[0] - rd * c, a1[1] - cd * c];
    c++;
    if (an1[0] >= 0 && an1[1] >= 0 && an1[0] < h && an1[1] < w) {
      res.push(an1);
    }
    if (an1[0] < 0 || an1[1] < 0 || an1[0] >= h || an1[1] >= w) {
      break;
    }
  }
  c = 0;
  while (true) {
    const an2 = [a2[0] + rd * c, a2[1] + cd * c];
    c++;
    if (an2[0] >= 0 && an2[1] >= 0 && an2[0] < h && an2[1] < w) {
      res.push(an2);
    }
    if (an2[0] < 0 || an2[1] < 0 || an2[0] >= h || an2[1] >= w) {
      break;
    }
  }
  return res;
};

for (const [key, a] of Object.entries(antennas)) {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (i === j) {
        continue;
      }
      const ans = getAntinodes(a[i], a[j], key);
      ans.forEach((a) => {
        antinodes.set(`${a[0]}|${a[1]}`);
      });
      const ans2 = getAntinodes2(a[i], a[j], key);
      ans2.forEach((a) => {
        antinodes2.set(`${a[0]}|${a[1]}`);
      });
    }
  }
}
console.log("step1", antinodes.size);
console.log("step2", antinodes2.size);
