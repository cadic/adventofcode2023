// const races = [
//   { t: 49, d: 263 },
//   { t: 97, d: 1532 },
//   { t: 94, d: 1378 },
//   { t: 94, d: 1851 },
// ];

const races = [{ t: 49979494, d: 263153213781851 }];

const wins = races.map((race) => {
  let count = 0;
  for (let i = 0; i <= race.t; i++) {
    const chargeTime = i;
    const travelTime = race.t - chargeTime;
    const speed = chargeTime;
    const distance = speed * travelTime;
    if (distance >= race.d) {
      count++;
    }
  }
  return count;
});
console.log(wins.reduce((p, v) => p * v, 1));
