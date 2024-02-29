import { setStatus, deleteStatus, isEncumbered } from "./status";
import { ENCUMBERED } from "../game_constants/status";
import { character } from "../../_testData/character";

describe("lib/character/status", () => {
  describe("isEncumbered", () => {
    const copy: CharacterType = { ...character };
    copy.equipment = copy.equipment.concat(copy.equipment);

    test("it should be unencumbered", () => {
      expect(isEncumbered(character)).toBe(false);
    });

    test("it should be encumbered", () => {
      expect(isEncumbered(copy)).toBe(true);
    });
  });

  describe("setStatus", () => {
    const copy: CharacterType = { ...character };
    const result: CharacterType = setStatus(ENCUMBERED)(copy);

    test("it should not mutate the original data", () => {
      expect(copy).toMatchObject(character);
    });

    test("it should add the new status", () => {
      const lastIndex: number = result.equipment.length - 1;

      expect(result.status.Encumbered).not.toBe(undefined);
      expect(result.status.Encumbered).toMatchObject(ENCUMBERED);
    });

    test("it should return a character object", () => {
      expect(result.name).toBe("Brinta");
      expect(result.silver).toBe(23);
    });
  });

  describe("deleteStatus", () => {
    const copy: CharacterType = { ...character };
    const result: CharacterType = deleteStatus(ENCUMBERED)(copy);

    test("it should not mutate the original data", () => {
      expect(copy).toMatchObject(character);
    });

    test("it should remove the provided status", () => {
      expect(result.status.Encumbered).toBe(undefined);
    });

    test("it should return a character object", () => {
      expect(result.name).toBe("Brinta");
      expect(result.silver).toBe(23);
    });
  });
});
