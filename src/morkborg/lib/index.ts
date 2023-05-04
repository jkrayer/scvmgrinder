import { compose, reduce, values } from 'ramda';
import { rollD2, rollD4 } from '$lib/dice';
import type { FormData } from '../store/new-character-store';

type EqAndFollower = {
	equipment: Record<string, unknown>[]; // Character.Equipment[];
	followers: Follower[];
	description: string[];
};

type Sortable = Omit<
	FormData,
	'food' | 'silver' | 'agility' | 'presence' | 'strength' | 'toughness' | 'hitPoints' | 'name'
>;

const dice = Object.freeze({
	'2': rollD2,
	'4': rollD4
});

//
const safeParse = <T>(s: string): T | null => {
	try {
		return JSON.parse(s);
	} catch (e) {
		return null;
	}
};

//
const filterParse = reduce<string, Record<string, unknown>[]>((acc, x) => {
	const p = safeParse<Record<string, unknown>>(x);

	return p === null ? acc : acc.concat(p);
}, []);

//
const sortInto = reduce<
	string[] | string,
	{ equipment: string[]; followers: string[]; description: string[] }
>(
	(acc, val) => {
		if (Array.isArray(val)) {
			acc.description = acc.description.concat(val);
		} else if (val.startsWith('{"equipment"')) {
			acc.equipment = acc.equipment.concat(val);
		} else if (val.startsWith('{"follower"')) {
			acc.followers = acc.followers.concat(val);
		} else {
			acc.description = acc.description.concat(val);
		}

		return acc;
	},
	{ equipment: [], followers: [], description: [] }
);

//
const sort = compose<
	[Sortable],
	Array<string | string[]>,
	{ equipment: string[]; followers: string[]; description: string[] },
	EqAndFollower
>(
	({ equipment, followers, description }): EqAndFollower => ({
		equipment: filterParse(equipment),
		followers: filterParse(followers),
		description
	}),
	sortInto,
	values
);

// NOTE: Might wan to add class ID to character object, might make sense to include class data at some future point
// Note: Need to deal with Natural Weapons
export function formToCharacter(
	{ _id, name: className, omens, naturalWeapon, powers }: RawClassData, // probably a feature?
	{ food, silver, agility, presence, strength, toughness, hitPoints, name, ...rest }: FormData
): Omit<Character.CharacterData, '_id'> {
	//
	const { equipment, followers, description }: EqAndFollower = sort(rest);

	return {
		name,
		className,
		silver,
		abilities: {
			agility,
			presence,
			strength,
			toughness
		},
		hitpoints: { current: hitPoints, maximum: hitPoints },
		equipment: [
			{
				name: `Waterskin and ${food} day(s) worth of food.`,
				type: 'equipment',
				description: '<p>4 days of water.</p>',
				equipped: false,
				price: 4,
				quantity: 4,
				img: 'systems/morkborg/icons/items/misc/waterskin.png',
				effects: [],
				_id: 'Zrs4ubq4fDBNPmnN'
			},
			...equipment
		],
		omens: { current: dice[omens](), maximum: omens }, // roll
		powers: powers ? dice[4]() + presence : null, // roll, but also T/F and not currently in Data
		description,
		followers
	};
}
