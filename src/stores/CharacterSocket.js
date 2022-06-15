import { writable, get } from "svelte/store";
import client from "./Socket";
import { setEffects } from "../lib/gameData";

const DATA = {
  name: "",
  silver: 0,
  abilities: { agility: 0, presence: 0, strength: 0, toughness: 0 },
  hitpoints: { maximum: 0, current: 0 },
  _id: "",
};

const CharacterStore = writable({
  data: { ...DATA },
  loading: true,
  error: null,
});

const main = async () => {
  try {
    const character = await client
      .service("characters")
      .get("JEx2BC6COHdTEKMC");
    // Katla:UTetg6vHrvwG2o19
    // Brinta:JEx2BC6COHdTEKMC
    // Might need to get by userId and Campaingid
    // .find({ query: { campaignId: "e9lQv3ZyOxnPKyrK" } });
    console.log(28, character);
    CharacterStore.set({
      // This would create an infinite increase in tests
      data: character, // setEffects(character),
      loading: false,
      error: null,
    });
  } catch (e) {
    CharacterStore.set({
      data: { ...DATA },
      loading: false,
      error: e,
    });
  }

  // Add any newly created message to the list in real-time
  client.service("characters").on("updated", (data) => {
    CharacterStore.set({
      data,
      loading: false,
      error: null,
    });
  });
};

main();

// This is a test. I think it may make more sense to have the UI update the store,
// subscribe to those changes and then emit them to the server there.

// function setHp(current) {
//   const { data } = get(CharacterStore);
//   client
//     .service("characters")
//     .update(data._id, { ...data, hitpoints: { ...data.hitpoints, current } });
// }

function updateHp(num) {
  const { data } = get(CharacterStore);
  let { current, maximum } = data.hitpoints;

  current = num < 0 ? num + current : Math.min(maximum, current + num);

  client
    .service("characters")
    .update(data._id, { ...data, hitpoints: { current, maximum } });
}

function setOmens(current) {
  const { data } = get(CharacterStore);
  client
    .service("characters")
    .update(data._id, { ...data, omens: { ...data.omens, current } });
}

function useScroll(current, usedEq) {
  const { data } = get(CharacterStore);
  const { equipment, effects = [] } = data;
  const eq = equipment.filter((e) => e.name !== usedEq.name);

  // const character = {...data, powers: { current }, equipment: eq, effects:[...effects, usedEq] }}

  // client
  //   .service("characters")
  //   .update(data._id, { ...data, powers: { current }, equipment: eq });
}

// TODO: Is it time to learn lenses?
// to clean up this repetitive state copying?
function setStatus(newStatus) {
  const { data } = get(CharacterStore);
  const { status = [] } = data;

  client
    .service("characters")
    .update(data._id, { ...data, status: [...status, newStatus] });
}

CharacterStore.subscribe((x, y, z) => console.log("subs", x, y, z));

export default {
  subscribe: CharacterStore.subscribe,
  updateHp,
  setOmens,
  useScroll,
  setStatus,
};
