import {
  addEquipment,
  dropEquipment,
  getEquippedArmor,
  isEquippedMediumOrHeavyArmor,
  getEquippedWeapons,
  isEquippedZweihander,
  breakWeaponsAndArmor,
} from "./equipment";
import { character } from "../../_testData/character";

describe("lib/character/equipment", () => {
  const scaleArmor: Armor = {
    name: "Scale armor",
    type: "armor",
    description: "",
    tier: { current: 2, maximum: 2 },
    equipped: true,
    broken: false,
  };

  describe("addEquipment", () => {
    const copy: CharacterType = { ...character };
    const newEq: Equipment = {
      type: "equipment",
      name: "Test Equipment",
      description: "A piece of equipment",
    };

    const result: CharacterType = addEquipment(newEq)(copy);

    test("it should not mutate the original data", () => {
      expect(copy).toMatchObject(character);
    });

    test("it should add the new equipment", () => {
      const lastIndex: number = result.equipment.length - 1;
      expect(result.equipment[lastIndex]).toMatchObject(newEq);
    });

    test("it should return a character object", () => {
      expect(result.name).toBe("Brinta");
      expect(result.silver).toBe(23);
    });
  });

  describe("dropEquipment", () => {
    const copy: CharacterType = { ...character };
    const armor: Armor = {
      type: "armor",
      name: "Padded cloth armor",
      description: "tier 1",
      tier: {
        current: 1,
        maximum: 1,
      },
      equipped: true,
    };

    const result: CharacterType = dropEquipment(armor)(copy);

    test("it should not mutate the original data", () => {
      expect(copy).toMatchObject(character);
    });

    test("it should drop the given equipment", () => {
      expect(result.equipment.length).toBe(8);
      expect(result.equipment[3]).toMatchObject({
        type: "shield",
        name: "Kite Shield",
        description: "",
        equipped: true,
      });
    });

    test("it should return a character object", () => {
      expect(result.name).toBe("Brinta");
      expect(result.silver).toBe(23);
    });
  });

  describe("getEquippedArmor", () => {
    const kiteShield = {
      type: "shield",
      name: "Kite Shield",
      description: "",
      equipped: true,
    };

    test("it should return object of nulls if no armor or shield is found", () => {
      expect(
        getEquippedArmor({ equipment: [] } as CharacterType)
      ).toMatchObject({ armor: null, shield: null });
    });

    test("it should return armor and shield if they're found", () => {
      expect(getEquippedArmor(character)).toMatchObject({
        armor: {
          type: "armor",
          name: "Padded cloth armor",
          description: "tier 1",
          tier: {
            current: 1,
            maximum: 1,
          },
          equipped: true,
        },
        shield: kiteShield,
      });
    });

    test("it should return the last equipped armor", () => {
      const copy: CharacterType = { ...character };
      copy.equipment.push(scaleArmor);

      expect(getEquippedArmor(copy)).toMatchObject({
        armor: scaleArmor,
        shield: kiteShield,
      });
    });
  });

  describe("isEquippedMediumOrHeavyArmor", () => {
    test("it should return false when armor is null", () => {
      expect(
        isEquippedMediumOrHeavyArmor({ armor: null } as ArmorAndShield)
      ).toBe(false);
    });

    test("it should return false when the armor tier < 2", () => {
      const x = {
        armor: { tier: { current: 1, maximum: 0 } },
      } as ArmorAndShield;
      const y = {
        armor: { tier: { current: 1, maximum: 1 } },
      } as ArmorAndShield;

      expect(isEquippedMediumOrHeavyArmor(x)).toBe(false);
      expect(isEquippedMediumOrHeavyArmor(y)).toBe(false);
    });

    test("it should return true when the armor tier > 1", () => {
      const x = {
        armor: { tier: { current: 1, maximum: 3 } },
      } as ArmorAndShield;
      const y = {
        armor: { tier: { current: 1, maximum: 3 } },
      } as ArmorAndShield;

      expect(isEquippedMediumOrHeavyArmor(x)).toBe(true);
      expect(isEquippedMediumOrHeavyArmor(y)).toBe(true);
    });
  });

  describe("getEquippedWeapons", () => {
    test("it should return equipped weapons", () => {
      const copy: CharacterType = { ...character };
      copy.equipment.push({
        type: "weapon",
        name: "Sword",
        description: "1d6 damage",
        damageDie: "1d6",
        subType: "melee",
        equipped: false,
      });

      expect(getEquippedWeapons(character)).toMatchObject([
        {
          type: "weapon",
          name: "Femur",
          description: "1d4 damage",
          damageDie: "1d4",
          subType: "melee",
          equipped: true,
        },
        {
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
        },
      ]);
    });
  });

  describe("isEquippedZweihander", () => {
    test("it should return false if no zweihand weapons are equipped", () => {
      expect(isEquippedZweihander(getEquippedWeapons(character))).toBe(false);
    });

    test("it should return true if at least one zweihand weapon is equipped", () => {
      const weapons: Weapon[] = getEquippedWeapons(character);
      weapons.splice(1, 0, {
        type: "weapon",
        name: "Zweihander",
        description: "1d10 damage",
        damageDie: "1d10",
        subType: "melee",
        equipped: true,
        handed: 2,
      });

      expect(isEquippedZweihander(weapons)).toBe(true);
    });
  });

  describe("breakWeaponsAndArmor", () => {
    test("it should break weapons", () => {
      const breakFemur = breakWeaponsAndArmor({
        type: "weapon",
        name: "Femur",
        description: "1d4 damage",
        damageDie: "1d4",
        subType: "melee",
        equipped: true,
      })(character);

      expect(breakFemur.equipment[1]).toMatchObject({
        type: "weapon",
        name: "Femur",
        description: "1d4 damage",
        damageDie: "1d4",
        subType: "melee",
        equipped: true,
        broken: true,
      });
    });

    test("it should reduce armor tier without breaking it", () => {
      const copy: CharacterType = { ...character };
      copy.equipment = copy.equipment.concat(scaleArmor);

      const breakArmor = breakWeaponsAndArmor(scaleArmor)(character);

      expect(breakArmor.equipment[9]).toMatchObject({
        name: "Scale armor",
        type: "armor",
        description: "",
        tier: { current: 1, maximum: 2 },
        equipped: true,
        broken: false,
      });
    });

    test("it should break armor when tier is reduced to 0", () => {
      const breakArmor = breakWeaponsAndArmor({
        type: "armor",
        name: "Padded cloth armor",
        description: "tier 1",
        tier: {
          current: 1,
          maximum: 1,
        },
        equipped: true,
      })(character);

      expect(breakArmor.equipment[3]).toMatchObject({
        type: "armor",
        name: "Padded cloth armor",
        description: "tier 1",
        tier: {
          current: 0,
          maximum: 1,
        },
        equipped: true,
        broken: true,
      });
    });

    test("it should diminish ammunition", () => {
      const ammo = breakWeaponsAndArmor({
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
      })(character);

      expect(ammo.equipment[2].quantity.current).toBe(9);
    });

    test("it should not break other equipment", () => {
      const FOOD = {
        type: "food",
        name: "Waterskin",
        description: "and % day's worth of food",
        quantity: {
          maximum: 5,
          current: 1,
        },
      };
      const breakFood = breakWeaponsAndArmor(FOOD)(character);

      expect(breakFood.equipment[0]).toMatchObject(FOOD);
    });
  });
});
