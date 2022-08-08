import { compose, max, min, pathOr } from "ramda";
import type { CharacterType } from "./type";

const toInt = (x: string): number => parseInt(x, 10);

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
