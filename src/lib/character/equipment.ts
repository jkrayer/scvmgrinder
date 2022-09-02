// copied from src/CharacterSheet/*
import {
  __,
  assoc,
  both,
  compose,
  concat,
  either,
  filter,
  lens,
  over,
  pathEq,
  prop,
  propEq,
  reduce,
  view,
} from "ramda";
import { filterByName } from "./common";

const EQUIPMENT_KEY = "equipment";

const eqLens = lens<CharacterType, Equipment[]>(
  prop(EQUIPMENT_KEY),
  assoc(EQUIPMENT_KEY)
);

const getEquipment = view(eqLens);

const isEquipped = propEq("equipped", true);

//
export const addEquipment =
  (eq: Equipment) =>
  (
    character: CharacterType
  ): CharacterType => // @ts-ignore
    over(eqLens, concat(__, [eq]), character);

export const dropEquipment =
  ({ name }: Equipment) =>
  (character: CharacterType): CharacterType =>
    over(eqLens, filterByName<Equipment>(name), character);

// ARMOR
const isArmor = propEq<string>("type", "armor");

const isShield = propEq<string>("type", "shield");

const isMediumArmor = pathEq(["tier", "maximum"], 2) as (
  arg1: Armor
) => boolean;

const isHeavyArmor = pathEq(["tier", "maximum"], 3) as (arg1: Armor) => boolean;

const isMediumOrHeavyArmor = either(isMediumArmor, isHeavyArmor) as (
  arg1: Armor
) => boolean;

const isArmorOrShield = either(isArmor, isShield);

const isEquippedArmor = both(isEquipped, isArmorOrShield);

const equippedArmor = reduce<Equipment, ArmorAndShield>(
  (acc: ArmorAndShield, eq: Equipment) => {
    if (isEquippedArmor(eq)) {
      acc[eq.type] = eq;
    }

    return acc;
  },
  { armor: null, shield: null } as ArmorAndShield
);

export const getEquippedArmor = compose(equippedArmor, getEquipment) as (
  arg1: CharacterType
) => ArmorAndShield;

export const isEquippedMediumOrHeavyArmor = compose(
  isMediumOrHeavyArmor,
  prop("armor")
);

// WEAPONS
const isWeapon = propEq<string>("type", "weapon");

const isEquippedWeapon = both(isEquipped, isWeapon);

const isZweihander = propEq<string>("handed", 2);

const allEquippedWeapons = filter(isEquippedWeapon) as (
  arg1: Equipment[]
) => Weapon[];

export const getEquippedWeapons = compose(allEquippedWeapons, getEquipment) as (
  arg1: CharacterType
) => Weapon[];

export const isEquippedZweihander = reduce(
  (acc: boolean, eq: Weapon) => acc || isZweihander(eq),
  false
) as (arg1: Weapon[]) => boolean;
