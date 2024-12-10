const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const files = new Map();
const files2 = new Map();

files.set(".", []);
files2.set(".", []);
let pointer = 0;

for (let i = 0; i < input.length; i++) {
  const fileDesc = parseInt(input[i]);
  if (fileDesc) {
    const id = i % 2 ? "." : Math.floor(i / 2);
    const file2 = files2.get(id) || [];
    file2.push([pointer, fileDesc]);
    files2.set(id, file2);

    const file = files.get(id) || [];
    for (let b = 0; b < fileDesc; b++) {
      file.push(pointer);
      pointer++;
    }
    files.set(id, file);
  }
}

const defrag = (files) => {
  const ids = [...files.keys()].slice(1);
  for (let i = ids.length - 1; i >= 0; i--) {
    const file = files.get(i);
    const free = files.get(".");
    if (!free.length) {
      return files;
    }
    for (let fp = file.length - 1; fp >= 0; fp--) {
      if (file.slice(-1)[0] > free[0]) {
        const fileBlock = file.pop();
        const freeBlock = free.shift();
        file.unshift(freeBlock);
        free.push(fileBlock);
      }
    }
  }
  return files;
};

const defrag2 = (files) => {
  const ids = [...files.keys()].slice(1);
  const frees = files.get(".");
  for (let i = ids.length - 1; i >= 0; i--) {
    const file = files.get(i)[0];
    const fp = file[0];
    const fl = file[1];
    // search for free space enough to fit file
    const freeSlot = frees.find((e) => e[1] >= fl);
    if (freeSlot && freeSlot[0] < file[0]) {
      // Move file to free slot
      file[0] = freeSlot[0];
      // remove free space
      freeSlot[0] += fl;
      freeSlot[1] -= fl;
      // add free space;
      frees.push([fp, fl]);
    }
  }
  return files;
};

const nicePrint = (files) => {
  const line = [];
  for (let [k, file] of files) {
    for (let blk = 0; blk < file.length; blk++) {
      const idx = file[blk];
      line[idx] = k;
    }
  }
  console.log(line.join(""));
};

const nicePrint2 = (files) => {
  const line = [];
  for (let [k, file] of files) {
    for (let chunk = 0; chunk < file.length; chunk++) {
      for (let i = 0; i < file[chunk][1]; i++) {
        const idx = file[chunk][0] + i;
        line[idx] = k;
      }
    }
  }
  console.log(line.join(""));
};

const checksum = (files) => {
  let s = 0;
  for (let [k, file] of files) {
    if ("." !== k) {
      for (let b = 0; b < file.length; b++) {
        const block = file[b];
        s += k * block;
      }
    }
  }
  return s;
};

const checksum2 = (files) => {
  let s = 0;
  for (let [k, file] of files) {
    if ("." !== k) {
      for (let i = 0; i < file[0][1]; i++) {
        const block = file[0][0] + i;
        s += block * k;
      }
    }
  }
  return s;
};

const def = defrag(files);
console.log("step1", checksum(def));

const def2 = defrag2(files2);
console.log("step1", checksum2(def2));
