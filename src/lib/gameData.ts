import { has, pathOr, reduce, toPairs } from "ramda";
import { BASE_ENCUMBRANCE } from "./gameConstants";
import type { Equipment, StatusTypes, TCharacter, Tests } from "../global";

const hasEffect = has("effect");
const hasTests = has("tests") as (arg1: StatusTypes) => boolean;
const getTests = pathOr({}, ["effect", "tests"]);

// const getEquipmentEffects = reduce((acc: Tests[], equipment: Equipment) => {
//   if (hasEffect(equipment)) {
//     return acc.concat(getTests(equipment));
//   }

//   return acc;
// }, []) as (arg1: Equipment[]) => Tests[];

const getStatusEffects = reduce(
  (acc: Partial<Tests>[], status: StatusTypes) => {
    if (hasTests(status)) {
      // @ts-ignore
      return acc.concat(status.tests);
    }

    return acc;
  },
  []
) as (arg1: StatusTypes[]) => Tests[];

const sumTestObjects = (
  tests: Tests,
  ...otherModifiers: Partial<Tests>[]
): Tests =>
  reduce(
    (acc: Tests, mods: Partial<Tests>) => {
      toPairs(mods).map(([key, val]) => {
        acc[key] = acc[key] + val;
      });

      return acc;
    },
    tests,
    otherModifiers
  );

// export function getTestModifiers(character: TCharacter): Tests {
//   const testModifers: Tests = { ...character.tests };
//   const { equipment, status } = character;

//   return sumTestObjects(
//     testModifers,
//     ...getEquipmentEffects(equipment),
//     ...getStatusEffects(status)
//   );
// }

// Strength + 8;
// Strength + 8 * 2 === max capacity
export function isEncumbered(
  equipment: Equipment[],
  strength: number = 0
): boolean {
  const currentCarryingCapacity = BASE_ENCUMBRANCE + strength;
  return equipment.length > currentCarryingCapacity;
}
