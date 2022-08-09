import type { type } from "ramda";

export type CurrentMax = {
  current: number;
  maximum: number;
};

type CharacterClass = {
  name: string;
  abilities: string;
};

export type AbilityScores = {
  agility: number;
  presence: number;
  strength: number;
  toughness: number;
};

type CommonEquipmentProps = {
  name: string;
  description?: string;
  equipped?: boolean;
  quantity?: number;
  weight?: number;
  broken?: boolean;
};

export type Weapon = CommonEquipmentProps & {
  damageDie: string;
  type: "weapon";
  subType: "melee" | "ranged";
  special?: string;
};

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

type Ammunition = CommonEquipmentProps & {
  type: "ammunition";
  subType?: string;
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
  | Weapon
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
  equipmentTwo: {
    weapons: Weapon[];
    armor: Array<Armor | Shield>;
    scrolls: Scroll[];
    food: {
      waterskin: number;
      food: number;
    };
    equipment: string[];
  };
};

export type ArmorAndShield = { armor?: Armor; shield?: Shield };
