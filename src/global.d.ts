/// <reference types="svelte" />

// ***** Character Types *****

export type Abilities = {
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
  tests?: Partial<Tests>;
};

type Effect = {
  description: string;
  tests: Partial<Tests>;
};

type CommonEquipmentProps = {
  name: string;
  description?: string;
  equipped?: boolean;
  quantity?: number;
  weight?: number;
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

export type Weapon = CommonEquipmentProps & {
  damageDie: string;
  type: "weapon";
  subType: "melee" | "ranged";
  special?: string;
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
  | Weapon
  | Ammunition
  | Food
  | Potion
  | StandardEquipment;

export type StatusTypes = Status | Scroll;

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

// ***** Message Types *****

type Message = {
  _id: string;
  campaignId: string; // room
  characterId: string; // sender
  message: {
    name: string;
    rollType: "To Hit" | "Damage" | "Test";
    roll: number;
    rollFormula: string;
    target: string;
  };
};

// ***** Monster Types *****
type Monster = {
  name: string;
  description?: string;
  hp: number;
  morale: number;
  special?: string;
  armor: null | Armor;
  weapons: Weapon[];
};

type TrackerMonster = Monster & {
  _id: number;
  hitpoints: CurrentMax;
};

// ***** Treasure Types *****

type Treasure = {
  silver: number;
  items: Equipment[];
};

// ***** Handout Types *****

type ImageHandout = {
  name: string;
  type: "image";
  src: string;
};

// type TextHandout = {
//   name: string;
//   type: "text";
//   body: string;
// };

export type Handout = ImageHandout; //| TextHandout;

// ***** Map Types *****

type Map = {
  name: string;
  src: string;
};

// ***** Encounter Types *****

type Encounter = {
  name: string;
  description: string;
  table?: any[]; // Not sure what I'm doing with this
  treasure?: Treasure;
  encounter?: {
    number?: number;
    roll?: string;
    monster: Monster;
  };
};

// ***** Adventure Types *****

export type Adventure = {
  name: string;
  poster: string;
  backgroundColor: string;
  handouts: Handout[];
  tables: any[]; // Not sure what I'm doing with this
  maps: {
    player: Map[];
    dm: Map[];
  };
  encounters: Encounter[];
};

// ***** Tracker *****
export type TrackerSides = "players" | "monsters";

export type TTrackerStore = {
  players: TCharacter[];
};

export type TTrackerCmapaignData = {
  firstSide: TrackerSides;
  monsters: TrackerMonster[];
};

export type TTrackerData = TTrackerStore & TTrackerCmapaignData;

// ***** Campaign Types *****

export type Campaign = {
  _id: string;
  description: string;
  miseries: string[];
  name: string;
  system: string;
  trackerData: TTrackerCampaignData;
};
