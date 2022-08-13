import type { MessageBody } from "./types";
import type { Weapon, Scroll } from "../CharacterSheet/type";
import {
  rollD2,
  rollD4,
  rollD6,
  rollD8,
  rollD10,
  rollD12,
  rollD20,
} from "../lib/dice";

const sign = (x: number) => (x < 0 ? "-" : "+");

const SINGLES = Object.freeze({
  "0": () => 0,
  "1d2": rollD2,
  "1d4": rollD4,
  "1d6": rollD6,
  "1d8": rollD8,
  "1d10": rollD10,
  "1d12": rollD12,
  "1d20": rollD20,
});

export const testMessage = ({
  name,
  score,
  modifier,
}: {
  name: string;
  score: string;
  modifier: number;
}): MessageBody => {
  const roll: number = rollD20();
  const total: number = roll + modifier;
  const s = sign(modifier);
  const mod = Math.abs(modifier);

  return {
    name,
    rollType: "Test",
    roll: total,
    rollFormula: `${roll} ${s} ${mod}`,
    target: `${score} Test`,
    dc: null,
  };
};

export const attackMessage = (
  weapon: Weapon,
  name: string,
  modifier: number
): MessageBody => {
  const roll: number = rollD20();
  const total: number = roll + modifier;
  const s = sign(modifier);
  const mod = Math.abs(modifier);

  return {
    name,
    rollType: "To Hit",
    roll: total,
    rollFormula: `${roll} ${s} ${mod}`,
    target: weapon.name,
    dc: null,
  };
};

export const damageMessage = (weapon: Weapon, name: string): MessageBody => {
  const roll: number = SINGLES[weapon.damageDie]();

  return {
    name,
    rollType: "Damage",
    roll,
    rollFormula: weapon.damageDie,
    target: weapon.name,
    dc: null,
  };
};

export const armorMessage = ({
  tier,
  shield,
  name,
}: {
  tier: number;
  shield: boolean;
  name: string;
}): MessageBody => {
  const ARMOR_TIERS = ["0", "1d2", "1d4", "1d6"];

  const roll: number = SINGLES[ARMOR_TIERS[tier]]();
  const total: number = roll + Number(shield);
  const rollFormula = roll + (shield ? " + 1" : "");

  return {
    name,
    rollType: "Armor",
    roll: total,
    rollFormula,
    target: `Damage resisted`,
    dc: null,
  };
};

// const roll: number = rollD20();
// const s = sign(modifier);
// const mod = Math.abs(modifier);

export const usePowerMessage = (
  scroll: Scroll,
  name: string,
  modifier: number
): MessageBody => {
  const roll: number = rollD20();
  const total: number = roll + modifier;
  const s = sign(modifier);
  const status: string = total > 11 ? "Succeeded" : "Failed";

  return {
    name,
    rollType: "Test",
    roll: total,
    rollFormula: `${roll} ${s} ${modifier}`,
    target: `${status} Power Test`,
    dc: 12,
  };
};
