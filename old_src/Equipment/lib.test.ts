import {
  parens,
  insertQuantity,
  formatListDescription,
  equipmentMax,
} from "./lib";

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
