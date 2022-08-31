export const POWERS = Object.freeze({
  text: "Presence DR12, or -d2 HP and no Powers for 1 hr.",
  dc: 12,
});

export const TESTS: Partial<Tests> = Object.freeze({
  attack: 12,
  defense: 12,
});

export const SIDES = Object.freeze({
  players: "monsters",
  monsters: "players",
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
