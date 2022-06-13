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

// EFFECT MODEL
const effect = {
  description: "DR +2 on Agility tests including defence",
  tests: { agility: 2, defense: 2 },
};
