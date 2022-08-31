import type { Armor, Equipment, Weapon } from "./type";
import {
  incrementHp,
  useOmen,
  setOmens,
  incrementSilver,
  getEquipment,
  isEquipped,
  isWeapon,
  isArmor,
  isScroll,
  getEquippedWeapons,
  getEquippedArmor,
  equipmentToggle,
} from "./lib";

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

describe("Equipment Tests", () => {
  const armor: Armor = {
    name: "Scale armor",
    type: "armor",
    description: "",
    tier: { current: 2, maximum: 2 },
    equipped: true,
    broken: true,
    effect: {
      description: "DR +2 on Agility tests including defence",
      tests: { agility: 2, defense: 2 },
    },
  };
  const leatherArmor: Armor = { ...armor, name: "Leather Armor" };

  const eq = {
    silver: 10,
    equipment: [
      { type: "equipment", name: "Waterskin and 2 day's worth of food" },
      {
        name: "Warhammer",
        damageDie: "1d6",
        type: "weapon",
        subType: "melee",
        equipped: true,
        broken: false,
      },
      {
        name: "Sword",
        damageDie: "1d8",
        type: "weapon",
        subType: "melee",
        equipped: false,
        broken: false,
      },
      armor,
    ],
  } as CharacterType;
  const weapon: Weapon = {
    name: "Axe",
    description: "",
    type: "weapon",
    damageDie: "1d6",
    subType: "melee",
  };

  describe("getEquipment", () => {
    test("it should get equipment", () => {
      expect(getEquipment(eq)).toMatchObject(eq.equipment);
    });

    test("it should return [] if euipment is not found", () => {
      expect(getEquipment({} as CharacterType)).toMatchObject([]);
    });
  });

  describe("isEquipped", () => {
    test("it should be true when equipped is true", () => {
      expect(isEquipped({ ...weapon, equipped: true })).toBe(true);
    });

    test("it should be false when equipped is not boolean true", () => {
      expect(isEquipped(weapon)).toBe(false);
    });
  });

  describe("isWeapon", () => {
    test("it should return true if type is weapon", () => {
      expect(isWeapon(weapon)).toBe(true);
    });

    test("it should return false if type is not weapon", () => {
      expect(isWeapon({ ...weapon, type: "armor" })).toBe(false);
    });
  });

  describe("isArmor", () => {
    test("it should return true if type is weapon or shield", () => {
      expect(isArmor({ ...weapon, type: "armor" })).toBe(true);
      expect(isArmor({ ...weapon, type: "shield" })).toBe(true);
    });

    test("it should return false if type is not armor or shield", () => {
      expect(isArmor(weapon)).toBe(false);
    });
  });

  describe("isScroll", () => {
    test("it should return true if the type of equpment equals 'scroll'", () => {
      expect(isScroll({ ...weapon, type: "scroll" })).toBe(true);
    });

    test("it should return false if the type of equipment is not 'scroll", () => {
      expect(isScroll(weapon)).toBe(false);
      expect(isScroll(armor)).toBe(false);
    });
  });

  describe("getEquippedWeapons", () => {
    test("it should return equipped weapons", () => {
      expect(getEquippedWeapons(eq)).toMatchObject([eq.equipment[1]]);
    });
  });

  describe("getEquippedArmor", () => {
    test("it should return object of nulls if no armor or shield is found", () => {
      expect(
        getEquippedArmor({ equipment: [] } as CharacterType)
      ).toMatchObject({ armor: null, shield: null });
    });

    test("it should return armor and shield if they're found", () => {
      expect(getEquippedArmor(eq)).toMatchObject({
        armor: armor,
        shield: null,
      });
    });

    test("it should return the last equipped armor", () => {
      expect(
        getEquippedArmor({ ...eq, equipment: [...eq.equipment, leatherArmor] })
      ).toMatchObject({
        armor: { ...armor, name: "Leather Armor" },
        shield: null,
      });
    });
  });

  describe("equipmentToggle", () => {
    const copyEq = { ...eq, equipment: [armor, weapon] };

    test("it should toggle the equipped state ftom true to false and back", () => {
      expect(
        equipmentToggle({ name: "Axe" } as Equipment)(copyEq)
      ).toMatchObject({
        ...eq,
        equipment: [armor, { ...weapon, equipped: true }],
      });
    });
  });
});

// describe("equipmentDrop", () => {
//   test("it should remove the names piece of equipment", () => {
//     expect(
//       equipmentDrop({ name: "Warhammer" } as Equipment)(eq).equipment.length
//     ).toBe(3);
//   });
// });
