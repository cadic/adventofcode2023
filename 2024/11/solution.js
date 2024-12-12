const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const transforms = new Map();

const blink = (stones) => {
  const r = [];
  stones.split(" ").forEach((stone) => {
    const knownStone = transforms.get(stone);
    if (knownStone) {
      r.push(knownStone[0]);
      if ("undefined" !== typeof knownStone[1]) {
        r.push(knownStone[1]);
      }
    } else {
      if ("0" === stone) {
        r.push("1");
        transforms.set(stone, ["1"]);
      } else if (stone.length % 2 === 0) {
        const mid = stone.length / 2;
        const s1 = stone.slice(0, mid);
        const s2 = parseInt(stone.slice(mid));
        r.push(s1);
        r.push(s2);
        transforms.set(stone, [s1, s2]);
      } else {
        const s1 = parseInt(stone) * 2024;
        r.push(s1);
        transforms.set(stone, [s1]);
      }
    }
  });

  return r.join(" ");
};

let stones = "0";
for (let i = 0; i < 75; i++) {
  stones = blink(stones);
  console.log(i, stones.split(" ").length);
}

console.log("step 2", stones.split(" ").length);
