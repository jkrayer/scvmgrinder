import type { Scroll, Weapon } from "../CharacterSheet/type";
import {
  testMessage,
  attackMessage,
  damageMessage,
  armorMessage,
  usePowerMessage,
} from "./lib";

const inRange = (low: number, high: number) => (x: number) =>
  x > low && x < high;

describe("test message", () => {
  test("it should return a test message", () => {
    const message = testMessage({
      name: "Roger",
      score: "strength",
      modifier: -1,
    });

    expect(message.name).toBe("Roger");
    expect(message.rollType).toBe("Test");
    expect(message.target).toBe("strength Test");
    expect(message.dc).toBe(null);
  });
});

describe("attack message", () => {
  test("it should return an attack message", () => {
    const message = attackMessage({ name: "Axe" } as Weapon, "Jessica", 2);

    expect(message.name).toBe("Jessica");
    expect(message.rollType).toBe("To Hit");
    expect(message.target).toBe("Axe");
    expect(message.dc).toBe(null);
  });
});

describe("damageMessage message", () => {
  test("it should return a damage message", () => {
    const message = damageMessage(
      { name: "Axe", damageDie: "1d6" } as Weapon,
      "Morty"
    );

    expect(message.name).toBe("Morty");
    expect(message.rollType).toBe("Damage");
    expect(message.rollFormula).toBe("1d6");
    expect(message.target).toBe("Axe");
    expect(message.dc).toBe(null);
  });
});

describe("armorMessage message", () => {
  test("it should return an armor message", () => {
    const message = armorMessage({ tier: 1, shield: false, name: "Rick" });

    expect(message.name).toBe("Rick");
    expect(message.rollType).toBe("Armor");
    expect(message.target).toBe("Damage resisted");
    expect(message.dc).toBe(null);
  });
});

describe("usePowerMessage message", () => {
  test("it should return a use power message", () => {
    const message = usePowerMessage("Beth", 1, 4, 12);

    expect(message.name).toBe("Beth");
    expect(message.rollType).toBe("Test");
    expect(message.roll).toBe(5);
    expect(message.rollFormula).toBe("4 + 1");
    expect(message.target).toBe("Failed Power Test");
    expect(message.dc).toBe(12);
  });
});
