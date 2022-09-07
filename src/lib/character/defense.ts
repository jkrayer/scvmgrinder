// SIDE EFFECTS
import { getAbilityScore, rollMessage } from "./common";
import { breakWeaponsAndArmor } from "./equipment";
import { rollD20 } from "../dice";
import { DEFENSE_DC, DEFENSE_CRIT } from "../game_constants";
import { update } from "../../CharacterSheet/store";
import { rollFormula } from "../../Messages/lib";
import { addMessage } from "../../Messages/state/MessageStore";

export function defense(character: CharacterType, armor: Armor | null) {
  const { name } = character;
  const mod: number = getAbilityScore(character, "agility");
  const roll: number = rollD20();
  const total: number = roll + mod;
  const successOrFailure: string = total < DEFENSE_DC ? "Failure" : "Success";
  const critOrFail: string = rollMessage(roll);
  const crit: string = roll === 20 ? `. ${name}${DEFENSE_CRIT}` : "";

  const message: MessageBody = {
    name,
    rollType: "Test",
    roll: total,
    rollFormula: rollFormula(roll, mod),
    target: `Defense (${successOrFailure})${critOrFail}${crit}`,
    dc: DEFENSE_DC,
  };

  addMessage(message);

  if (roll === 1 && armor !== null) {
    update(breakWeaponsAndArmor(armor));
  }
  // else if (roll === 20) {
  //   applyCritStatus
  // }
}
