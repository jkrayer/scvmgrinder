import {
  __,
  compose,
  filter,
  gt,
  isNil,
  length,
  not,
  prop,
  props,
  propOr,
  propSatisfies,
  reduce,
} from "ramda";

// DEBUGGING
const trace = (msg) => (x) => {
  console.log(msg, x);
  return x;
};

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

const getEq = propOr([], "equipment");

const equippedArmor = compose(
  ([type, equipped]) => equipped && ["armor", "shield"].includes(type),
  props(["type", "equipped"])
);

export const sign = (num) => {
  const s = Math.sign(num);

  if (s === 0) {
    return "";
  } else if (s === 1) {
    return `+${num}`;
  } else {
    return `${num}`;
  }
};

export const hasPowers = propSatisfies(compose(not, isNil), "powers");

export const getWeapons = compose(
  filter(({ type, equipped }) => type === "weapon" && equipped === true),
  getEq
);

export const getArmor = compose(
  reduce(
    (acc, eq) => (equippedArmor(eq) ? { ...acc, [eq.type]: eq } : acc),
    {}
  ),
  getEq
);

export const getScrolls = compose(
  filter(propSatisfies((type) => type === "scroll", "type")),
  getEq
);
