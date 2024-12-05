const fs = require("fs");

const [r, u] = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n\n");

const rules = r.split("\n").map((r) => r.split("|").map((n) => parseInt(n)));
const updates = u.split("\n").map((u) => u.split(",").map((n) => parseInt(n)));

const updatesRev = updates.map((update) => {
  const rev = { o: update, hm: {} };
  for (let i = 0; i < update.length; i++) {
    const element = update[i];
    rev.hm[element] = i;
  }
  rev.m = Math.ceil(update.length / 2) - 1;
  rev.mv = update[rev.m];
  return rev;
});

const mySort = (a, b) => {
  const rule = rules.find((r) => {
    return r.includes(a) && r.includes(b);
  });
  if (rule[0] === a) {
    return -1;
  } else {
    return 1;
  }
};

const getMiddle = (update) => {
  return update[Math.ceil(update.length / 2) - 1];
};

const isCorrect = (update) => {
  return rules.reduce((prev, rule) => {
    const i1 = rule[0];
    const i2 = rule[1];
    if (update.hm[i1] > update.hm[i2]) {
      return false;
    }
    return prev;
  }, true);
};

const [step1, step2] = updatesRev.reduce(
  (prev, update) => {
    if (isCorrect(update)) {
      return [prev[0] + parseInt(update.mv), prev[1]];
    } else {
      const sorted = update.o.sort(mySort);
      return [prev[0], prev[1] + getMiddle(sorted)];
    }
  },
  [0, 0]
);

console.log("Step 1", step1);
console.log("Step 2", step2);
