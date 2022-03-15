import { __, compose, filter, head } from "ramda";
import { rollString } from "../lib";
import equipment from "../data/equipment";

const getByName = compose(head, filter(__, equipment));

const waterskin = getByName(({ name }) => name === "Waterskin");
const food = getByName(({ name }) => name === "Dried food");

const parseEquipment = (arr, quantity) => {
  const equipment = [waterskin, { ...food, quantity }];
  const followers = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "-1" && arr[i] !== undefined) {
      const json = JSON.parse(arr[i]);

      json.forEach((a) =>
        a.type === "follower" ? followers.push(a) : equipment.push(equipment)
      );
    }
  }

  return { equipment, followers };
};

export const formatCharacterData = (formData) => {
  const { food, hitpoints, omens, ...rest } = formData;

  // const tables = [
  //   armor,
  //   weapons,
  //   classEquipment,
  //   equipmentOne,
  //   equipmentTwo,
  //   equipmentThree,
  // ];

  return {
    ...rest,
    hitpoints: {
      maximum: hitpoints,
      current: hitpoints,
    },
    omens: {
      die: omens,
      maximum: omens,
      current: rollString(`1d${omens}`),
    },
    powers: rollString(`1d4+${rest.abilities.presence}`),
    // ...parseEquipment(tables, nanSafeInt(provisions)),
  };
};
