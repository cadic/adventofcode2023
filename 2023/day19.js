const fs = require("fs");
const input = fs
  .readFileSync("day19e.txt", { encoding: "utf-8" })
  .split("\n\n");

const rules = Object.fromEntries(
  input[0].split("\n").map((l) => {
    const m = l.match(/([a-z]+){(.*?)}/);
    const id = m[1];
    const r = m[2].split(",");
    const f = () => {
      while (r.length) {
		
	  }
    };
    return [id, r];
  })
);
