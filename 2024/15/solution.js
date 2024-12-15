const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  })
  .split("\n\n");

input = `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^`.split("\n\n");

let field = input[0].split("\n").map((r) => r.split(""));
let moves = input[1].split("\n").join("").split("");

const directions = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

let rc, rr;
for (let r = 0; r < field.length; r++) {
  for (let c = 0; c < field[0].length; c++) {
    if (field[r][c] === "@") {
      rc = c;
      rr = r;
    }
  }
}

const move = (r, c, d) => {
  const [nr, nc] = [r + directions[d][0], c + directions[d][1]];
  const current = field[r][c];
  const next = field[nr][nc];
  if (next === "#") {
    return false;
  } else if (next === ".") {
    field[nr][nc] = current;
    field[r][c] = ".";
    return true;
  } else {
    if (move(nr, nc, d)) {
      field[nr][nc] = current;
      field[r][c] = ".";
      return true;
    }
  }
};

const printField = (f) => {
  console.log(f.map((r) => r.join("")).join("\n"));
  console.log("===");
};

const score1 = () => {
  let score = 0;
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[0].length; c++) {
      if ("O" === field[r][c]) {
        score += r * 100 + c;
      }
    }
  }
  return score;
};

moves.forEach((m) => {
  if (move(rr, rc, m)) {
    rr = rr + directions[m][0];
    rc = rc + directions[m][1];
  }
});

console.log("score 1", score1());

field = input[0].split("\n").map((r) => r.split(""));
let newField = [];

for (let r = 0; r < field.length; r++) {
  if (!newField[r]) {
    newField.push([]);
  }
  for (let c = 0; c < field[0].length; c++) {
    if (field[r][c] === "#") {
      newField[r].push("#", "#");
    } else if (field[r][c] === "O") {
      newField[r].push("[", "]");
    } else if (field[r][c] === ".") {
      newField[r].push(".", ".");
    } else if (field[r][c] === "@") {
      newField[r].push("@", ".");
    }
  }
}

field = newField;
for (let r = 0; r < field.length; r++) {
  for (let c = 0; c < field[0].length; c++) {
    if (field[r][c] === "@") {
      rc = c;
      rr = r;
    }
  }
}
const canMove = (r, c, d) => {
  const [nr, nc] = [r + directions[d][0], c + directions[d][1]];
  const current = field[r][c];
  const next = field[nr][nc];
  if (next === "#") {
    return false;
  }
  if (current === "@" && next === ".") {
    return true;
  }
  if (current === "[" && field[nr][nc] === "." && field[nr][nc + 1] === ".") {
    return true;
  }
  if (current === "]" && field[nr][nc] === "." && field[nr][nc - 1] === ".") {
    return true;
  }
  if ((current === "[" || current === "@") && next === "[") {
    return canMove(nr, nc, d) && canMove(nr, nc + 1, d);
  }
  if ((current === "]" || current === "@") && next === "]") {
    return canMove(nr, nc, d) && canMove(nr, nc - 1, d);
  }
  if (current === "[" && next === "]") {
    return (
      canMove(nr, nc - 1, d) &&
      canMove(nr, nc, d) &&
      canMove(nr, nc + 1, d) &&
      canMove(nr, nc + 2, d)
    );
  }
  if (current === "]" && next === "[") {
    return (
      canMove(nr, nc - 2, d) &&
      canMove(nr, nc - 1, d) &&
      canMove(nr, nc, d) &&
      canMove(nr, nc + 1, d)
    );
  }
};

const move2 = (r, c, d) => {
  if (["<", ">"].includes(d)) {
    return move(r, c, d);
  } else {
    if (canMove(r, c, d)) {
      const [nr, nc] = [r + directions[d][0], c + directions[d][1]];
      const current = field[r][c];
      const next = field[nr][nc];

      if (current === "@") {
        if (next === "[") {
          move2(nr, nc, d);
          move2(nr, nc + 1, d);
        } else if (next === "]") {
          move2(nr, nc, d);
          move2(nr, nc - 1, d);
        }
        field[nr][nc] = "@";
        field[r][c] = ".";
      }
      if (current === "[") {
        if (next === "[") {
          move2(nr, nc, d);
          move2(nr, nc + 1, d);
        } else if (next === "]") {
          move2(nr, nc - 1, d);
          move2(nr, nc, d);
          move2(nr, nc + 1, d);
          move2(nr, nc + 2, d);
        } else if (field[nr][nc + 1] === "[") {
          move2(nr, nc + 1, d);
          move2(nr, nc + 2, d);
        }
        field[nr][nc] = "[";
        field[nr][nc + 1] = "]";
        field[r][c] = ".";
        field[r][c + 1] = ".";
      }
      if (current === "]") {
        if (next === "]") {
          move2(nr, nc - 1, d);
          move2(nr, nc, d);
        } else if (next === "[") {
          move2(nr, nc - 1, d);
          move2(nr, nc, d);
          move2(nr, nc + 1, d);
          move2(nr, nc + 2, d);
        }
        field[nr][nc - 1] = "[";
        field[nr][nc] = "]";
        field[r][c - 1] = ".";
        field[r][c] = ".";
      }
    }
  }
};

printField(field);

moves.forEach((m) => {
  if (move(rr, rc, m)) {
    rr = rr + directions[m][0];
    rc = rc + directions[m][1];
  }
  printField(field);
});
