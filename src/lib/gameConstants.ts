import type { Status, Tests } from "../global";

export const TESTS: Partial<Tests> = Object.freeze({
  attack: 12,
  defense: 12,
});

export const DIFFICULTY_RATING = {
  6: "so simple people laugh at you for failing",
  8: "routine but some chance of failure",
  10: "pretty simple but not simple enough to not roll",
  12: "normal",
  14: "difficult",
  16: "really hard",
  18: "should not be possible",
};

export const BASE_ENCUMBRANCE = 8;

// STATUSES
export const DIZZY: Status = {
  name: "Dizzy",
  description:
    "You are dizzy For the next hour. During this time, Powers will always fail in the worst possible way.",
  // 60 minutes in milliseconds
  duration: 60 * 60 * 1000,
  // stub of an idea about there being some sort of gamne time timer the DM can advance
};

export const ENCUMBERED: Status = {
  name: "Encumbered",
  description: "Strength + 8 items or DR+2 on Agility/Strength tests",
  tests: {
    agility: 2,
    strength: 2,
  },
};

// export const INFECTED: Status = {}
