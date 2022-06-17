import { has, pathOr } from "ramda";
import { BASE_ENCUMBRANCE } from "./gameConstants";
import type { Equipment, TCharacter, Tests } from "../global";

const hasEffect = has("effect");
const getTests = pathOr({}, ["effect", "tests"]);
const testKeys = [
  "agility",
  "presence",
  "strength",
  "toughness",
  "attack",
  "defense",
];

export function getTestModifiers(character: TCharacter): Tests {
  const testModifers: Tests = { ...character.tests };
  const { equipment } = character;

  equipment.forEach((eq) => {
    if (hasEffect(eq)) {
      const tests = getTests(eq);

      testKeys.map(
        (key) => (testModifers[key] = testModifers[key] + (tests[key] || 0))
      );
    }
  });

  return testModifers;
}

// Strength + 8;
// Strength + 8 * 2 === max capacity
export function isEncumbered(
  equipment: Equipment[],
  strength: number = 0
): boolean {
  const currentCarryingCapacity = BASE_ENCUMBRANCE + strength;
  return equipment.length > currentCarryingCapacity;
}
