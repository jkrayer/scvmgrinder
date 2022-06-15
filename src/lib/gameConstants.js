export const TESTS = Object.freeze({
  MELEE: 12,
  RANGED: 12,
  DEFENSE: 12,
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

export const DIZZY = {
  name: "Dizzy",
  description:
    "You are dizzy For the next hour. During this time, Powers will always fail in the worst possible way.",
  // 60 minutes in milliseconds
  duration: 60 * 60 * 1000,
  // stub of an idea about there being some sort of gamne time timer the DM can advance
};

// EFFECT MODEL
const effect = {
  description: "DR +2 on Agility tests including defence",
  tests: { agility: 2, defense: 2 },
};
