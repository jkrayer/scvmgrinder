import { writable, get } from "svelte/store";
import client from "./Socket";
import type { Equipment, Scroll, TCharacter, Tests } from "../global";
import { ENCUMBERED } from "../lib/gameConstants";
import { getTestModifiers, isEncumbered } from "../lib/gameData";

const CharacterStore = writable<{
  testModifiers?: Tests;
  character?: TCharacter;
  loading: boolean;
  error?: string;
}>({
  character: null,
  loading: true,
  error: null,
});

const main = async () => {
  try {
    const character: TCharacter = await client
      .service("characters")
      .get("F7bATPIJ558NwzOu");
    // Katla:UTetg6vHrvwG2o19
    // Brinta:JEx2BC6COHdTEKMC
    // Wemut:cQ65cmnnFbuEMEDJ
    // Klort: HxKImT8kJwc4xGC6
    // Torn: t8xKi3fBbOtlsbBb
    // Vatan: F7bATPIJ558NwzOu
    // Might need to get by userId and Campaingid
    // .find({ query: { campaignId: "e9lQv3ZyOxnPKyrK" } });
    CharacterStore.set({
      testModifiers: getTestModifiers(character),
      character,
      loading: false,
      error: null,
    });
  } catch (e) {
    CharacterStore.set({
      character: null,
      loading: false,
      error: e,
    });
  }

  // Add any newly created message to the list in real-time
  client.service("characters").on("updated", (character: TCharacter) => {
    CharacterStore.set({
      testModifiers: getTestModifiers(character),
      character,
      loading: false,
      error: null,
    });
  });
};

main();

function updateHp(num: number) {
  const { character } = get(CharacterStore);
  let { current, maximum } = character.hitpoints;

  current = num < 0 ? num + current : Math.min(maximum, current + num);

  client
    .service("characters")
    .update(character._id, { ...character, hitpoints: { current, maximum } });
}

function setOmens(current: number) {
  const { character } = get(CharacterStore);
  client.service("characters").update(character._id, {
    ...character,
    omens: { ...character.omens, current },
  });
}

function useScroll(usedEq: Scroll) {
  const { character } = get(CharacterStore);
  const { equipment, powers, status = [] } = character;
  const index = equipment.findIndex((eq: Equipment) => eq.name === usedEq.name);
  equipment.splice(index, 1);

  // TODO: There probably need to be a conversion from Scroll -> Status

  client.service("characters").update(character._id, {
    ...character,
    powers: powers - 1,
    equipment,
    status: [...status, usedEq],
  });
}

// TODO: Is it time to learn lenses?
// to clean up this repetitive state copying?
function setStatus(newStatus) {
  const { character } = get(CharacterStore);
  const { status = [] } = character;

  client
    .service("characters")
    .update(character._id, { ...character, status: [...status, newStatus] });
}

function trashEquipment(index: number) {
  const { character } = get(CharacterStore);
  const { equipment, status = [] } = character;
  equipment.splice(index, 1);

  const s = [
    ...status,
    isEncumbered(equipment, character.abilities.strength) ? ENCUMBERED : null,
  ];

  client.service("characters").update(character._id, {
    ...character,
    status: s.filter((stat) => stat !== null),
    equipment,
  });
}

function decrementEquipment(index: number) {
  const { character } = get(CharacterStore);
  const { equipment } = character;
  equipment[index].quantity--;

  if (equipment[index].quantity === 0) {
    trashEquipment(index);
  } else {
    client.service("characters").update(character._id, {
      ...character,
      equipment,
    });
  }
}

function toggleEquipment(index: number) {
  const { character } = get(CharacterStore);
  const { equipment } = character;

  equipment[index].equipped = !equipment[index].equipped;

  client.service("characters").update(character._id, {
    ...character,
    equipment,
  });
}

export default {
  subscribe: CharacterStore.subscribe,
  updateHp,
  setOmens,
  useScroll,
  setStatus,
  trashEquipment,
  decrementEquipment,
  toggleEquipment,
};
