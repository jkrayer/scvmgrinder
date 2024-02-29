// copied from src/CharacterSheet/*
import { assoc, equals, lens, min, over, pathSatisfies, prop } from "ramda";

const HP_KEY = "hitpoints";

const hpLens = lens<CharacterType, CurrentMax>(prop(HP_KEY), assoc(HP_KEY));

const incrementHp =
  (hp: number) =>
  ({ current, maximum }: CurrentMax) => ({
    current: min(maximum, current + hp),
    maximum,
  });

export const isBroken = pathSatisfies(equals(0), [HP_KEY, "current"]);

export const updateHp =
  (hp: number) =>
  (character: CharacterType): CharacterType =>
    over(hpLens, incrementHp(hp), character);
