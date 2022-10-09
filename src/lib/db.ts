import Dexie, { liveQuery, type Table } from "dexie";

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

export async function getCharacter(id: number): Promise<CharacterType> {
  try {
    const character: CharacterType = await DB.characters.get(id);
    return character;
  } catch (error) {
    console.error(`DB: Error finding character" ${error}`);
    return {} as CharacterType;
  }
}

export async function getCharacters(): Promise<CharacterType[]> {
  try {
    const characters: CharacterType[] = await DB.characters.toArray();
    return characters;
  } catch (error) {
    console.error(`DB: Error finding character" ${error}`);
    return [{}] as CharacterType[];
  }
}
