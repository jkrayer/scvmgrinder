import { writable, derived } from 'svelte/store';
import { updateCharacter } from '$lib/db';
import { getEquippedArmor, getEquippedShield, getEquippedWeapons } from '.';

const Character = writable<Character.SavedCharacter>();

export default Character;

Character.subscribe((c: Required<Character.SavedCharacter>) => {
	if (c !== undefined) updateCharacter(c);
});

export function update(fn: (arg1: Character.SavedCharacter) => Character.SavedCharacter): void {
	Character.update(fn);
}

// WEAPONS
// (a: Character.SavedCharacter): Weapon[] => a.equipment.filter((x) => x.type === 'weapon')
export const EquippedWeapons = derived<typeof Character, Equipment.EquippedWeapon[]>(
	Character,
	getEquippedWeapons
);

// ARMOR
export const EquippedArmor = derived<typeof Character, Equipment.Armor | null>(
	Character,
	getEquippedArmor
);

// Shield
export const EquippedShield = derived<typeof Character, Equipment.Shield | null>(
	Character,
	getEquippedShield
);
