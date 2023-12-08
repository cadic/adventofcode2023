const fs = require("fs");

const input = fs.readFileSync("day8.txt", { encoding: "utf-8" }).split("\n\n");

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);

const directions = input[0].split("");
const nodes = input[1].split("\n").map((node) => {
  const chunks = node.match(/([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/m);
  return {
    A: chunks[1],
    L: chunks[2],
    R: chunks[3],
  };
});

const dCount = directions.length;
let step = 0;
let current = nodes.find((node) => node.A === "AAA");
const finish = nodes.find((node) => node.A === "ZZZ");

console.log(`Directions: ${dCount}`);
console.log(`Nodes: ${nodes.length}`);

while (current.A !== finish.A) {
  step++;
  const dIndex = (step - 1) % dCount;
  const direction = directions[dIndex];
  const nextNodeAddress = current[direction];
  const nextNode = nodes.find((node) => node.A === nextNodeAddress);
  current = nextNode;
}
console.log("Solution 1:", step);

step = 0;
let currents = nodes.filter((node) => "A" === node.A[2]);

const finishes = [];

while (true) {
  step++;
  const dIndex = (step - 1) % dCount;
  const direction = directions[dIndex];
  for (let i = 0; i < currents.length; i++) {
    const nextNodeAddress = currents[i][direction];
    const nextNode = nodes.find((node) => node.A === nextNodeAddress);
    currents[i] = nextNode;
    if (nextNodeAddress.endsWith("Z")) {
      if (!finishes[i]) {
        finishes[i] = {
          A: nextNodeAddress,
          reach: step,
        };
      }
    }
  }
  const finished = finishes.filter((f) => f.reach > 0);
  if (finished.length === 6) {
    break;
  }
}

console.log(finishes);
const solution2 = lcmAll(finishes.map((f) => f.reach));

console.log("Solution 2:", solution2);
