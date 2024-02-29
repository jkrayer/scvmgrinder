import { filter, map, path } from "ramda";

type Name = {
  name: string;
};

export const filterById = <T extends { _id: string | number }>(
  id: string | number
) => filter<T>(({ _id }) => _id !== id);

export const replaceById = <T extends { _id: string | number }>(eq: T) =>
  map((x: T) => (x._id === eq._id ? eq : x));

export const rollMessage = (x: number) =>
  x === 1 ? ", Fumble!" : x === 20 ? ", Critical!" : "";

/**
 * get the named ability score from the character data object
 * @param character
 * @param score strength|agility|presence|toughness
 * @returns number
 */
export const getAbilityScore = (
  character: CharacterType,
  score: AbilityScoreName
): number => path(["abilities", score], character);
