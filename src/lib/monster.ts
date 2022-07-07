import { propOr } from "ramda";
import type { TTrackerItem } from "../global";
import { TESTS } from "./gameConstants";

export const getToHit = propOr(TESTS.attack, "toHit") as (
  arg1: TTrackerItem
) => number;
