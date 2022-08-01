import { writable, get } from "svelte/store";
import User from "../State/User";
import client from "./Socket";
import type { Equipment, Scroll, TCharacter, Tests, Weapon } from "../global";
import { ENCUMBERED } from "../lib/gameConstants";
import { getTestModifiers, isEncumbered } from "../lib/gameData";

type CharacterStore = {
  testModifiers?: Tests;
  character?: TCharacter;
  loading: boolean;
  error?: string;
};

const Character = writable<CharacterStore>({
  character: null,
  loading: true,
  error: null,
});

(async () => {
  const { characterId } = get(User);

  try {
    const character: TCharacter = await client
      .service("characters")
      .get(characterId);
    console.log(28, character);
    Character.set({
      testModifiers: getTestModifiers(character),
      character,
      loading: false,
      error: null,
    });
  } catch (e) {
    Character.set({
      character: null,
      loading: false,
      error: e,
    });
  }

  client.service("characters").on("updated", (character: TCharacter) => {
    if (character._id === characterId) {
      Character.set({
        testModifiers: getTestModifiers(character),
        character,
        loading: false,
        error: null,
      });
    }
  });
})();

export default Character;

// QUESTION: Should I update service in subscriber? (Reviewed several times now)
// ANSWER: As of 8/1/22 No. This issue here is subscibe only gets the new data so we can't know if we should or should not update the server.

export function updateHp(num: number) {
  const { character } = get(Character);
  let { current, maximum } = character.hitpoints;

  current = num < 0 ? num + current : Math.min(maximum, current + num);

  client
    .service("characters")
    .update(character._id, { ...character, hitpoints: { current, maximum } });
}

export function setOmens(current: number) {
  const { character } = get(Character);
  client.service("characters").update(character._id, {
    ...character,
    omens: { ...character.omens, current },
  });
}

export function useScroll(usedEq: Scroll) {
  const { character } = get(Character);
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
export function setStatus(newStatus) {
  const { character } = get(Character);
  const { status = [] } = character;

  client
    .service("characters")
    .update(character._id, { ...character, status: [...status, newStatus] });
}

export function trashEquipment(index: number) {
  const { character } = get(Character);
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

export function decrementEquipment(index: number) {
  const { character } = get(Character);
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

export function toggleEquipment(index: number) {
  const { character } = get(Character);
  const { equipment } = character;

  equipment[index].equipped = !equipment[index].equipped;

  client.service("characters").update(character._id, {
    ...character,
    equipment,
  });
}

export function getTestModifier(prop: string) {
  const { testModifiers } = get(Character);

  return testModifiers[prop] || 0;
}

export function breakWeapon(weaponName: string) {
  const { character } = get(Character);
  const { equipment } = character;

  client.service("characters").update(character._id, {
    ...character,
    equipment: equipment.map((eq: Equipment) =>
      eq.name === weaponName ? { ...eq, broken: true } : eq
    ),
  });
}
