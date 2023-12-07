const fs = require("fs");
const order = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
const types = {
  five: [5],
  four: [4, 1],
  full: [3, 2],
  three: [3, 1, 1],
  two: [2, 2, 1],
  one: [2, 1, 1, 1],
  high: [1, 1, 1, 1, 1],
};

const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

const compareCards = (a, b) => {
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);
  return ai - bi;
};

const compareTypeNames = (a, b) => {
  const ai = Object.keys(types).indexOf(a);
  const bi = Object.keys(types).indexOf(b);
  return ai - bi;
};

const compareTypes = (a, b) => {
  const ai = Object.values(types).indexOf(a);
  const bi = Object.values(types).indexOf(b);
  return ai - bi;
};

const compareHands = (a, b) => {
  const typeA = types[a.type];
  const typeB = types[b.type];
  const typeCompare = compareTypes(typeA, typeB);
  if (typeCompare !== 0) {
    return typeCompare;
  }
  const cardsA = a.cards;
  const cardsB = b.cards;
  for (let i = 0; i < cardsA.length; i++) {
    const cardA = cardsA[i];
    const cardB = cardsB[i];
    const compare = compareCards(cardA, cardB);
    if (compare !== 0) {
      return compare;
    }
  }
  return 0;
};

const detectType = (cards) => {
  const counts = {};
  for (const card of cards) {
    counts[card] = counts[card] ? counts[card] + 1 : 1;
  }
  const set = Object.values(counts).sort((a, b) => b - a);
  const type = Object.keys(types).find((key) => arrayEquals(types[key], set));
  return type;
};

const detectTypeWithJokers = (cards) => {
  let type = detectType(cards);
  const newCards = [...cards];
  const jokerIndex = cards.indexOf("J");
  if (-1 !== jokerIndex) {
    for (card of order) {
      if ("J" !== card) {
        newCards[jokerIndex] = card;
        newType = detectTypeWithJokers(newCards);
        if (compareTypeNames(type, newType) > 0) {
          type = newType;
        }
      }
    }
  }
  return type;
};

const hands = fs
  .readFileSync("day7.txt", { encoding: "utf-8" })
  .split("\n")
  .map((input) => {
    const chunks = input.split(" ");
    return {
      cards: chunks[0].split(""),
      bid: parseInt(chunks[1]),
    };
  })
  .map((hand) => ({
    ...hand,
    type: detectTypeWithJokers(hand.cards),
  }))
  .sort(compareHands)
  .reverse()
  .map((hand, index) => {
    return {
      ...hand,
      rank: index + 1,
    };
  });

const score2 = hands.reduce((prev, hand) => {
  return prev + hand.bid * hand.rank;
}, 0);
console.log("Score2:", score2);
