import { filterByName, getAbilityScore } from "./common";
import { character } from "../../_testData/character";

describe("lib/character/common", () => {
  describe("filterByName", () => {
    const deleteFred = filterByName("Fred");
    const fredArr = [
      { name: "Fred", age: 23 },
      { name: "Karl", age: 25 },
      { name: "Fred", age: 21 },
    ];
    const result = deleteFred(fredArr);

    test("it should return a function", () => {
      expect(deleteFred).toBeInstanceOf(Function);
    });

    test("it return a new array where all matching names have been removed", () => {
      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({ name: "Karl", age: 25 });
    });

    test("it should not mutate the original array", () => {
      expect(fredArr.length).toBe(3);
      expect(fredArr[0]).toMatchObject({ name: "Fred", age: 23 });
    });
  });

  describe("getAbilityScore", () => {
    test("it should return a given score", () => {
      expect(getAbilityScore(character, "strength")).toBe(2);
    });

    test("it should return undefined if given the wrong score", () => {
      // @ts-ignore
      expect(getAbilityScore(character, "strengt")).toBe(undefined);
    });
  });
});
