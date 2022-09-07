import { filter, map, path } from "ramda";

type Name = {
  name: string;
};

export const filterByName = <T extends Name>(x: string) =>
  filter<T>(({ name }) => name !== x);

export const replaceByName = <T extends Name>(eq: T) =>
  map((x: T) => (x.name === eq.name ? eq : x));

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
