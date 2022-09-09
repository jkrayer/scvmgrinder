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
    console.error(`Error ading character to DB ${error}`);
  }
}
