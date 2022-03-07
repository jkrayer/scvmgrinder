import { compose, last, split } from "ramda";
import { toInt } from "../lib";
import { getWeapon, getArmor, getEquipment, getFollower } from "../data";

const GETTERS = {
  armor: getArmor,
  equipment: getEquipment,
  follower: getFollower,
  weapons: getWeapon,
  undefined: (x) => x,
};

export const formatCharacterData = (formData) => {
  const {
    name,
    agility,
    strength,
    presence,
    toughness,
    silver,
    provisions,
    hp = -1,
    armor,
    equipmentOne,
    equipmentThree,
    equipmentTwo,
    weapon,
  } = formData;

  const equipment = [
    armor,
    equipmentOne,
    equipmentThree,
    equipmentTwo,
    weapon,
  ].reduce((acc, tableId) => {
    if (tableId === "-1") return acc;

    const [table, id] = tableId.split(":");
    console.log(41, table, id);
    return [...acc, GETTERS[table](id)];
  }, []);

  return {
    name,
    description: "",
    class: {
      name: "",
      powers: [],
    },
    hitpoints: {
      maximum: hp,
      current: hp,
    },
    // omens: {
    //   die,
    //   current
    // },
    abilities: {
      agility,
      strength,
      presence,
      toughness,
    },
    equipment,
    provisions: {
      waterskin: true,
      daysOfWater: 4,
      daysOfFood: toInt(provisions),
    },
    silver,
  };
};
