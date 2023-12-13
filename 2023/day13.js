const fs = require("fs");
const patterns = fs
  .readFileSync("day13.txt", { encoding: "utf-8" })
  .split("\n\n")
  .map((p) => p.split("\n").map((l) => l.split("")));

const transpose = (matrix) => {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
};

const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

const getReflection = (lines) => {
  console.log(lines);
  for (let i = 1; i < lines.length; i++) {
    const size = i < lines.length / 2 ? i : lines.length - i;
    const left = lines.slice(i - size, i).reverse();
    const right = lines.slice(i, i + size);
    if (arrayEquals(left, right)) {
      return i;
    }
  }
  return 0;
};

const reflections = (pattern) => {
  const rows = pattern.map((a) => a.join(""));
  const columns = transpose(pattern).map((a) => a.join(""));
  const reflections = [getReflection(rows), getReflection(columns)];
  return reflections;
};

const score1 = patterns
  .map((pattern) => reflections(pattern))
  .reduce((p, v) => p + v[0] * 100 + v[1], 0);
console.log("Day 13a", score1);