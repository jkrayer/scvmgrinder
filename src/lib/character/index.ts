import { compose, ifElse } from "ramda";
import { setStatus, deleteStatus, isEncumbered } from "./status";
import { addEquipment, dropEquipment } from "./equipment";
import { ENCUMBERED } from "../game_constants/status";

const toggleEncumbered = ifElse(
  isEncumbered,
  setStatus(ENCUMBERED),
  deleteStatus(ENCUMBERED)
) as (arg1: CharacterType) => CharacterType;

export const addEquipmentWithEncumbrance = (eq: Equipment) =>
  compose(toggleEncumbered, addEquipment(eq));

export const dropEquipmentWithEncumbrance = (eq: Equipment) =>
  compose(toggleEncumbered, dropEquipment(eq));
