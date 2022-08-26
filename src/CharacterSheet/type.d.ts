import type { type } from "ramda";

export type CurrentMax = {
  current: number;
  maximum: number;
};

type CharacterClass = {
  name: string;
  abilities: string;
};

export type AbilityScoreName =
  | "agility"
  | "presence"
  | "strength"
  | "toughness";

export type AbilityScores = {
  agility: number;
  presence: number;
  strength: number;
  toughness: number;
};

type CommonEquipmentProps = {
  name: string;
  description: string;
  equipped?: boolean;
  quantity?: CurrentMax;
  weight?: number;
  broken?: boolean;
};

type CommonWeaponProps = CommonEquipmentProps & {
  damageDie: string;
  type: "weapon";
  special?: string;
};

type MeleeWeapon = CommonWeaponProps & {
  subType: "melee";
};

type AmmunitionTypes = "arrow" | "bolt";

type Ammunition = CommonEquipmentProps & {
  type: "ammunition";
  subType: AmmunitionTypes;
};

type RangedWeapon = CommonWeaponProps & {
  subType: "ranged";
  ammunitionType: AmmunitionTypes;
  ammunitionName: "Arrow(s)" | "Bolt(s)";
};

export type Weapon = MeleeWeapon | RangedWeapon;

export type Armor = CommonEquipmentProps & {
  effect?: Effect;
  tier: CurrentMax;
  type: "armor";
};

export type Shield = CommonEquipmentProps & {
  type: "shield";
};

type Scroll = CommonEquipmentProps & {
  type: "scroll";
  subType: "unclean" | "sacred";
  description: string;
};

type Potion = CommonEquipmentProps & {
  type: "potion";
  description: string;
};

type Food = CommonEquipmentProps & {
  type: "food";
  subtype?: string;
  description: string;
};

type StandardEquipment = CommonEquipmentProps & {
  type: "equipment";
};

export type Equipment =
  | Scroll
  | Armor
  | Shield
  | RangedWeapon
  | MeleeWeapon
  | Ammunition
  | Food
  | Potion
  | StandardEquipment;

export type CharacterType = {
  _id: string;
  campaignId: string;
  name: string;
  silver: number;
  abilities: AbilityScores;
  hitpoints: CurrentMax;
  class: any; // CharacterClass;
  tests: any; // Tests;
  omens: CurrentMax;
  description: string;
  powers: null | number;
  equipment: Equipment[];
  status: any[]; // StatusTypes[];
  miseries?: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
};

export type ArmorAndShield = { armor?: Armor; shield?: Shield };
