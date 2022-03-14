import { __, compose, filter, head } from "ramda";
import { nanSafeInt, rollString, getDie } from "../lib";
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
  const {
    provisions,
    silver,
    agility,
    strength,
    presence,
    toughness,
    omens,
    hp = 1,
    armor,
    classEquipment,
    equipmentOne,
    equipmentThree,
    equipmentTwo,
    weapons,
    ...rest
  } = formData;

  const tables = [
    armor,
    weapons,
    classEquipment,
    equipmentOne,
    equipmentTwo,
    equipmentThree,
  ];

  return {
    ...rest,
    description: "",
    // className
    // clasAbuilities?
    class: {
      name: "",
      powers: [],
    },
    hitpoints: {
      maximum: hp,
      current: hp,
    },
    omens: {
      die: omens,
      maximum: getDie(omens),
      current: rollString(omens),
    },
    abilities: {
      agility: nanSafeInt(agility),
      strength: nanSafeInt(strength),
      presence: nanSafeInt(presence),
      toughness: nanSafeInt(toughness),
    },
    ...parseEquipment(tables, nanSafeInt(provisions)),
    silver: nanSafeInt(silver),
  };
};
