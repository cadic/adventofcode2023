const fs = require("fs");

const input = fs.readFileSync("input.txt", { encoding: "utf-8" }).split("");
const l = input.length
const buffer = [];
for (let i = 0; i < l; i++) {
  const c = input.shift();
  buffer.push(c);
  if (buffer.length > 14) {
    buffer.shift();
  }
  const unique = [...new Set(buffer)];
  if (unique.length === 14) {
    console.log(i + 1, unique.join(""));
    break;
  }
}
console.log(buffer.join(""));