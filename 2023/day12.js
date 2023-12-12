const fs = require("fs");
const rows = fs
  .readFileSync("day12.txt", { encoding: "utf-8" })
  .split("\n")
  .map((l) => {
    const [s, scheme] = l.split(" ");
    const springs = s.replaceAll(".", "0").replaceAll("#", "1");
    return {
      springs: springs,
      scheme: scheme.split(",").map((a) => parseInt(a)),
    };
  });

const pad = (num, size) => {
  num = num.toString(2);
  while (num.length < size) num = "0" + num;
  return num;
};

const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

const schemeValid = (line, scheme) => {
  const springs = line
    .split("0")
    .filter((a) => a !== "")
    .map((a) => a.length);
  return arrayEquals(springs, scheme);
};

const generateSprings = (line) => {
  const unknown = [...line.matchAll(/\?/g)].map((a) => a.index);
  const springs = [];
  for (let i = 0; i <= Math.pow(2, unknown.length) - 1; i++) {
    const combination = pad(i, unknown.length);
    const spring = line.split("");
    for (let k = 0; k < unknown.length; k++) {
      spring[unknown[k]] = combination[k];
    }
    springs.push(spring.join(""));
  }
  return springs;
};

const score1 = rows
  .map(
    (row) =>
      generateSprings(row.springs)
        .map((s) => schemeValid(s, row.scheme))
        .filter((a) => a === true).length
  )
  .reduce((p, v) => p + v, 0);

console.log("Day 12a", score1);
