import { formatManagertDescription } from "./lib";

describe("formatManagertDescription", () => {
  test("case:food it should be a composition of insertQuantity", () => {
    expect(
      formatManagertDescription({
        _id: "Waterskin_1818181",
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
        _id: "Bow_837373",
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
        _id: "Arrow_2837363",
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
