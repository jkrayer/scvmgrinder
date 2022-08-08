import type { CharacterType } from "./type";
import { incrementHp, useOmen, setOmens, incrementSilver } from "./lib";

describe("incrementHp", () => {
  const hp = { hitpoints: { current: 3, maximum: 6 } } as CharacterType;

  test("it should increase hp", () => {
    expect(incrementHp(2)(hp)).toMatchObject({
      hitpoints: { current: 5, maximum: 6 },
    });
  });

  test("it should decrease hp", () => {
    expect(incrementHp(-2)(hp)).toMatchObject({
      hitpoints: { current: 1, maximum: 6 },
    });
  });

  test("it should not increase hp higher than the maximum", () => {
    expect(incrementHp(27)(hp)).toMatchObject({
      hitpoints: { current: 6, maximum: 6 },
    });
  });
});

describe("omens", () => {
  const omens = { omens: { current: 2, maximum: 4 } } as CharacterType;

  describe("useOmen", () => {
    test("it should decrease omens by 1", () => {
      expect(useOmen()(omens)).toMatchObject({
        omens: { current: 1, maximum: 4 },
      });
    });

    test("it should not decrease omens less than 0", () => {
      expect(
        useOmen()({ omens: { current: 0, maximum: 4 } } as CharacterType)
      ).toMatchObject({
        omens: { current: 0, maximum: 4 },
      });
    });
  });

  describe("setOmens", () => {
    test("it should set the provided number", () => {
      expect(setOmens(3)(omens)).toMatchObject({
        omens: { current: 3, maximum: 4 },
      });
    });

    test("it should not set a number greater than the maximum", () => {
      expect(setOmens(6)(omens)).toMatchObject({
        omens: { current: 4, maximum: 4 },
      });
    });
  });
});

describe("inrementSilver", () => {
  const silver = { silver: 50 } as CharacterType;

  test("it should increase silver", () => {
    expect(incrementSilver(10)(silver)).toMatchObject({
      silver: 60,
    });
  });

  test("it should decrease silver", () => {
    expect(incrementSilver(-10)(silver)).toMatchObject({
      silver: 40,
    });
  });

  test("it should not decrease silver below 0", () => {
    expect(incrementSilver(-60)(silver)).toMatchObject({
      silver: 0,
    });
  });
});
