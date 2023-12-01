const fs = require("fs");

const dictionary = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function getl(line) {
  for (const [key, value] of Object.entries(dictionary)) {
    if (line.startsWith(key) || line.startsWith(value)) {
      return value;
    }
  }
  return getl(line.substring(1));
}

function getr(line) {
  for (const [key, value] of Object.entries(dictionary)) {
    if (line.endsWith(key) || line.endsWith(value)) {
      return value;
    }
  }
  return getr(line.substring(0, line.length - 1));
}

const lines = fs.readFileSync("day1.txt", { encoding: "utf-8" }).split("\n");
const calibrations = lines.map((line) => getl(line) + "" + getr(line));
const result = calibrations.reduce((a, b) => a + parseInt(b), 0);

console.log(result);
