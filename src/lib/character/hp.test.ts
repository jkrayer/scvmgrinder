import { updateHp, isBroken } from "./hp";
import { character } from "../../_testData/character";

const maxHp = character.hitpoints.maximum;

describe("lib/character/hp", () => {
  describe("updateHp", () => {
    const copy: CharacterType = { ...character };

    const result1: CharacterType = updateHp(-3)(copy);
    const result2: CharacterType = updateHp(7)(result1);

    test("it should not mutate the original data", () => {
      expect(copy).toMatchObject(character);
    });

    test("it should not mutate the maximum hp", () => {
      expect(result1.hitpoints.maximum).toBe(maxHp);
      expect(result2.hitpoints.maximum).toBe(maxHp);
    });

    test("it should subtract hp", () => {
      expect(result1.hitpoints.current).toBe(-1);
    });

    test("it should add hp but not exceed the maximum", () => {
      expect(result2.hitpoints.current).toBe(maxHp);
    });

    test("it should return a character object", () => {
      expect(result1.name).toBe("Brinta");
      expect(result1.silver).toBe(23);
    });
  });

  describe("isBroken", () => {
    const copy: CharacterType = { ...character };
    const result1: CharacterType = updateHp(-7)(copy);
    const result2: CharacterType = updateHp(-2)(copy);

    test("it should return false if current hit points are below 0", () => {
      expect(isBroken(result1)).toBe(false);
    });

    test("it should return true if current hit are exactly 0", () => {
      expect(isBroken(result2)).toBe(true);
    });
  });
});
