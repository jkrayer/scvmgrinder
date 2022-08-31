import { has, pathOr, reduce, toPairs } from "ramda";

const hasEffect = has("effect");
const hasTests = has("tests") as (arg1: any) => boolean;
const getTests = pathOr({}, ["effect", "tests"]);

// const getEquipmentEffects = reduce((acc: Tests[], equipment: Equipment) => {
//   if (hasEffect(equipment)) {
//     return acc.concat(getTests(equipment));
//   }

//   return acc;
// }, []) as (arg1: Equipment[]) => Tests[];

const getStatusEffects = reduce((acc: Partial<Tests>[], status: any) => {
  if (hasTests(status)) {
    // @ts-ignore
    return acc.concat(status.tests);
  }

  return acc;
}, []) as (arg1: any[]) => Tests[];

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
