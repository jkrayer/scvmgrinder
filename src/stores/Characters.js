import { writable } from "svelte/store";
import { setSelectedCharacterId } from "./Settings";
import { setSelected } from "./Character";

const STORAGE_KEY = "characters";

const characters = writable([], (set) => {
  const char = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); // add either?
  set(char);

  return (a, b, c, d) => console.log("characters unsub", a, b, c, d);
});

characters.subscribe((value) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
});

export default characters;

// Crud
export const addCharacter = (character) => {
  const id = Date.now().toString();

  localStorage.setItem(`character:${id}`, JSON.stringify({ id, ...character }));
  characters.update((ids) => [...ids, id]);
  setSelectedCharacterId(id);
  setSelected(id);
};

// cruD
export const deleteCharacter = (deleteId) => {
  characters.update((ids) => ids.filter((id) => id !== deleteId));

  localStorage.removeItem(`character:${deleteId}`);
  // may need to sync storage with selected character
};
