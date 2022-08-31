import { addEquipment, dropEquipment } from "./equipment";
import { character } from "../../_testData/character";

describe("lib/character/equipment", () => {
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
});
