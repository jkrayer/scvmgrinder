// SIDE EFFECTS
import { compose } from "ramda";
import { getAbilityScore } from "./common";
import { rollD20, rollD2 } from "../dice";
import { POWERS } from "../game_constants";
import { update } from "../../CharacterSheet/store";
import { rollFormula } from "../../Messages/lib";
import { addMessage } from "../../Messages/state/MessageStore";
import { updateHp } from "./hp";
import { setStatus } from "./status";
import { DIZZY } from "../game_constants/status";

export function powers(character: CharacterType) {
  const { name } = character;
  const mod: number = getAbilityScore(character, "presence");
  const roll: number = rollD20();
  const total: number = roll + mod;
  const successOrFailure: string =
    total < POWERS.dc ? `Failure, ${POWERS.fail}` : "Success";

  const message: MessageBody = {
    name,
    rollType: "Test",
    roll: total,
    rollFormula: rollFormula(roll, mod),
    target: successOrFailure,
    dc: POWERS.dc,
  };

  addMessage(message);

  if (successOrFailure.startsWith("Failure")) {
    update(compose(setStatus(DIZZY), updateHp(-rollD2())));
  }
}
