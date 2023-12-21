const fs = require("fs");
const lines = fs.readFileSync("day5.txt").split("\n");

const vowels = ["a", "e", "i", "o", "u"];
const forbidden = ["ab", "cd", "pq", "xy"];

const isNice = (line) => {
  const chars = line.split("");
  const vowelsCount = chars.filter((c) => vowels.includes(c)).length;
  const hasDouble = chars.some((c, i) => c === chars[i + 1]);
  const hasForbidden = forbidden.some((f) => line.includes(f));
  return vowelsCount >= 3 && hasDouble && !hasForbidden;
};

const getNbles = (chars, n) => {
  const nbles = [];
  for (let i = 0; i <= chars.length - n; i++) {
    nbles.push(chars.slice(i, i + n).join(""));
  }
  return nbles;
};

const isNice2 = (line) => {
  const chars = line.split("");
  const doubles = getNbles(chars, 2);
  const triples = getNbles(chars, 3);
  const hasPair = doubles.some((p, i) => doubles.indexOf(p, i + 2) > 0);
  const hasRepeat = triples.some((p) => p[0] === p[2]);
  return hasPair && hasRepeat;
};

const niceLines = lines.filter((line) => isNice(line));
console.log(niceLines.length);

const veryNiceLines = lines.filter((line) => isNice2(line));
console.log(veryNiceLines.length);
