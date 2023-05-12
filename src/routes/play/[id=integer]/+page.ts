import { getCharacter } from '$lib/db';

export async function load({
	params: { id }
}): Promise<{ character: Required<Character.CharacterData> }> {
	return { character: (await getCharacter(parseInt(id, 10))) as Required<Character.CharacterData> };
}
