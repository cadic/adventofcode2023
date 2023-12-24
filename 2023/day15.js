const fs = require("fs");
const input = fs.readFileSync("day15.txt", { encoding: "utf-8" }).split(",");

const hash = (line) => {
  return line
    .split("")
    .reduce((p, char) => ((p + char.charCodeAt(0)) * 17) % 256, 0);
};

const score1 = input.reduce((p, v) => p + hash(v), 0);
console.log(score1);

const boxes = Array.from({ length: 256 }, (e) => []);

input.forEach((line) => {
  if (-1 !== line.indexOf("=")) {
    const [label, focal] = line.split("=");
    const i = hash(label);
    console.log("Box", i);
    console.log("Insert", label, focal);
    const ri = boxes[i].findIndex((l) => l.label === label);
    if (-1 !== ri) {
      console.log("Exists at position", ri);
      boxes[i][ri] = { label: label, focal: focal };
    } else {
      console.log("Not Exists, adding");
      boxes[i].push({ label: label, focal: focal });
    }
  } else {
    const [label, _] = line.split("-");
    const i = hash(label);
    console.log("Box", i);
    console.log("Remove", label);
    const ri = boxes[i].findIndex((l) => l.label === label);
    if (-1 !== ri) {
      console.log("exists, remove");
      boxes[i].splice(ri, 1);
    }
  }
});

const score2 = boxes.reduce(
  (p, lenses, i) =>
    p + lenses.reduce((r, lens, j) => r + (i + 1) * lens.focal * (j + 1), 0),
  0
);

console.log(score2);
