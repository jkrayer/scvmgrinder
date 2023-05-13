import { writable, derived, type Readable } from 'svelte/store';
import { updateCharacter } from '$lib/db';
import { getEquippedWeapons } from '$lib/helpers/character';
// import { updateCharacter } from '../lib/db';
// import { getScrolls } from './lib';
// import {
// 	getEquippedArmor,
// 	isEquippedMediumOrHeavyArmor,
// 	getEquippedWeapons,
// 	isEquippedZweihander
// } from '../lib/character/equipment';

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

// export const EquippedArmor: Readable<ArmorAndShield> = derived(Character, getEquippedArmor);

// export const EqScrolls: Readable<Scroll[]> = derived(Character, getScrolls);

// type TPowers = {
// 	powers: null | number;
// 	scrolls: Scroll[];
// 	message: null | string;
// };

// export const POWERS: Readable<TPowers> = derived(
// 	[Character, EquippedArmor, EquippedWeapons],
// 	([character, armorAndShield, weapons], set) => {
// 		const { powers } = character;
// 		const scrolls = getScrolls(character);

// 		const P: TPowers = {
// 			powers,
// 			scrolls,
// 			message: null
// 		};

// 		// TODO: (or not) replace logic with Either monad
// 		if (powers === null) {
// 			P.message = `${character.class.name} can't use powers.`;
// 		} else if (powers === 0) {
// 			P.message = `${character.name} has no more powers today.`;
// 		} else if (scrolls.length === 0) {
// 			P.message = `${character.name} needs more scrolls.`;
// 		} else if (isEquippedMediumOrHeavyArmor(armorAndShield)) {
// 			P.message = `${character.name} can't use scrolls while wearing ${armorAndShield.armor.name}.`;
// 		} else if (isEquippedZweihander(weapons)) {
// 			P.message = `${character.name} can't use scrolls while wielding a zweihander.`;
// 		}

// 		set(P);
// 	}
// );
