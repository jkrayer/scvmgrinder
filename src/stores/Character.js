import { clamp, map } from "ramda";
import { writable } from "svelte/store";
import { setSelectedCharacterId } from "./Settings";

const STORAGE_KEY = "character:";

const character = writable({}, (set) => {
  const { selectedCharacterId } = JSON.parse(
    localStorage.getItem("settings") || "{}"
  );

  if (selectedCharacterId !== undefined) {
    set(
      JSON.parse(
        localStorage.getItem(`${STORAGE_KEY}${selectedCharacterId}`) || "{}"
      )
    );
  }

  return (a, b, c, d) => console.log("nomoresubs", a, b, c, d);
});

// More events ... perhaps a way to push changes when the local stops changing
character.subscribe((value) => {
  const { id } = value;
  localStorage.setItem(`${STORAGE_KEY}${id}`, JSON.stringify(value));
});

export default character;

export const setSelected = (id) => {
  const selected = localStorage.getItem(`${STORAGE_KEY}${id}`);

  // TODO: handle this case
  // if (selected == null)

  setSelectedCharacterId(id);
  character.update(() => JSON.parse(selected));
};

//
const toggleEquip = (itemId) => (value) => {
  const { _id, equipped } = value;

  return { ...value, equipped: itemId === _id ? !equipped : equipped };
};

//
export const equip = (itemId) =>
  character.update((currentCharacter) => {
    const { equipment } = currentCharacter;

    return {
      ...currentCharacter,
      equipment: map(toggleEquip(itemId), equipment),
    };
  });

// ARMOR
// TODO: This method need to check for out of bounds
export const setArmorTier = (itemId, currentTier) =>
  character.update((currentCharacter) => {
    const equipment = currentCharacter.equipment.map((eq) =>
      eq._id === itemId ? { ...eq, currentTier } : eq
    );

    return {
      ...currentCharacter,
      equipment,
    };
  });

// Weapons
export const breakWeapon = (itemId) =>
  character.update((currentCharacter) => {
    const equipment = currentCharacter.equipment.map((eq) =>
      eq._id !== itemId ? eq : { ...eq, broken: true }
    );

    return {
      ...currentCharacter,
      equipment,
    };
  });

// HP Helpers
export const incrementHp = () =>
  character.update((currentCharacter) => {
    const { current, maximum } = currentCharacter.hitpoints;

    return current < maximum
      ? {
          ...currentCharacter,
          hitpoints: {
            current: current + 1,
            maximum,
          },
        }
      : currentCharacter;
  });

export const addHealth = (hp) =>
  character.update((oldState) => {
    const { current, maximum } = oldState.hitpoints;

    return {
      ...oldState,
      hitpoints: {
        current: clamp(1, maximum, current + hp),
        maximum,
      },
    };
  });

export const decrementHp = () =>
  character.update((currentCharacter) => {
    const { current, maximum } = currentCharacter.hitpoints;

    return {
      ...currentCharacter,
      hitpoints: {
        current: current - 1,
        maximum,
      },
    };
  });

// Omens
export const incrementOmens = () =>
  character.update((currentCharacter) => {
    const { current, die, maximum } = currentCharacter.omens;

    return current < maximum
      ? {
          ...currentCharacter,
          omens: {
            current: current + 1,
            die,
            maximum,
          },
        }
      : currentCharacter;
  });

export const decrementOmens = () =>
  character.update((currentCharacter) => {
    const { current, die, maximum } = currentCharacter.omens;

    return current > 1
      ? {
          ...currentCharacter,
          omens: {
            current: current - 1,
            die,
            maximum,
          },
        }
      : {
          ...currentCharacter,
          omens: {
            current: 0,
            die,
            maximum,
          },
        };
  });

// Powers
export const incrementPowers = () =>
  character.update((currentCharacter) => {
    const { powers = 0 } = currentCharacter;

    return {
      ...currentCharacter,
      powers: powers === 4 ? 4 : powers + 1,
    };
  });

export const decrementPowers = () =>
  character.update((currentCharacter) => {
    const { powers = 0 } = currentCharacter;

    return {
      ...currentCharacter,
      powers: powers === 0 ? 0 : powers - 1,
    };
  });

// EQUIPMENT
export const dropEquipment = (index) =>
  character.update((currentCharacter) => {
    const { equipment } = currentCharacter;

    return {
      ...currentCharacter,
      equipment: equipment.filter((value, i) => i !== index),
    };
  });

export const subtractEquipment = (id) =>
  character.update((oldState) => {
    const { equipment } = oldState;

    const updatedEquipment = equipment.reduce((acc, eq) => {
      if (eq._id !== id) return acc.concat(eq);

      const nextQ = eq.quantity - 1;

      return nextQ === 0 ? acc : acc.concat({ ...eq, quantity: nextQ });
    }, []);

    return {
      ...oldState,
      equipment: updatedEquipment,
    };
  });

export const addEquipment = (id) =>
  character.update((oldState) => {
    const { equipment } = oldState;

    const updatedEquipment = equipment.map((eq) => {
      if (eq._id !== id) return eq;

      const nextQ = eq.quantity + 1;

      return nextQ * eq.weight <= 100 ? { ...eq, quantity: nextQ } : acc;
    });

    return {
      ...oldState,
      equipment: updatedEquipment,
    };
  });
