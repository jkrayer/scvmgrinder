import type { ValueObject } from "../components/Form/types";

export const EQUIPMENT_TYPES: ValueObject[] = [
  {
    label: "Equipment",
    value: "equipment",
  },
  {
    label: "Food",
    value: "food",
  },
  {
    label: "Weapon",
    value: "weapon",
  },
  {
    label: "Ammunition",
    value: "ammunition",
  },
  {
    label: "Armor",
    value: "armor",
  },
  {
    label: "Shield",
    value: "shield",
  },
  {
    label: "Scroll",
    value: "scroll",
  },
  {
    label: "Potion",
    value: "Potion",
  },
];

export const AMMUNITION_TYPES: ValueObject[] = [
  {
    label: "Arrow",
    value: "arrow",
  },
  {
    label: "Bolt",
    value: "bolt",
  },
];

export const WEAPON_TYPES: ValueObject[] = [
  {
    label: "Melee",
    value: "melee",
  },
  {
    label: "Ranged",
    value: "ranged",
  },
];

export const SCROLL_TYPES: ValueObject[] = [
  {
    label: "Clean",
    value: "clean",
  },
  {
    label: "Unclean",
    value: "unclean",
  },
];

export const ARMOR_TIER_TYPES: ValueObject[] = [
  {
    label: "Tier 1",
    value: 1,
  },
  {
    label: "Tier 2",
    value: 2,
  },
  {
    label: "Tier 3",
    value: 3,
  },
];

export const DEFAULT_SUBTYPES = {
  ammunition: "arrow",
  weapon: "melee",
  scroll: "clean",
};

export const DAMAGE_DICE_TYPES: ValueObject[] = [
  {
    label: "d2",
    value: "1d2",
  },
  {
    label: "d4",
    value: "1d4",
  },
  {
    label: "d6",
    value: "1d6",
  },
  {
    label: "d8",
    value: "1d8",
  },
  {
    label: "d10",
    value: "1d10",
  },
];
