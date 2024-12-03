const fs = require("fs");
const input = fs
  .readFileSync("day18.txt", { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split(" "));

const field = {};
const coords = [0, 0];

input.forEach((v) => {
  const [dir, dist, _] = v;
  const inc = [0, 0];
  inc[0] = dir === "R" ? 1 : dir === "L" ? -1 : 0;
  inc[1] = dir === "U" ? -1 : dir === "D" ? 1 : 0;
  for (let i = 0; i < dist; i++) {
    if (!field[coords[1]]) {
      field[coords[1]] = {};
    }
    field[coords[1]][coords[0]] = "#";
    coords[0] += inc[0];
    coords[1] += inc[1];
  }
});

const [minY, maxY] = Object.keys(field).reduce(
  (p, v) => {
    const i = parseInt(v);
    const min = i < p[0] ? i : p[0];
    const max = i > p[1] ? i : p[1];
    return [min, max];
  },
  [Infinity, -Infinity]
);
const [minX, maxX] = Object.values(field).reduce(
  (p, r) =>
    Object.keys(r).reduce((p, v) => {
      const i = parseInt(v);
      const min = i < p[0] ? i : p[0];
      const max = i > p[1] ? i : p[1];
      return [min, max];
    }, p),
  [Infinity, -Infinity]
);

const finalField = [];

for (let i = minY; i <= maxY; i++) {
  const row = [];
  for (let ii = minX; ii <= maxX; ii++) {
    row.push(field[i][ii] ? field[i][ii] : ".");
  }
  finalField.push(row);
}

const paint = () => {
  // search for first point.
  let toPaint = [];
  for (let i = 1; i < finalField[1].length; i++) {
    if (finalField[1][i - 1] === "#" && finalField[1][i] === ".") {
      toPaint.push([1, i]);
      break;
    }
  }
  while (toPaint.length > 0) {
    const [x, y] = toPaint.pop();
    if (finalField[x][y] === ".") {
      finalField[x][y] = "#";
      if (finalField[x - 1][y] && finalField[x - 1][y] === ".") {
        toPaint.push([x - 1, y]);
      }
      if (finalField[x + 1][y] && finalField[x + 1][y] === ".") {
        toPaint.push([x + 1, y]);
      }
      if (finalField[x][y - 1] && finalField[x][y - 1] === ".") {
        toPaint.push([x, y - 1]);
      }
      if (finalField[x][y + 1] && finalField[x][y + 1] === ".") {
        toPaint.push([x, y + 1]);
      }
    }
  }
};

paint();

const score1 = finalField.reduce(
  (p, row) => p + row.reduce((r, v) => r + (v === "#" ? 1 : 0), 0),
  0
);
console.log(score1);
