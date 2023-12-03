const fs = require("fs");
const lines = fs.readFileSync("day3.txt", { encoding: "utf-8" }).split("\n");
const data = lines.map((line) => line.split(""));
const symbols = [];

const isPartNumber = (symbol) => {
  if (!symbol.number.match(/\d/)) {
    return false;
  }
  return symbol.adjucent.length > 1;
};

const getAdjucent = (symbol) => {
  return symbols.filter((s) => {
    const intersection = symbol.body.filter((x) => s.fog.includes(x));
    return intersection.length > 0;
  });
};

const readSymbol = (x, y) => {
  if ("." === data[y][x]) {
    return false;
  } else if (data[y][x].match(/\d/)) {
    const chunks = [];
    while (x < data[y].length && data[y][x].match(/\d/)) {
      chunks.push(data[y][x]);
      x++;
    }
    return chunks.join("");
  } else {
    return data[y][x];
  }
};

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    const symbol = readSymbol(x, y);
    if (symbol) {
      const body = [];
      const fog = [];

      for (let index = 0; index < symbol.length; index++) {
        body.push(`${x + index},${y}`);
      }
      for (let i = x - 1; i < x + symbol.length + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          fog.push(`${i},${j}`);
        }
      }
      symbols.push({
        number: symbol,
        x: x,
        y: y,
        body: body,
        fog: fog,
        l: symbol.length,
      });
      x += symbol.length - 1;
    }
  }
}
symbols.forEach((symbol) => {
  symbol.adjucent = getAdjucent(symbol);
});
const partNumbers = symbols.filter((symbol) => isPartNumber(symbol));
const score = partNumbers.reduce((prev, pn) => prev + parseInt(pn.number), 0);
console.log("Score1", score);

const gears = symbols.filter((symbol) => {
  const value = symbol.number;
  const partNumbers = symbol.adjucent.filter((adj) => {
    return adj.number.match(/\d/);
  });
  return value === "*" && partNumbers.length === 2;
});

const score2 = gears.reduce((prev, gear) => {
  const partNumbers = gear.adjucent.filter((adj) => {
    return adj.number.match(/\d/);
  });
  const ratio = partNumbers.reduce((p, v) => p * parseInt(v.number), 1);
  return prev + ratio;
}, 0);
console.log("Score2", score2);
