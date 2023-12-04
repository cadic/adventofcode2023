const fs = require("fs");
const lines = fs.readFileSync("day4.txt", { encoding: "utf-8" }).split("\n");

const score1 = lines.reduce((prev, line) => {
  const chunks = line.match(/Card\s+(\d+): (.*)\|(.*)/m);
  const winning = chunks[2]
    .split(" ")
    .filter((a) => parseInt(a))
    .map((a) => parseInt(a));
  const numbers = chunks[3]
    .split(" ")
    .filter((a) => parseInt(a))
    .map((a) => parseInt(a));

  const hits = winning.filter((win) => numbers.includes(win));
  const hitsNum = hits.length;
  const score = hitsNum ? Math.pow(2, hits.length - 1) : 0;
  return prev + score;
}, 0);
console.log(score1);

const cards = lines.map((line) => {
  const chunks = line.match(/Card\s+(\d+): (.*)\|(.*)/m);
  const number = parseInt(chunks[1]);
  const winning = chunks[2]
    .split(" ")
    .filter((a) => parseInt(a))
    .map((a) => parseInt(a));
  const numbers = chunks[3]
    .split(" ")
    .filter((a) => parseInt(a))
    .map((a) => parseInt(a));
  const card = {
    number: number,
    count: 1,
    winning: winning,
    numbers: numbers,
  };
  return card;
});

let score2 = 0;
for (let i = 0; i < cards.length; i++) {
  const hits = cards[i].winning.filter((win) => cards[i].numbers.includes(win));

  const hitsNum = hits.length;
  const score = hitsNum ? Math.pow(2, hits.length - 1) : 0;
  for (let c = 0; c < cards[i].count; c++) {
    score2 += score;
    for (let j = 1; j <= hitsNum; j++) {
      const index = i + j;
      if (cards[index]) {
        cards[index].count++;
      }
    }
  }
}
console.log("Score2", score2);

const cardsCount = cards.reduce((p, c) => p + c.count, 0);
console.log("Cards", cardsCount);
