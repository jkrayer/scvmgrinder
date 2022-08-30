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
