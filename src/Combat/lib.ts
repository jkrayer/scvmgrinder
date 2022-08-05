import { propOr } from "ramda";
import type { TTrackerItem } from "../global";
import { TESTS } from "../lib/gameConstants";

export const getToHit = propOr(TESTS.attack, "toHit") as (
  arg1: TTrackerItem
) => number;

export const rollTier = (tier: number): number => {
  const ARMOR_TIERS = [0, 2, 4, 6];

  return ARMOR_TIERS[tier];
};
