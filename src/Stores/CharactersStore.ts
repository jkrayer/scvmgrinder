import { writable } from "svelte/store";
import { filterById } from "../lib/character/common";

const CharactersStore = writable<CharacterType[]>([]);

export default CharactersStore;

export function addCharacters(characters: CharacterType[]): void {
  CharactersStore.update(
    (currentCharacters: CharacterType[]): CharacterType[] => [
      ...currentCharacters,
      ...characters,
    ]
  );
}

export function replaceCharacters(characters: CharacterType[]): void {
  CharactersStore.update(
    (currentCharacters: CharacterType[]): CharacterType[] => characters
  );
}

export function deleteCharacter({ _id }: CharacterType): void {
  CharactersStore.update(filterById<CharacterType>(_id));
}
