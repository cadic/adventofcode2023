const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map((r) => r.split(": "))
  .map((r) => ({
    r: parseInt(r[0]),
    o: r[1].split(" ").map((v) => parseInt(v)),
  }));

const buildVariants = (operands) => {
  const head = operands.slice(0, -1);
  const tail = operands.slice(-1)[0];

  if (head.length === 1) {
    return [head[0] + tail, head[0] * tail];
  } else {
    const results = [];
    const variants = buildVariants(head);

    for (let i = 0; i < variants.length; i++) {
      results.push(variants[i] + tail);
      results.push(variants[i] * tail);
    }
    return results;
  }
};

const buildVariants2 = (operands) => {
  const head = operands.slice(0, -1);
  const tail = operands.slice(-1)[0];

  if (head.length === 1) {
    return [head[0] + tail, head[0] * tail, parseInt(head[0] + `${tail}`)];
  } else {
    const results = [];
    const variants = buildVariants2(head);

    for (let i = 0; i < variants.length; i++) {
      results.push(variants[i] + tail);
      results.push(variants[i] * tail);
      results.push(parseInt(variants[i] + `${tail}`));
    }
    return results;
  }
};

const test = (e, f) => {
  const result = e.r;
  const variants = f(e.o);
  return variants.includes(result);
};

const step1 = input.reduce((p, v) => {
  if (test(v, buildVariants)) {
    return p + v.r;
  }
  return p;
}, 0);

const step2 = input.reduce((p, v) => {
  if (test(v, buildVariants2)) {
    return p + v.r;
  }
  return p;
}, 0);

console.log(step1);
console.log(step2);
