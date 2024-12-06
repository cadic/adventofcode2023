const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map((r) => r.split(""));

let map = JSON.parse(JSON.stringify(input));

const moves = {
    "^": [0, -1],
    ">": [1, 0],
    V: [0, 1],
    "<": [-1, 0],
  },
  nextMove = {
    "^": ">",
    ">": "V",
    V: "<",
    "<": "^",
  },
  p = "X",
  o = "#",
  startG = "^",
  w = map[0].length,
  h = map.length;

const drawMap = (map) => {
  console.log(map.map((r) => r.join("")).join("\n"));
};

const findGuard = (map) => {
  for (let i = 0; i < map.length; i++) {
    const ix = map[i].indexOf("^");
    if (ix > -1) {
      return { x: ix, y: i };
    }
  }
};

const makeMove = () => {
  if (history) {
    const newRecord = `${x}|${y}|${g}`;
    if (history.includes(newRecord)) {
      return "loop";
    } else {
      history.push(newRecord);
    }
  }

  map[y][x] = p;

  let move = moves[g];
  let nX = x + move[0],
    nY = y + move[1];

  if (nX < 0 || nY < 0 || nX === w || nY === h) {
    // Move outside
    return "out";
  }

  // Check obsticle
  if (map[nY][nX] === o) {
    // change direction
    g = nextMove[g];
    move = moves[g];
    nX = x + move[0];
    nY = y + move[1];
  }

  x = nX;
  y = nY;
  map[y][x] = g;

  return "success";
};

const { x: startX, y: startY } = findGuard(map);

let x = startX,
  y = startY;
let g = startG;
let history = false;

let exit = "success";
history = [];
while ("success" === exit) {
  exit = makeMove();
  drawMap(map);
  console.log("---");
}

const step1 = map.reduce((p, v) => {
  return p + v.filter((e) => e === "X").length;
}, 0);

console.log(step1);

let bigOs = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    // clear history
    history = [];

    // Initialize new map
    x = startX;
    y = startY;
    g = startG;
    map = JSON.parse(JSON.stringify(input));

    if (map[j][i] === o) {
      // skip if already an obsticle
      continue;
    }
    if (map[j][i] === g) {
      // Guard position
      continue;
    }

    map[j][i] = o;
    exit = "success";
    while ("success" === exit) {
      exit = makeMove();
    }
    if ("loop" === exit) {
      bigOs++;
    }
  }
}

console.log(bigOs);
