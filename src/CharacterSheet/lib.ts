import {
  compose,
  filter,
  max,
  min,
  propOr,
  propSatisfies,
  reduce,
} from "ramda";
import type { ArmorAndShield, CharacterType, Equipment, Weapon } from "./type";

const toInt = (x: string): number => parseInt(x, 10);

export const getEquipment = propOr([], "equipment") as (
  x: CharacterType
) => Equipment[];

const isTrue = (x: any): boolean => x === true;

export const isEquipped = propSatisfies(isTrue, "equipped");

export const isWeapon = propSatisfies((x: string) => x === "weapon", "type");

export const isArmor = propSatisfies(
  (x: string) => x === "armor" || x === "shield",
  "type"
);

const equippedWeapons = filter(
  (x: Equipment) => isWeapon(x) && isEquipped(x)
) as (arg1: Equipment[]) => Weapon[];

const equippedArmor = reduce(
  (acc, eq: Equipment) => {
    if (isArmor(eq) && isEquipped(eq)) {
      acc[eq.type] = eq;
    }

    return acc;
  },
  {
    armor: null,
    shield: null,
  }
) as (arg1: Equipment[]) => ArmorAndShield;

// EXPORTS

export const incrementHp = (hp: number) => (character: CharacterType) => {
  const { current, maximum } = character.hitpoints;

  return {
    ...character,
    hitpoints: {
      current: min(current + hp, maximum),
      maximum,
    },
  };
};

export const useOmen = () => (character: CharacterType) => {
  const { current, maximum } = character.omens;

  return {
    ...character,
    omens: {
      current: max(0, current - 1),
      maximum,
    },
  };
};

export const setOmens = (num: number) => (character: CharacterType) => {
  const { maximum } = character.omens;

  return {
    ...character,
    omens: {
      current: min(maximum, num),
      maximum,
    },
  };
};

// TODO: Candidate for either since adjust could have
export const incrementSilver = (num: number) => (character: CharacterType) => {
  const { silver } = character;

  return {
    ...character,
    silver: max(0, silver + num),
  };
};

//
const trace =
  (msg: string) =>
  (x: any): any => {
    console.log(msg, x);
    return x;
  };

//
export const getEquippedWeapons = compose(equippedWeapons, getEquipment);

export const getEquippedArmor = compose(equippedArmor, getEquipment);
