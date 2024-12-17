const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "example.txt"), {
  encoding: "utf-8",
});

input = `AA`;

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

const inRange = (a, b) => {};
console.log(
  inRange(
    {
      d: "n",
      r: { s: 0, e: 0 },
      c: { s: 0, e: 0 },
    },
    {
      d: "n",
      r: { s: 0, e: 0 },
      c: { s: 0, e: 0 },
    }
  )
);
return;

const compressEdges = (edges) => {
  let newEdges = new Map(edges);
  let oldEdges = new Map();
  let compacted;
  while (true) {
    compacted = 0;
    oldEdges = new Map();
    for (let [i, e] of newEdges) {
    }
    console.log("Start over", oldEdges);
    newEdges = new Map();
    for (let [i, e1] of oldEdges) {
      for (let [j, e2] of oldEdges) {
        if (i === j) {
          continue;
        }
        console.log("Compare ", i, j);
        if (["n", "s"].includes(e1.d) && e1.d === e2.d) {
          console.log("Same on ", e1.d);
          if (Math.abs(e1.c.s - e2.c.e) === 1) {
            console.log("connected horizontally");
            // If diff between one's start and other's end is 1 -- they are connected
            const start = Math.min(e1.c.s, e2.c.s, e1.c.e, e2.c.e);
            const end = Math.max(e1.c.s, e2.c.s, e1.c.e, e2.c.e);
            const newEdge = {
              d: e1.d,
              r: e1.r,
              c: { s: start, e: end },
            };
            console.log("Replace with", newEdge);
            const idx = `${newEdge.d}:${newEdge.r.s}-${newEdge.r.e}:${newEdge.c.s}-${newEdge.c.e}`;
            newEdges.set(idx, newEdge);
            compacted++;
          } else {
            newEdges.set(i, e1);
            newEdges.set(j, e2);
          }
        } else if (["e", "w"].includes(e1.d) && e1.d === e2.d) {
          console.log("Same on ", e1.d);
          if (Math.abs(e1.r.s - e2.r.e) === 1) {
            console.log("connected vertically");
            // If diff between one's start and other's end is 1 -- they are connected
            const start = Math.min(e1.r.s, e2.r.s, e1.r.e, e2.r.e);
            const end = Math.max(e1.r.s, e2.r.s, e1.r.e, e2.r.e);
            const newEdge = {
              d: e1.d,
              r: { s: start, e: end },
              c: e1.c,
            };
            console.log("Replace with", newEdge);
            const idx = `${newEdge.d}:${newEdge.r.s}-${newEdge.r.e}:${newEdge.c.s}-${newEdge.c.e}`;
            newEdges.set(idx, newEdge);
            compacted++;
          } else {
            newEdges.set(i, e1);
            newEdges.set(j, e2);
          }
        } else {
          newEdges.set(i, e1);
          newEdges.set(j, e2);
        }
      }
    }
    console.log("End batch", newEdges);
    console.log("compacted", compacted);
    console.log("===");
    if (compacted === 0) {
      // Nothing more to improve
      break;
    }
  }
  return newEdges;
};

const getCost = (region) => {
  const area = region.length;
  const edges = new Map();
  region.forEach((plot) => {
    plot.edges.forEach((e) => {
      const idx = `${e}:${plot.r}-${plot.r}:${plot.c}-${plot.c}`;
      edges.set(idx, {
        d: e,
        r: { s: plot.r, e: plot.r },
        c: { s: plot.c, e: plot.c },
      });
    });
  });
  const realEdges = compressEdges(edges);
  const perimeter = region.reduce((p, v) => p + v.edges.length, 0);
  return { step1: area * perimeter, step2: area * edges.size };
};

const [s1, s2] = regions.reduce(
  (p, region) => {
    const { step1, step2 } = getCost(region);
    return [p[0] + step1, p[1] + step2];
  },
  [0, 0]
);
console.log("step1", s1);
console.log("step2", s2);
