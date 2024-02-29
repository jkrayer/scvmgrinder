import {
  rollD20,
  rollD12,
  rollD10,
  rollD8,
  rollD6,
  rollD4,
  rollNDice,
} from "./dice";

const inRange = (low: number, high: number) => (x: number) =>
  x > low && x < high;

describe("dice", () => {
  describe("d20", () => {
    test("it should be a number greater than 0 and less than 21", () => {
      expect(inRange(0, 21)(rollD20())).toBe(true);
    });
  });

  describe("d12", () => {
    test("it should be a number greater than 0 and less than 13", () => {
      expect(inRange(0, 13)(rollD12())).toBe(true);
    });
  });

  describe("d10", () => {
    test("it should be a number greater than 0 and less than 11", () => {
      expect(inRange(0, 11)(rollD10())).toBe(true);
    });
  });

  describe("d8", () => {
    test("it should be a number greater than 0 and less than 9", () => {
      expect(inRange(0, 9)(rollD8())).toBe(true);
    });
  });

  describe("d6", () => {
    test("it should be a number greater than 0 and less than 7", () => {
      expect(inRange(0, 7)(rollD6())).toBe(true);
    });
  });

  describe("d4", () => {
    test("it should be a number greater than 0 and less than 5", () => {
      expect(inRange(0, 5)(rollD4())).toBe(true);
    });
  });

  describe("rollNDice", () => {
    test("it should be a number greater than 1 and less than 9", () => {
      expect(inRange(1, 9)(rollNDice(2, rollD4)[0])).toBe(true);
      expect(inRange(1, 9)(rollNDice(2, rollD4)[0])).toBe(true);
      expect(inRange(1, 9)(rollNDice(2, rollD4)[0])).toBe(true);
    });
  });
});
