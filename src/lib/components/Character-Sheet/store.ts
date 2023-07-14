import { writable, derived } from 'svelte/store';
import { always, compose, filter, ifElse, isEmpty, isNotNil, join, paths } from 'ramda';
import { updateCharacter } from '$lib/db';
import { getEquippedArmor, getEquippedWeapons } from '$lib/helpers/equipment';
import { ARMOR_TIERS } from '../../../morkborg/lib/constants';

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

//
const getTitle = compose<[Equipment.ArmorAndShield], Array<string | undefined>, string[], string>(
	ifElse(isEmpty, always('no armor'), join('+')),
	filter<string | undefined, string>(isNotNil),
	paths<string>([
		['armor', 'name'],
		['shield', 'name']
	])
);

const getFormula = ({ armor, shield }: Equipment.ArmorAndShield): number | Dice => {
	const ar = armor !== null ? ARMOR_TIERS[armor.tier?.current || armor.currentTier || 0] : null;
	const s = Number(!!shield);

	return ar === null ? s : s === 0 ? ar : [ar[0], ar[1], ar[2], '+', s];
};

export const EquippedArmor = derived<
	typeof Character,
	{ armor: Equipment.ArmorAndShield; title: string; formula: number | Dice }
>(Character, (x) => {
	const armor = getEquippedArmor(x);
	const title = `(${getTitle(armor)})`;
	const formula = getFormula(armor);

	return { armor, title, formula };
});

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

const silver = (c: Character.SavedCharacter): Character.SavedCharacter => {};
