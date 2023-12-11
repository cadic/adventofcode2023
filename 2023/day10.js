const input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

const maze = input
  .split("\n")
  .map((l) => l.split("").map((e) => ({ t: e, w: 0 })));

// const fs = require("fs");
// const maze = fs
//   .readFileSync("day10.txt", { encoding: "utf-8" })
//   .split("\n")
//   .map((l) => l.split("").map((e) => ({ t: e, w: 0 })));

const tiles = {
  S: ["t", "b", "l", "r"],
  "|": ["t", "b"],
  "-": ["r", "l"],
  F: ["r", "b"],
  L: ["t", "r"],
  J: ["t", "l"],
  7: ["l", "b"],
  ".": [],
};

const getConnections = (x, y) => {
  const tile = maze[x][y];
  const ways = tiles[tile.t];
  const connections = ways
    .map((w) => {
      switch (w) {
        case "t":
          return x !== 0 && tiles[maze[x - 1][y].t].includes("b")
            ? [x - 1, y]
            : false;
        case "b":
          return x !== maze.length - 1 && tiles[maze[x + 1][y].t].includes("t")
            ? [x + 1, y]
            : false;
        case "l":
          return y !== 0 && tiles[maze[x][y - 1].t].includes("r")
            ? [x, y - 1]
            : false;
        case "r":
          return y !== maze[x].length - 1 &&
            tiles[maze[x][y + 1].t].includes("l")
            ? [x, y + 1]
            : false;
      }
    })
    .filter((a) => a);
  return connections;
};

const start = [];
maze.forEach((v, i) => {
  const j = v.findIndex((a) => a.t === "S");
  if (j >= 0) {
    start[0] = i;
    start[1] = j;
  }
});

const scores = {};
scores[start.join()] = 0;

let i = 1;
const currents = getConnections(...start);
while (true) {
  scores[currents[0].join()] = i;
  scores[currents[1].join()] = i;
  const c1 = getConnections(...currents[0]).filter(
    (a) => !Object.keys(scores).includes(a.join())
  );
  const c2 = getConnections(...currents[1]).filter(
    (a) => !Object.keys(scores).includes(a.join())
  );
  if (c1.length === 0 && c2.length === 0) {
    break;
  }
  currents[0] = c1.pop();
  currents[1] = c2.pop();
  i++;
}
console.log("Score 1", i);
