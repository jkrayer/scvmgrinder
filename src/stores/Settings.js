import { writable } from "svelte/store";

const STORAGE_KEY = "settings";

const settings = writable(
  {
    selectedCharacterId: null,
    newCharacter: false,
  },
  (set) => {
    const settings = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    set(settings);

    return (a, b, c, d) => console.log("settings sub", a, b, c, d);
  }
);

settings.subscribe((settings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
});

export default settings;

export const setSelectedCharacterId = (id) =>
  settings.update((oldSettings) => ({
    ...oldSettings,
    selectedCharacterId: id,
    newCharacter: false,
  }));

export const setNewCharacter = (id) =>
  settings.update((oldSettings) => ({
    ...oldSettings,
    selectedCharacterId: null,
    newCharacter: true,
  }));
