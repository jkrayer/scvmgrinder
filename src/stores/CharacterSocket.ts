import { writable, get } from "svelte/store";
import type { Equipment, Scroll, TCharacter } from "../global";
import client from "./Socket";

const CharacterStore = writable<{
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
      .get("JEx2BC6COHdTEKMC");
    // Katla:UTetg6vHrvwG2o19
    // Brinta:JEx2BC6COHdTEKMC
    // Might need to get by userId and Campaingid
    // .find({ query: { campaignId: "e9lQv3ZyOxnPKyrK" } });
    CharacterStore.set({
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
  const { equipment } = character;
  equipment.splice(index, 1);

  client.service("characters").update(character._id, {
    ...character,
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

// @ts-ignore
CharacterStore.subscribe((x, y, z) => console.log("subs", x, y, z));

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
