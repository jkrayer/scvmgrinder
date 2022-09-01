import { compose, identity, ifElse } from "ramda";
import { setStatus, deleteStatus, isEncumbered } from "./status";
import { addEquipment, dropEquipment } from "./equipment";
import { isBroken, updateHp } from "./hp";
import { ENCUMBERED, BROKEN } from "../game_constants/status";

// Equipment
const toggleEncumbered = ifElse(
  isEncumbered,
  setStatus(ENCUMBERED),
  deleteStatus(ENCUMBERED)
) as (arg1: CharacterType) => CharacterType;

export const addEquipmentWithEncumbrance = (eq: Equipment) =>
  compose(toggleEncumbered, addEquipment(eq));

export const dropEquipmentWithEncumbrance = (eq: Equipment) =>
  compose(toggleEncumbered, dropEquipment(eq));

// Health
const toggleBroken = ifElse(isBroken, setStatus(BROKEN), identity) as (
  arg1: CharacterType
) => CharacterType;

export const updateHpWithBroken = (hp: number) =>
  compose(toggleBroken, updateHp(hp));

export const clearBrokenStatus = deleteStatus(BROKEN);
