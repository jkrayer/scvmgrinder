import { getBetter } from "./getBetter";
import { character } from "../../_testData/character";

describe("getBetter", () => {
  const copy: CharacterType = { ...character };
  const nextChar: CharacterType = getBetter(5, {
    agility: -2,
    presence: 2,
    strength: 1,
    toughness: -2,
  })(copy);

  test("it should not mutate the original data", () => {
    expect(copy).toMatchObject(character);
  });

  test("it should update current and maximum hit points", () => {
    expect(nextChar.hitpoints.current).toBe(6);
    expect(nextChar.hitpoints.maximum).toBe(6);
  });

  test("it should update ability scores", () => {
    expect(nextChar.abilities.agility).toBe(-2);
    expect(nextChar.abilities.presence).toBe(2);
    expect(nextChar.abilities.strength).toBe(1);
    expect(nextChar.abilities.toughness).toBe(-2);
  });
});
