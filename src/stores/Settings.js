import { writable } from "svelte/store";

const STORAGE_KEY = "settings";

const settings = writable(
  {
    sheetLocked: true,
    selectedCharacterId: null,
  },
  (set) => {
    const settings = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    set(settings);

    return (a, b, c, d) => console.log("settings sub", a, b, c, d);
  }
);

settings.subscribe((settings, b, c, d) => {
  console.log("settings", settings, b, c, d);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
});

export default settings;

export const toggleSheetLock = () =>
  settings.update((oldSettings) => ({
    ...oldSettings,
    sheetLocked: !oldSettings.sheetLocked,
  }));

export const setSelectedCharacterId = (id) =>
  settings.update((oldSettings) => ({
    ...oldSettings,
    selectedCharacterId: id,
  }));
