const fs = require("fs");

const rounds = fs.readFileSync("input.txt", { encoding: "utf-8" }).split("\n");

const worth = { X: 1, Y: 2, Z: 3 };
const winning = ["C X", "A Y", "B Z"];
const draws = ["A X", "B Y", "C Z"];
const looses = ["A Z", "B X", "C Y"];

const score1 = rounds.reduce((p, hand) => {
  const win = winning.includes(hand);
  const draw = draws.includes(hand);
  const s = win ? 6 : draw ? 3 : 0;
  return p + s + worth[hand[2]];
}, 0);

console.log(score1);

const score2 = rounds.reduce((p, hand) => {
  const win = "Z" === hand[2];
  const draw = "Y" === hand[2];
  const s = win ? 6 : draw ? 3 : 0;
  const h = win
    ? winning.find((w) => w[0] === hand[0])[2]
    : draw
    ? draws.find((d) => d[0] === hand[0])[2]
    : looses.find((l) => l[0] === hand[0])[2];
  //console.log(hand, win, draw, h, s, worth[h]);
  return p + s + worth[h];
}, 0);
console.log(score2);
