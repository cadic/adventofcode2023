const fs = require("fs");
const universe = fs
  .readFileSync("day11e.txt", { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split(""));

const printUniverse = (universe) => {
  universe.forEach((row) => {
    console.log(row.join(""));
  });
};

const distance = (g1, g2) => {
  return (
    Math.abs(galaxies[g1][0] - galaxies[g2][0]) +
    Math.abs(galaxies[g1][1] - galaxies[g2][1])
  );
};

const distance2 = (g1, g2) => {
  let distance = 0;
  const [x1, y1] = galaxies[g1];
  const [x2, y2] = galaxies[g2];
  console.log(`Galaxy ${g1}: ${x1},${y1}`);
  console.log(`Galaxy ${g2}: ${x2},${y2}`);
  for (let i = x1 + 1; i <= x2; i++) {
    const element = universe[x1][y1];
    console.log(`At ${i},${y1} - ${element}`);
    distance += element === "M" ? 10 : 1;
  }
  for (let i = y1 + 1; i <= y2; i++) {
    const element = universe[x1][i];
    console.log(`At ${x1},${i} - ${element}`);
    distance += element === "M" ? 10 : 1;
  }
  console.log(`Distance ${g1 + 1},${g2 + 1}: ${distance}`);
  return distance;
};

const emptyRows = universe.reduce((p, r, i) => {
  if (r.every((a) => a === ".")) {
    p.push(i);
  }
  return p;
}, []);

const transp = universe[0].map((_, colIndex) =>
  universe.map((row) => row[colIndex])
);
const emptyCols = transp.reduce((p, r, i) => {
  if (r.every((a) => a === ".")) {
    p.push(i);
  }
  return p;
}, []);

for (let i = emptyRows.length - 1; i >= 0; i--) {
  universe.splice(emptyRows[i], 0, new Array(universe[0].length).fill("M"));
}
for (let i = emptyCols.length - 1; i >= 0; i--) {
  for (let j = 0; j < universe.length; j++) {
    universe[j].splice(emptyCols[i], 0, "M");
  }
}

const galaxies = [];
for (let i = 0; i < universe.length; i++) {
  for (let j = 0; j < universe[i].length; j++) {
    const element = universe[i][j];
    if ("#" === element) {
      galaxies.push([i, j]);
    }
  }
}

const distances = {};
const distances2 = {};
for (let i = 0; i < galaxies.length; i++) {
  for (let j = 0; j < galaxies.length; j++) {
    if (j > i) {
      distances[`${i + 1},${j + 1}`] = distance(i, j);
      distances2[`${i + 1},${j + 1}`] = distance2(i, j);
    }
  }
}
printUniverse(universe);
const score1 = Object.values(distances).reduce((p, v) => p + v, 0);
console.log("Part 1", score1);

const score2 = Object.values(distances2).reduce((p, v) => p + v, 0);
console.log("Part 2", score2);
