import { getCharacters } from '$lib/db';

export async function load(): Promise<{ characters: Character.CharacterData[] }> {
	return { characters: await getCharacters() };
}
