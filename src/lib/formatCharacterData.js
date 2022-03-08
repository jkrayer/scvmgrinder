import { compose, last, split } from "ramda";
import { toInt, rollString, roll } from "../lib";
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
    provisions,
    silver,
    agility,
    strength,
    presence,
    toughness,
    omens,
    hp = 1,
    armor,
    equipmentOne,
    equipmentThree,
    equipmentTwo,
    weapon,
    ...rest
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

    return [...acc, GETTERS[table](id)];
  }, []);

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
      current: rollString(omens),
    },
    abilities: {
      agility: toInt(agility),
      strength: toInt(strength),
      presence: toInt(presence),
      toughness: toInt(toughness),
    },
    equipment,
    provisions: {
      waterskin: true,
      daysOfWater: 4,
      daysOfFood: toInt(provisions),
    },
    silver: toInt(silver),
  };
};
