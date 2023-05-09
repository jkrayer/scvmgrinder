import Dexie, { liveQuery, type IndexableType, type Table } from 'dexie';
import { compose } from 'ramda';

const desc = ({ description, ...rest }: any) => ({ ...rest, description: [description] });

const className = ({ class: classObj, description, ...rest }: any) => ({
	...rest,
	description: description.concat(classObj.abilities),
	className: classObj.name
});

const miseries = ({ miseries, ...rest }: any) => ({
	...rest,
	miseries: miseries.map((x: boolean) => [x, ''])
});

const convert = compose(miseries, className, desc);

export class ScvmgrinderDB extends Dexie {
	characters!: Table<Character.CharacterData>;

	constructor() {
		super('scvmgrinder');
		this.version(2)
			.stores({
				characters: '++_id, name' // Primary key and indexed props
			})
			.upgrade((trans) => {
				trans.table('characters').toCollection().modify(convert);
			});
	}
}

export const DB = new ScvmgrinderDB();

// Either
export async function deleteCharacter(
	character: Required<Character.CharacterData>
): Promise<Character.CharacterData> {
	try {
		await DB.characters.delete(character._id);
		return character;
	} catch (error) {
		console.error(`DB: Error deleting character: ${error}`);
		return {} as Character.CharacterData;
	}
}

//
export async function updateCharacter(character: Character.CharacterData) {
	try {
		const id = await DB.characters.put(character);
	} catch (error) {
		console.error(`DB: Error updating character" ${error}`);
	}
}

// This might need to be Maybe and Either
export async function getCharacter(id: IndexableType): Promise<Character.CharacterData> {
	try {
		const character: Character.CharacterData | undefined = await DB.characters.get(id);
		return character || ({} as Character.CharacterData);
	} catch (error) {
		console.error(`DB: Error finding character" ${error}`);
		return {} as Character.CharacterData;
	}
}

// Either?
export async function getCharacters(): Promise<Character.CharacterData[]> {
	try {
		const characters: Character.CharacterData[] = await DB.characters.toArray();
		return characters;
	} catch (error) {
		console.error(`DB: Error finding character" ${error}`);
		return [];
	}
}

export async function addCharacter(
	character: Character.CharacterData
): Promise<Character.CharacterData> {
	try {
		const id: IndexableType = await DB.characters.add(character);
		return getCharacter(id);
	} catch (error) {
		console.error(`DB: Error adding character: ${error}`);
		return {} as Character.CharacterData;
	}
}
