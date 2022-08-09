import {
  compose,
  filter,
  max,
  min,
  propOr,
  propSatisfies,
  reduce,
} from "ramda";
import type {
  ArmorAndShield,
  CharacterType,
  Equipment,
  Weapon,
  Scroll,
} from "./type";

const toInt = (x: string): number => parseInt(x, 10);

export const getEquipment = propOr([], "equipment") as (
  x: CharacterType
) => Equipment[];

const isTrue = (x: any): boolean => x === true;

export const isEquipped = propSatisfies(isTrue, "equipped");

export const isWeapon = propSatisfies((x: string) => x === "weapon", "type");

export const isScroll = propSatisfies((x: string) => x === "scroll", "type");

export const isArmor = propSatisfies(
  (x: string) => x === "armor" || x === "shield",
  "type"
);

const equippedWeapons = filter(
  (x: Equipment) => isWeapon(x) && isEquipped(x)
) as (arg1: Equipment[]) => Weapon[];

const equippedArmor = (equipment: Equipment[]): ArmorAndShield => {
  return equipment.reduce(
    (acc, eq: Equipment) => {
      if (isArmor(eq) && isEquipped(eq)) {
        acc[eq.type] = eq;
      }

      return acc;
    },
    {
      armor: null,
      shield: null,
    } as ArmorAndShield
  );
};

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

export const equipmentToggle =
  (eq: Equipment) =>
  (character: CharacterType): CharacterType => {
    const { equipment } = character;

    return {
      ...character,
      equipment: equipment.map((e: Equipment) =>
        e.name === eq.name ? { ...e, equipped: !e.equipped } : e
      ),
    };
  };

export const equipmentDrop =
  (eq: Equipment) =>
  (character: CharacterType): CharacterType => {
    const { equipment } = character;

    return {
      ...character,
      equipment: equipment.filter((e: Equipment) => e.name !== eq.name),
    };
  };

//
const trace =
  (msg: string) =>
  (x: any): any => {
    console.log(msg, x);
    return x;
  };

// GETTERS
export const getEquippedWeapons = compose(equippedWeapons, getEquipment);

export const getEquippedArmor = compose(
  trace("equippedAr"),
  equippedArmor,
  trace("getEq"),
  getEquipment
);

export const getScrolls = compose(filter(isScroll), getEquipment) as (
  arg1: CharacterType
) => Scroll[];