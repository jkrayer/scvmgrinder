import {
  parens,
  insertQuantity,
  formatListDescription,
  formatManagertDescription,
} from "./lib";
import type { Equipment } from "../type";

describe("parens", () => {
  test("it should add parens when the first character is not '(", () => {
    expect(parens("some string")).toBe("(some string)");
    expect(parens("(some string")).toBe("(some string");
  });

  test("it should not add parens when the first character is 'undefined'", () => {
    expect(parens("")).toBe("");
  });
});

describe("insertQuantity", () => {
  test("it should add quantity to the '%' character", () => {
    expect(
      insertQuantity({
        description: "quantity is %",
        quantity: { maximum: 4, current: 1 },
      } as Equipment)
    ).toBe("quantity is 1");
  });

  test("it should not add quantity if the '%' character is not in the description", () => {
    expect(
      insertQuantity({
        description: "quantity is",
        quantity: { maximum: 4, current: 1 },
      } as Equipment)
    ).toBe("quantity is");
  });

  test("it should not add quantity if quantity is not in the equipment", () => {
    expect(
      insertQuantity({
        description: "quantity is %",
      } as Equipment)
    ).toBe("quantity is %");
  });
});

describe("formatListDescription", () => {
  test("it should be a composition of insertQuantity and parens", () => {
    expect(
      formatListDescription({
        description: "quantity is %",
        quantity: { maximum: 4, current: 1 },
      } as Equipment)
    ).toBe("(quantity is 1)");
  });
});

describe("formatManagertDescription", () => {
  test("case:food it should be a composition of insertQuantity", () => {
    expect(
      formatManagertDescription({
        type: "food",
        name: "Waterskin",
        description: "and % day's worth of food",
        quantity: {
          maximum: 5,
          current: 1,
        },
      })
    ).toBe("and 1 day's worth of food");
  });

  test("case:ranged weapon it should add number of ammo ", () => {
    expect(
      formatManagertDescription({
        type: "weapon",
        name: "Bow",
        description: "and % arrows 1d6 damage",
        damageDie: "1d6",
        subType: "ranged",
        equipped: true,
        ammunitionType: "arrow",
        ammunitionName: "Arrow(s)",
        quantity: {
          current: 10,
          maximum: 20,
        },
      })
    ).toBe(" and 10 Arrow(s)");
  });

  test("case:countable should be a min/max string", () => {
    expect(
      formatManagertDescription({
        type: "ammunition",
        subType: "arrow",
        name: "Arrow",
        description: "",
        quantity: {
          maximum: 20,
          current: 11,
        },
      })
    ).toBe("11 / 20");
  });
});
