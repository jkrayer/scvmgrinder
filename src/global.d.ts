/// <reference types="svelte" />

type Abilities = {
  agility: number;
  presence: number;
  strength: number;
  toughness: number;
};

type CurrentMax = {
  maximum: number;
  current: number;
};

type CharacterClass = {
  name: "Esoteric Hermit" | "Fanged Deserter";
  abilities: string;
};

export type Tests = {
  agility: number;
  presence: number;
  strength: number;
  toughness: number;
  attack: number;
  defense: number;
};

export type Status = {
  name: string;
  description: string;
  duration?: number; // ms
};

type Effect = {
  description: string;
  tests: Partial<Tests>;
};

type CommonEquipmentProps = {
  equipped?: boolean;
  name: string;
  quantity?: number;
  weight: number;
};

export type Scroll = CommonEquipmentProps & {
  type: "scroll";
  subType: "unclean" | "sacred";
  description: string;
};

type Potion = CommonEquipmentProps & {
  description: string;
};

type Armor = CommonEquipmentProps & {
  effect?: Effect;
  tier: CurrentMax;
  type: "armor";
};

type Weapon = CommonEquipmentProps & {
  damageDie: string;
  type: "weapon";
  subType: "melee" | "ranged";
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

export type Equipment = Scroll | Armor | Weapon | Ammunition | Food | Potion;
type StatusTypes = Status | Scroll;

export type TCharacter = {
  _id: string;
  campaignId: string;
  name: string;
  silver: number;
  abilities: Abilities;
  hitpoints: CurrentMax;
  class: CharacterClass;
  tests: Tests;
  omens: CurrentMax;
  description: string;
  powers: null | number;
  equipment: Equipment[];
  status: StatusTypes[];
};