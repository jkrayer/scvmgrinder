import { compose, last, split } from "ramda";
import { nanSafeInt, rollString, roll } from "../lib";
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
    classEquipment,
    equipmentOne,
    equipmentThree,
    equipmentTwo,
    weapon,
    ...rest
  } = formData;

  const equipment = [
    armor,
    weapon,
    classEquipment,
    equipmentOne,
    equipmentTwo,
    equipmentThree,
  ].reduce((acc, val) => {
    if (val === "-1" || val === undefined) return acc;

    return [...acc, JSON.parse(val)];
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
      agility: nanSafeInt(agility),
      strength: nanSafeInt(strength),
      presence: nanSafeInt(presence),
      toughness: nanSafeInt(toughness),
    },
    equipment,
    provisions: {
      waterskin: true,
      daysOfWater: 4,
      daysOfFood: nanSafeInt(provisions),
    },
    silver: nanSafeInt(silver),
  };
};
