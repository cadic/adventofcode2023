const fs = require("fs");
const input = fs.readFileSync("day15.txt", { encoding: "utf-8" }).split(",");

const hash = (line) => {
  return line
    .split("")
    .reduce((p, char) => ((p + char.charCodeAt(0)) * 17) % 256, 0);
};

const score1 = input.reduce((p, v) => p + hash(v), 0);
console.log(score1);
