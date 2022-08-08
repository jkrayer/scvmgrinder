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
  equipment: any[]; // Equipment[];
  status: any[]; // StatusTypes[];
};
