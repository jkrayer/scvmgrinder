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

export async function deleteCharacter(
  character: CharacterType
): Promise<CharacterType> {
  try {
    await DB.characters.delete(character._id);
    return character;
  } catch (error) {
    console.error(`DB: Error deleting character: ${error}`);
    return {} as CharacterType;
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

export async function addCharacter(
  character: CharacterType
): Promise<CharacterType> {
  try {
    const id = await DB.characters.add(character);
    return getCharacter(id);
  } catch (error) {
    console.error(`DB: Error adding character: ${error}`);
    return {} as CharacterType;
  }
}
