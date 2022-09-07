import { getAbilityScore, rollMessage } from "./common";
import { breakWeaponsAndArmor } from "./equipment";
import { rollD20 } from "../dice";
import { DEFENSE_DC } from "../game_constants";
import { update } from "../../CharacterSheet/store";
import { rollFormula } from "../../Messages/lib";
import { addMessage } from "../../Messages/state/MessageStore";

export function defense(character: CharacterType, armor: Armor | null) {
  const mod: number = getAbilityScore(character, "agility");
  const roll: number = rollD20();
  const total: number = roll + mod;
  const rollType: string = rollMessage(roll);
  const successOrFailure = total < DEFENSE_DC ? "Failure" : "Success";

  const message: MessageBody = {
    name: character.name,
    rollType: "Test",
    roll: total,
    rollFormula: rollFormula(roll, mod),
    target: `Defense (${successOrFailure})${rollType}`,
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
