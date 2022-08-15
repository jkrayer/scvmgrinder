import type { MessageBody } from "./types";
import type { Weapon, Scroll } from "../CharacterSheet/type";
import { ARMOR_TIERS } from "../CharacterSheet/enums";
import {
  rollD2,
  rollD4,
  rollD6,
  rollD8,
  rollD10,
  rollD12,
  rollD20,
  DICE_MAP,
} from "../lib/dice";

export const sign = (x: number) => (x < 0 ? "-" : "+");

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

export const diceMessage = (
  name: string,
  rollFormula: string,
  roll: number,
  target: string
): MessageBody => {
  return {
    name,
    rollType: "Test",
    roll,
    rollFormula,
    target,
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
  const roll: number = DICE_MAP[weapon.damageDie]();

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
  const roll: number = DICE_MAP[ARMOR_TIERS[tier]]();
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
