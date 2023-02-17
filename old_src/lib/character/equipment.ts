import {
  __,
  assoc,
  assocPath,
  both,
  compose,
  concat,
  dec,
  either,
  filter,
  identity,
  ifElse,
  lens,
  over,
  path,
  pathEq,
  prop,
  propEq,
  reduce,
  view,
} from "ramda";
import { filterById, replaceById } from "./common";
import { NO_ARMOR } from "../game_constants";

const EQUIPMENT_KEY = "equipment";
const CURRENT_QUANTITY = ["quantity", "current"];
const CURRENT_TIER = ["tier", "current"];

const eqLens = lens<CharacterType, Equipment[]>(
  prop(EQUIPMENT_KEY),
  assoc(EQUIPMENT_KEY)
);

const getEquipment = view(eqLens);

const quantityLens = lens<Equipment, number>(
  path(CURRENT_QUANTITY),
  assocPath(CURRENT_QUANTITY)
);

const decrementQuantity = over(quantityLens, dec);

const tierLens = lens<Armor, number>(
  path(CURRENT_TIER),
  assocPath(CURRENT_TIER)
);

const decrementTier = over(tierLens, dec);

const isEquipped = propEq("equipped", true);

//
export const addEquipment =
  (eq: Equipment) =>
  (
    character: CharacterType
  ): CharacterType => // @ts-ignore
    over(eqLens, concat(__, [eq]), character);

export const dropEquipment =
  ({ _id }: Equipment) =>
  (character: CharacterType): CharacterType =>
    over(eqLens, filterById<Equipment>(_id), character);

const updateEquipment =
  (eq: Equipment) =>
  (character: CharacterType): CharacterType =>
    over(eqLens, replaceById<Equipment>(eq), character);

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

const equippedArmor = (x) =>
  reduce<Equipment, ArmorAndShield>(
    (acc: ArmorAndShield, eq: Equipment) => {
      if (isEquippedArmor(eq)) {
        acc[eq.type] = eq;
      }

      return acc;
    },
    {
      armor: NO_ARMOR,
      shield: null,
    } as ArmorAndShield,
    x
  );

const breakArmor = (a: Armor): Armor => {
  const next: Armor = decrementTier(a);

  if (next.tier.current === 0) {
    next.broken = true;
  }

  return next;
};

export const getEquippedArmor = compose(equippedArmor, getEquipment) as (
  arg1: CharacterType
) => ArmorAndShield;

export const isEquippedMediumOrHeavyArmor = compose(
  isMediumOrHeavyArmor,
  prop("armor")
) as (arg1: ArmorAndShield) => boolean;

// WEAPONS
const isWeapon = propEq<string>("type", "weapon");

const isEquippedWeapon = both(isEquipped, isWeapon);

const isZweihander = propEq<string>("handed", 2);

const isRangedWeapon = propEq<string>("subType", "ranged");

const allEquippedWeapons = filter(isEquippedWeapon) as (
  arg1: Equipment[]
) => Weapon[];

const breakWeapon = (w: Weapon): Weapon => ({ ...w, broken: true });

export const getEquippedWeapons = compose(allEquippedWeapons, getEquipment) as (
  arg1: CharacterType
) => Weapon[];

export const isEquippedZweihander = reduce(
  (acc: boolean, eq: Weapon) => acc || isZweihander(eq),
  false
) as (arg1: Weapon[]) => boolean;

// BREAK EQUIPMENT
const breakWeaponOrArmor = ifElse(isArmor, breakArmor, breakWeapon) as (
  arg1: Weapon | Armor
) => Weapon | Armor;

const breakEquipment = ifElse(
  isRangedWeapon,
  decrementQuantity,
  breakWeaponOrArmor
) as (arg1: Weapon | Armor) => Weapon | Armor;

const isWeaponOrArmor = either(isWeapon, isArmorOrShield);

export const breakWeaponsAndArmor = compose(
  updateEquipment,
  ifElse(isWeaponOrArmor, breakEquipment, identity)
);
