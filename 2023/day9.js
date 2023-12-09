const fs = require("fs");
const datasets = fs
  .readFileSync("day9.txt", { encoding: "utf-8" })
  .split("\n")
  .map((dataset) => {
    const input = dataset.split(" ");
    const line = input.map((a) => parseInt(a));
    return [line];
  });

const getDiff = (line) => {
  const diff = [];
  for (let i = 1; i < line.length; i++) {
    diff.push(line[i] - line[i - 1]);
  }
  return diff;
};

for (let i = 0; i < datasets.length; i++) {
  while (!datasets[i][datasets[i].length - 1].every((a) => a === 0)) {
    datasets[i].push(getDiff(datasets[i][datasets[i].length - 1]));
  }
  datasets[i][datasets[i].length - 1].push(0);

  for (let d = datasets[i].length - 1; d > 0; d--) {
    const val1 =
      datasets[i][d - 1].slice(0, 1)[0] - datasets[i][d].slice(0, 1)[0];
    datasets[i][d - 1].unshift(val1);
    const val = datasets[i][d].slice(-1)[0] + datasets[i][d - 1].slice(-1)[0];
    datasets[i][d - 1].push(val);
  }
}

const part1 = datasets.reduce((p, dataset) => {
  return p + dataset[0].pop();
}, 0);

const part2 = datasets.reduce((p, dataset) => {
  return p + dataset[0].shift();
}, 0);

console.log("Part1", part1);
console.log("Part2", part2);
