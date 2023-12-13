const fs = require("fs");
const patterns = fs
  .readFileSync("day13.txt", { encoding: "utf-8" })
  .split("\n\n")
  .map((p) => p.split("\n").map((l) => l.split("")));

const transpose = (matrix) => {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
};

const stringDiff = (a, b) => {
  return a.split("").reduce((p, v, i) => {
    return p + (v === b[i] ? 0 : 1);
  }, 0);
};

const arrayDiff = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return Infinity;
  }
  const diffs = [];
  for (let i = 0; i < a.length; i++) {
    diffs.push(stringDiff(a[i], b[i]));
  }
  return diffs.reduce((p, v) => p + v, 0);
};

const ref = (lines, smudge = 0) => {
  for (let i = 1; i < lines.length; i++) {
    const size = i < lines.length / 2 ? i : lines.length - i;
    const left = lines.slice(i - size, i).reverse();
    const right = lines.slice(i, i + size);
    if (arrayDiff(left, right) === smudge) {
      return i;
    }
  }
  return 0;
};

const reflections = (pattern, smudge = 0) => {
  const rows = pattern.map((a) => a.join(""));
  const columns = transpose(pattern).map((a) => a.join(""));
  const reflections = [ref(rows, smudge), ref(columns, smudge)];
  return reflections;
};

const score1 = patterns
  .map((pattern) => reflections(pattern))
  .reduce((p, v) => p + v[0] * 100 + v[1], 0);
console.log("Day 13a", score1);

const score2 = patterns
  .map((pattern) => reflections(pattern, 1))
  .reduce((p, v) => p + v[0] * 100 + v[1], 0);
console.log("Day 13b", score2);
