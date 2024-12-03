const fs = require("fs");

const [stacksInput, instructionsInput] = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n\n");

const stacks = [];
stacksInput.split("\n").forEach((s) => {
  const r = [...s.matchAll(/(.{3})\s?/g)];
  for (let i = 0; i < r.length; i++) {
    const index = i + 1;
    if (!stacks[index]) {
      stacks[index] = [];
    }
    const char = r[i][1].match(/\[([A-Z])\]/);
    if (char) {
      stacks[index].unshift(char[1]);
    }
  }
});

const instructions = instructionsInput.split("\n").map((i) => {
  const r = i.match(/move (\d+) from (\d+) to (\d+)/);
  return {
    amount: parseInt(r[1]),
    from: parseInt(r[2]),
    to: parseInt(r[3]),
  };
});

instructions.forEach((instruction) => {
  //   "Part 1";
  //   for (let i = 0; i < instruction.amount; i++) {
  //     const char = stacks[instruction.from].pop();
  //     stacks[instruction.to].push(char);
  //   }
  const buffer = [];
  for (let i = 0; i < instruction.amount; i++) {
    buffer.push(stacks[instruction.from].pop());
  }
  for (let i = 0; i < instruction.amount; i++) {
    stacks[instruction.to].push(buffer.pop());
  }
});

const solution = stacks.map((s) => s.pop()).join("");
console.log(solution);
