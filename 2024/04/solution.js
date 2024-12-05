const fs = require("fs");

const input = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .map((r) => r.split(""));

const rotate90 = (matrix, factor) => {
  let oldMatrix = [];
  let newMatrix = JSON.parse(JSON.stringify(matrix));

  for (let k = 0; k < factor; k++) {
    oldMatrix = JSON.parse(JSON.stringify(newMatrix));
    newMatrix = [];
    const h = oldMatrix.length;
    const w = oldMatrix[0].length;
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (!newMatrix[j]) {
          newMatrix[j] = [];
        }
        newMatrix[j][i] = oldMatrix[h - i - 1][j];
      }
    }
  }
  return newMatrix;
};

const rotate45 = (matrix) => {
  const newMatrix = [];
  for (let i = 0; i < matrix.length * 2 - 1; i++) {
    const row = [];
    for (let j = 0; j < i + 1; j++) {
      if (matrix[i - j] && matrix[i - j][j]) {
        row.push(matrix[i - j][j]);
      }
    }
    newMatrix.push(row);
  }
  return newMatrix;
};

let count = 0;
for (let i = 0; i < 4; i++) {
  const square = rotate90(input, i);
  const squareText = square.map((r) => r.join("")).join("\n");
  const squareFinds = (squareText.match(/XMAS/g) || []).length;
  count += squareFinds;
  const diamond = rotate45(square);
  const diamondText = diamond.map((r) => r.join("")).join("\n");
  const diamondFinds = (diamondText.match(/XMAS/g) || []).length;
  count += diamondFinds;
}
console.log("step 1", count);

const searchShape = ["M.S", ".A.", "M.S"].map((l) => l.split(""));

const isMas = (mx) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (searchShape[i][j] !== "." && mx[i][j] !== searchShape[i][j]) {
        return false;
      }
    }
  }
  return true;
};

const cut3 = (matrix, x, y) => {
  const newMx = [[], [], []];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      newMx[i][j] = matrix[x + i][y + j];
    }
  }
  return newMx;
};

let count2 = 0;
for (let i = 0; i < 4; i++) {
  const square = rotate90(input, i);
  for (let x = 0; x < square.length - 2; x++) {
    for (let y = 0; y < square[x].length - 2; y++) {
      const cut = cut3(square, x, y);
      if (isMas(cut)) {
        count2++;
      }
    }
  }
}

console.log("step 2", count2);
