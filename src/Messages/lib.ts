import { sum } from "ramda";
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

export const rollFormula = (roll: number, modifier: number = 0): string =>
  `${roll} ${sign(modifier)} ${Math.abs(modifier)}`;

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

export const damageMessage = (weapon: Weapon, name: string): MessageBody => {
  const dice = parseInt(weapon.damageDie.split("d")[0], 10);
  const rollDie = weapon.damageDie.replace(/^\d+/, "1");

  const roll: number[] = new Array(dice)
    .fill(null)
    .map(() => DICE_MAP[rollDie]());

  return {
    name,
    rollType: "Damage",
    roll: sum(roll),
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
  name: string,
  modifier: number,
  roll: number,
  dc: number
): MessageBody => {
  const total: number = roll + modifier;
  const s = sign(modifier);
  const status: string = total < dc ? "Failed" : "Succeeded";

  return {
    name,
    rollType: "Test",
    roll: total,
    rollFormula: `${roll} ${s} ${modifier}`,
    target: `${status} Power Test`,
    dc,
  };
};
