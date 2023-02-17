import { getBetter } from "./getBetter";
import { character } from "../../_testData/character";

const scroll = Object.freeze({
  _id: "1hEUOlxuvuMNNgVi",
  name: "Grace of a Dead Saint",
  type: "scroll",
  subType: "sacred",
  description: "d2 creatures regain d10 HP each.",
  equipped: false,
  price: 50,
});

describe("getBetter", () => {
  const copy: CharacterType = { ...character };
  const nextChar: CharacterType = getBetter(
    6,
    {
      agility: -2,
      presence: 2,
      strength: 1,
      toughness: -2,
    },
    22,
    [scroll]
  )(copy);

  test("it should not mutate the original data", () => {
    expect(copy).toMatchObject(character);
  });

  test("it should update the maximum hit points to the new total", () => {
    expect(nextChar.hitpoints.maximum).toBe(6);
  });

  test("it should update the current hit points by the amount of new hit points", () => {
    expect(nextChar.hitpoints.current).toBe(5);
  });

  test("it should update ability scores", () => {
    expect(nextChar.abilities.agility).toBe(-2);
    expect(nextChar.abilities.presence).toBe(2);
    expect(nextChar.abilities.strength).toBe(1);
    expect(nextChar.abilities.toughness).toBe(-2);
  });

  test("it should update silver", () => {
    expect(nextChar.silver).toBe(45);
  });

  test("it should update silver equipment", () => {
    expect(nextChar.equipment[9]).toMatchObject(scroll);
  });
});

describe("getBetter, hp adjusting down", () => {
  const copy: CharacterType = { ...character };
  const nextChar: CharacterType = getBetter(
    100,
    {
      agility: -2,
      presence: 2,
      strength: 1,
      toughness: -2,
    },
    22,
    [scroll]
  )(copy);

  const downChar: CharacterType = getBetter(
    57,
    {
      agility: -2,
      presence: 2,
      strength: 1,
      toughness: -2,
    },
    22,
    [scroll]
  )(nextChar);

  test("it should update the maximum hit points to the new total", () => {
    expect(nextChar.hitpoints.maximum).toBe(100);
  });

  test("it should update the current hit points by the amount of new hit points", () => {
    expect(downChar.hitpoints.current).toBe(56);
  });
});
