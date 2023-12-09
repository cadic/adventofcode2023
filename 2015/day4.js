const input = "yzbqklnj";
const crypto = require("crypto");

let hash = "";
let i = 0;
while (hash.startsWith("00000") === false) {
  hash = crypto.createHash("md5").update(`${input}${++i}`).digest("hex");
  if (i % 100000 === 0) {
    console.log(i, hash);
  }
}

console.log(i, hash);
