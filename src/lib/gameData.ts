import { has, pathOr } from "ramda";
import type { TCharacter, Tests } from "../global";

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
