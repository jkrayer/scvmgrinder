import Dexie, { type Table } from "dexie";

export class ScvmgrinderDB extends Dexie {
  characters!: Table<CharacterType>;

  constructor() {
    super("scvmgrinder");
    this.version(1).stores({
      characters: "++_id, name", // Primary key and indexed props
    });
  }
}

export const DB = new ScvmgrinderDB();

export async function addCharacter(character: CharacterType) {
  try {
    const id = await DB.characters.add(character);
  } catch (error) {
    console.error(`DB: Error adding character: ${error}`);
  }
}

export async function deleteCharacter({ _id }: CharacterType) {
  try {
    const id = await DB.characters.delete(_id);
  } catch (error) {
    console.error(`DB: Error deleting character: ${error}`);
  }
}

export async function updateCharacter(character: CharacterType) {
  try {
    const id = await DB.characters.put(character);
  } catch (error) {
    console.error(`DB: Error updating character" ${error}`);
  }
}
