import { curry, filter, type PredTypeguard, type Pred } from "ramda";
import { getAbilityScore } from "./common";
import { BASE_ENCUMBRANCE } from "../game_constants";

/**
 * Check if the given status exists on the given character
 * @param status
 * @param character
 * @returns boolean
 */
// export const hasStatus = (status: Status, character: CharacterType): boolean =>
//   hasPath(["status", status.name], character);

/**
 * Add the given status to the given character
 * @param stat Status
 * @param param1 CharacterType
 * @returns CharacterType
 */
export const setStatus = curry(
  (stat: Status, { status, ...rest }: CharacterType): CharacterType => ({
    ...rest,
    status: { ...status, [stat.name]: stat },
  })
);

/**
 * Remove the provideed status from the provided character
 * @param stat Status
 * @param param1 CharacterType
 * @returns CharacterType
 */
export const deleteStatus = curry(
  (stat: Status, { status, ...rest }: CharacterType): CharacterType => ({
    ...rest,
    status: filter((s) => s.name !== stat.name, status),
  })
);

// TESTS

/**
 * Tests enncumbrance by comparing 8+strength to the length of the equipment array
 * @param character CharacterType
 * @returns boolean
 */
export const isEncumbered = (character: CharacterType): boolean =>
  character.equipment.length >
  BASE_ENCUMBRANCE + getAbilityScore(character, "strength");
