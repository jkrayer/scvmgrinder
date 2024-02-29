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

// DEBUGGING
const trace =
  (msg: string) =>
  (x: any): any => {
    console.log(msg, x);
    return x;
  };

export const roll = (d: number): number => Math.floor(Math.random() * d) + 1;

type RollMath = "+" | "-" | "x";
type ROLLFORMULA = [number, "d", number, RollMath, number];

export const rollFormula = ([
  number,
  ,
  die,
  operation,
  modifier,
]: ROLLFORMULA): number => {
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

// pretty easy to cache
export const parseRollString = (rs: string): ROLLFORMULA => {
  const dieIndex = rs.indexOf("d");
  const modIndex = toInboundsIndex(rs.search(/[-x\+]/));

  return [
    toInt(rs.slice(0, dieIndex)),
    "d",
    toInt(rs.slice(dieIndex + 1, modIndex)),
    modIndex === Infinity ? "+" : (rs.charAt(modIndex) as RollMath),
    modIndex === Infinity ? 0 : toInt(rs.slice(modIndex + 1)),
  ];
};

export const rollString = compose(rollFormula, parseRollString) as (
  arg1: string
) => number;

const getEq = propOr([], "equipment") as (arg1: CharacterType) => Equipment[];

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
  arg1: CharacterType
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
) as (arg1: CharacterType) => Scroll[];
