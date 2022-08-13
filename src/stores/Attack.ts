import type { MessageBody, TTrackerItem } from "../global";
import { writable, get } from "svelte/store";
// import { send } from "../Messages/state/MessageStore";
import { getTestModifier } from "./Character";
import { getToHit } from "../lib/monster";

const send = () => {};

const AttackStore = writable<{
  attack: Partial<MessageBody>;
  target: null | TTrackerItem;
}>({
  attack: null,
  target: null,
});

export default AttackStore;

export const setAttack = (weapon: Partial<MessageBody>) =>
  AttackStore.set({ attack: weapon, target: null });

export const setTarget = (target: TTrackerItem) => {
  const data = get(AttackStore);
  AttackStore.set({
    ...data,
    target,
  });
};

export const clearTarget = () =>
  AttackStore.set({ attack: null, target: null });

AttackStore.subscribe((store) => {
  const { attack, target } = store;

  if (attack !== null && target !== null) {
    const toHit = getToHit(target);
    const attackModifier = getTestModifier("attack");
    const finalToHit = toHit + attackModifier;

    const action = attack.roll >= finalToHit ? "Hit!" : "Missed!";

    send({
      ...attack,
      target: `${target.name}, ${action}`,
      dc: finalToHit,
    });

    clearTarget();
  }
});
