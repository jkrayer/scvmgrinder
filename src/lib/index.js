import { compose, prop } from "ramda";

export const symbol = (score) =>
  score === 0 ? `±${score}` : score > 0 ? `+${score}` : score;

export const trace = (message) => (x) => {
  console.log(message, x);
  return x;
};

export const generateEmptyCharacter = (id) => ({
  id,
  name: "New Character",
  description: "",
  class: {
    name: "",
    powers: [],
  },
  hitpoints: {
    maximum: 0,
    current: 0,
  },
  omens: {
    die: 0,
    current: 0,
  },
  abilities: {
    strength: 0,
    agility: 0,
    presence: 0,
    toughness: 0,
  },
  equipment: [],
  provisions: {
    waterskin: true,
    daysOfWater: 4,
    daysOfFood: 0,
  },
  silver: 0,
});

// Rolling
// const validRollString = /^\d+d\d{1,3}[+-x]?\d+$/;
// const rollString = "2d6x10";
// const tupleDice = [2, "d", 6, "x", 10]; // a.k.a. roll formula

export const roll = (d) => Math.floor(Math.random() * d) + 1;

export const rollFormula = ([number, , die, operation, modifier]) => {
  let r = 0;

  for (let i = 0; i < number; i++) {
    r += roll(die);
  }

  switch (operation) {
    case "+":
      r += modifier;
      break;
    case "-":
      r -= modifier;
      break;
    case "x":
      r *= modifier;
      break;
    default:
      break;
  }

  return r;
};

export const toInt = (str) => parseInt(str, 10);

const toInboundsIndex = (num) => (num === -1 ? Infinity : num);

const parseRollString = (rs) => {
  const dieIndex = rs.indexOf("d");
  let modIndex = toInboundsIndex(rs.search(/[-x\+]/));
  let modNext = modIndex + 1;

  const roll = [
    toInt(rs.slice(0, dieIndex)),
    "d",
    toInt(rs.slice(dieIndex + 1, modIndex)),
  ];

  return modIndex === Infinity
    ? roll
    : [...roll, rs.slice(modIndex, modNext), toInt(rs.slice(modNext))];
};

export const rollString = compose(rollFormula, parseRollString);

export const getAbilityScore = (num) =>
  num < 5
    ? -3
    : num < 7
    ? -2
    : num < 9
    ? -1
    : num < 13
    ? 0
    : num < 15
    ? 1
    : num < 17
    ? 2
    : 3;

export const getDie = compose(prop(2), parseRollString);
