import { parseRollString } from ".";

describe("parseRollString", () => {
  test("it should return the correct roll forumla", () => {
    expect(parseRollString("3d6")).toMatchObject([3, "d", 6, "+", 0]);
  });
});
