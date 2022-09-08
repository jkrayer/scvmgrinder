/// <reference types="svelte" />

type Tests = {
  agility: number;
  presence: number;
  strength: number;
  toughness: number;
  attack: number;
  defense: number;
};

type Status = {
  name: string;
  canCancel: boolean;
  description: string;
  tests: Tests;
};

type Effect = {
  description: string;
  tests: Partial<Tests>;
};

// EQUIPMENT TYPES

type CommonEquipmentProps = {
  name: string;
  description: string;
  equipped?: boolean;
  quantity?: CurrentMax;
  broken?: boolean;
};

type CommonWeaponProps = CommonEquipmentProps & {
  damageDie: string;
  type: "weapon";
  special?: string;
  handed?: 1 | 2;
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

type Weapon = MeleeWeapon | RangedWeapon;

type Armor = CommonEquipmentProps & {
  effect?: Effect;
  tier: CurrentMax;
  type: "armor";
};

type Shield = CommonEquipmentProps & {
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
  description: string;
};

type StandardEquipment = CommonEquipmentProps & {
  type: "equipment";
};

type Equipment =
  | Scroll
  | Armor
  | Shield
  | RangedWeapon
  | MeleeWeapon
  | Ammunition
  | Food
  | Potion
  | StandardEquipment;

// CHARACTER TYPES

type AbilityScoreName = "agility" | "presence" | "strength" | "toughness";

type AbilityScores = {
  agility: number;
  presence: number;
  strength: number;
  toughness: number;
};

type CurrentMax = {
  current: number;
  maximum: number;
};

type CharacterType = {
  _id: number;
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
  miseries?: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
  status: { [keys: string]: Status };
};

type ArmorAndShield = {
  armor: Armor | null;
  shield: Shield | null;
};

// MESSAGES
type MessageBody = {
  name: string;
  rollType: "To Hit" | "Damage" | "Test" | "Armor";
  roll: number;
  rollFormula: string;
  target: string;
  dc?: number;
};

type Message = {
  _id?: string;
  hidden?: boolean;
  campaignId: string; // room
  characterId: string; // sender
  message: MessageBody;
};
