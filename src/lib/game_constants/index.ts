export * as Status from "./status";

export const BASE_ENCUMBRANCE: number = 8;

export const ATTACK_DC: number = 12;

export const DEFENSE_DC: number = 12;

export const MIN_SCORE: number = -3;

export const MAX_SCORE: number = 6;

export const ATTACK_CRIT: string =
  "Double damage and target's armor is reduced one tier.";

export const DEFENSE_CRIT: string = " gains a free attack.";

export const POWERS = Object.freeze({
  text: "Presence DR12, or -d2 HP and no Powers for 1 hr.",
  fail: "you lose d2 HP and become dizzy for the next hour.",
  dc: 12,
});

export const NO_ARMOR: Armor = Object.freeze({
  type: "armor",
  name: "No armor",
  description: "",
  tier: { current: 0, maximum: 0 },
});
