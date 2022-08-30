import {
  __,
  compose,
  filter,
  isNil,
  not,
  props,
  propOr,
  propSatisfies,
  reduce,
} from "ramda";
import type { Armor, Equipment, Scroll, TCharacter, Weapon } from "../global";

// DEBUGGING
const trace =
  (msg: string) =>
  (x: any): any => {
    console.log(msg, x);
    return x;
  };

export const roll = (d: number): number => Math.floor(Math.random() * d) + 1;

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

export const toInt = (str: string): number => parseInt(str, 10);

const toInboundsIndex = (num: number): number => (num === -1 ? Infinity : num);

type PlusOrMinus = "+" | "-";
type Roll = [number, "d", number];
type RollWithMod = [number, "d", number, PlusOrMinus, number];

const parseRollString = (rs: string): Roll | RollWithMod => {
  const dieIndex = rs.indexOf("d");
  let modIndex = toInboundsIndex(rs.search(/[-x\+]/));
  let modNext = modIndex + 1;

  const roll: Roll = [
    toInt(rs.slice(0, dieIndex)),
    "d",
    toInt(rs.slice(dieIndex + 1, modIndex)),
  ];

  return modIndex === Infinity
    ? roll
    : ([
        ...roll,
        rs.slice(modIndex, modNext),
        toInt(rs.slice(modNext)),
      ] as RollWithMod);
};

// export const rollString = compose(rollFormula, parseRollString) as (
//   arg1: string
// ) => number;

const getEq = propOr([], "equipment") as (arg1: TCharacter) => Equipment[];

// const equippedArmor = compose(
//   ([type, equipped]) => equipped && ["armor", "shield"].includes(type),
//   props(["type", "equipped"])
// ) as (arg1: Equipment[]) => Armor[];

export const sign = (num: number): string => {
  const s = Math.sign(num);

  if (s === 0) {
    return "";
  } else if (s === 1) {
    return `+${num}`;
  } else {
    return `${num}`;
  }
};

export const hasPowers = propSatisfies(compose(not, isNil), "powers") as (
  arg1: TCharacter
) => boolean;

// export const getWeapons = compose(
//   filter(({ type, equipped }) => type === "weapon" && equipped === true),
//   getEq
// ) as (arg1: TCharacter) => Weapon[];

// export const getArmor = compose(
//   reduce(
//     (acc, eq) => (equippedArmor(eq) ? { ...acc, [eq.type]: eq } : acc),
//     {}
//   ),
//   getEq
// ) as (arg1: TCharacter) => { armor: Armor; shield: any };

export const getScrolls = compose(
  filter(propSatisfies((type) => type === "scroll", "type")),
  getEq
) as (arg1: TCharacter) => Scroll[];
