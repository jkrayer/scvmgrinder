// SIDE EFFECTS
import { breakWeaponsAndArmor } from "./equipment";
import { getAbilityScore, rollMessage } from "./common";
import { rollD20 } from "../dice";
import { ATTACK_CRIT } from "../game_constants";
import { update } from "../../CharacterSheet/store";
import { rollFormula } from "../../Messages/lib";
import { addMessage } from "../../Messages/state/MessageStore";

type AttackScores = "strength" | "agility";

const ATTACK: { [key: string]: AttackScores } = {
  melee: "strength",
  ranged: "agility",
};

export function attack(character: CharacterType, weapon: Weapon) {
  const { subType } = weapon;
  const modName: AttackScores = ATTACK[subType];
  const mod: number = getAbilityScore(character, modName);
  const roll: number = rollD20();
  const critOrFail: string = rollMessage(roll);
  const crit: string = roll === 20 ? `. ${ATTACK_CRIT}` : "";

  const message: MessageBody = {
    name: character.name,
    rollType: "To Hit",
    roll: roll + mod,
    rollFormula: rollFormula(roll, mod),
    target: `${weapon.name}${critOrFail}${crit}`,
    dc: null,
  };

  addMessage(message);

  if (roll === 1) {
    update(breakWeaponsAndArmor(weapon));
  }
  // else if (roll === 20) {
  //   applyCritStatus
  // }
}
