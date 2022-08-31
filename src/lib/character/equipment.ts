// copied from src/CharacterSheet/*
import { __, assoc, concat, lens, over, prop } from "ramda";
import { filterByName } from "./common";

const EQUIPMENT_KEY = "equipment";

const eqLens = lens<CharacterType, Equipment[]>(
  prop(EQUIPMENT_KEY),
  assoc(EQUIPMENT_KEY)
);

export const addEquipment =
  (eq: Equipment) =>
  (
    character: CharacterType
  ): CharacterType => // @ts-ignore
    over(eqLens, concat(__, [eq]), character);

export const dropEquipment =
  ({ name }: Equipment) =>
  (character: CharacterType): CharacterType =>
    over(eqLens, filterByName<Equipment>(name), character);
