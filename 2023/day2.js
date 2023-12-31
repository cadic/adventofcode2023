const fs = require("fs");
const lines = fs.readFileSync("day2.txt", { encoding: "utf-8" }).split("\n");

const rules = {
  red: 12,
  green: 13,
  blue: 14,
};

const detect = (set) => {
  const elements = set.split(", ");
  return Object.fromEntries(
    elements.map((el) => {
      const r = el.match(/(\d+) (red|green|blue)/m);
      return [r[2], parseInt(r[1])];
    })
  );
};

const possible = (set) => {
  for (const [key, value] of Object.entries(set)) {
    if (value > rules[key]) {
      return false;
    }
  }
  return true;
};

const play = (game) => {
  const result = game.sets.reduce((prev, el) => prev && possible(el), true);
  return result;
};

const games = lines.map((line) => {
  const res = line.match(/^Game (\d+): (.*)/m);
  const id = res[1];
  const sets = res[2].split("; ").map((set) => detect(set));
  return {
    id: parseInt(id),
    sets: sets,
  };
});

const score = games
  .filter((game) => play(game))
  .reduce((res, game) => res + game.id, 0);
console.log("Score:", score);

const score2 = games
  .map((game) => {
    const fewest = game.sets.reduce(
      (prev, set) => {
        const current = prev;
        for (const [key, value] of Object.entries(set)) {
          if (value > current[key]) {
            current[key] = value;
          }
        }
        return current;
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    );
    const power = fewest.red * fewest.blue * fewest.green;
    return power;
  })
  .reduce((res, power) => res + power, 0);
console.log("Score2:", score2);
