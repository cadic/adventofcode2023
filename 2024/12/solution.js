const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "example.txt"), {
  encoding: "utf-8",
});

input = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`;

let fence = input.split("\n").map((l) => l.split(""));

const seen = new Map();
const regions = [];
const d = {
  n: [-1, 0],
  e: [0, 1],
  s: [1, 0],
  w: [0, -1],
};
const h = fence.length;
const w = fence[0].length;

const getAncestors = (r, c) => {
  const coord = `${r}|${c}`;
  const plant = fence[r][c];
  if (seen.get(coord)) {
    return [];
  }
  seen.set(coord, plant);
  const plots = [];
  let edges = [];
  for (let k of Object.keys(d)) {
    const nr = r + d[k][0],
      nc = c + d[k][1];
    if (0 <= nr && nr < h && 0 <= nc && nc < w && fence[nr][nc] === plant) {
      plots.push(...getAncestors(nr, nc));
    } else {
      edges.push(k);
    }
  }
  plots.push({ r, c, edges });
  return plots;
};

for (let r = 0; r < fence.length; r++) {
  for (let c = 0; c < fence[0].length; c++) {
    const region = getAncestors(r, c);
    if (region.length) {
      regions.push(region);
    }
  }
}

const getCost = (region) => {
  const area = region.length;
  const edges = new Map();
  region.forEach((plot) => {
    plot.edges.forEach((e) => {
      if (e === "n" || e === "s") {
        ec = e + plot.r;
      } else {
        ec = e + plot.c;
      }
      if (!edges.get(ec)) {
        edges.set(ec, true);
      }
    });
  });
  const perimeter = region.reduce((p, v) => p + v.edges.length, 0);
  return { step1: area * perimeter, step2: area * edges.size };
};

const step1 = regions.reduce((p, region) => p + getCost(region).step1, 0);
const step2 = regions.reduce((p, region) => p + getCost(region).step2, 0);
console.log("step1", step1);
console.log("step2", step2);
