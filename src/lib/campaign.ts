import { pathOr } from "ramda";
import type { Campaign, TrackerMonster, TrackerSides } from "../global";

export const getTrackerMonsters = pathOr([], ["trackerData", "monsters"]) as (
  arg1: Campaign
) => TrackerMonster[];

export const getTrackerSide = pathOr("players", [
  "trackerData",
  "firstSide",
]) as (arg1: Campaign) => TrackerSides;
