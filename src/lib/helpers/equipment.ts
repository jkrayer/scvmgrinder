import {
	allPass,
	anyPass,
	assoc,
	both,
	compose,
	either,
	equals,
	filter,
	has,
	join,
	isNil,
	map,
	lens,
	lt,
	pathOr,
	prop,
	propEq,
	propSatisfies,
	reduce,
	view
} from 'ramda';
import { ABILITIES, AGILITY, EQUIPMENT_KEY, STRENGTH } from '.';

const eqLens = lens<Character.SavedCharacter, Character.Equipment[]>(
	prop(EQUIPMENT_KEY),
	assoc(EQUIPMENT_KEY)
);

// DICE
export const dieToDice = (d: Die | Dice): Dice => (typeof d === 'number' ? [1, 'd', d] : d);

const numberToMod = (n: number): [ModifierMathSymbols, number] | [] =>
	n < 0 ? ['-', Math.abs(n)] : n > 0 ? ['+', n] : [];

// EQUIPMENT
const getEquipment = view<Character.SavedCharacter, Character.Equipment[]>(eqLens);

const isEquipped = propEq(true, 'equipped');

const notBroken = propSatisfies(either(isNil, equals(false)), 'broken');

// WEAPONS
const isWeapon = propEq<string>('weapon', 'type');

const isEquippedWeapon = allPass([isWeapon, isEquipped, notBroken]);

const getMeleeMod = compose<[Character.SavedCharacter], number, [ModifierMathSymbols, number] | []>(
	numberToMod,
	pathOr<number>(0, [ABILITIES, STRENGTH])
);

const getRangedMod = compose<
	[Character.SavedCharacter],
	number,
	[ModifierMathSymbols, number] | []
>(numberToMod, pathOr<number>(0, [ABILITIES, AGILITY]));

const transformWeapon =
	(c: Character.SavedCharacter) =>
	(w: Equipment.Weapon): Equipment.EquippedWeapon => ({
		...w,
		damage: dieToDice(w.damageDie),
		toHit: [1, 'd', 20, ...(w.weaponType === 'melee' ? getMeleeMod(c) : getRangedMod(c))]
	});

export const getEquippedWeapons = (c: Character.SavedCharacter): Equipment.EquippedWeapon[] => {
	const eq = getEquipment(c);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const w = filter<Character.Equipment, Equipment.Weapon>(isEquippedWeapon, eq);

	return map(transformWeapon(c), w);

	// return map(transformWeapon(), filter(isEquippedWeapon), getEquipment(c)))
};

// compose<>(map(transformWeapon), ; // as (arg0: Character.SavedCharacter) => Equipment.EquippedWeapon[];

// ARMOR
const isArmor = propEq<string>('armor', 'type');

const isShield = propEq<string>('shield', 'type');

const isArmorOrShield = either(isArmor, isShield);

const isEquippedArmor = allPass([isArmorOrShield, isEquipped, notBroken]);

const equippedArmor = reduce<Character.Equipment, Equipment.ArmorAndShield>(
	(acc, eq) => {
		if (!isEquippedArmor(eq)) return acc;
		return { ...acc, [eq.type]: eq };
	},
	{ armor: null, shield: null }
);

export const getEquippedArmor = compose<
	[Character.SavedCharacter],
	Character.Equipment[],
	Equipment.ArmorAndShield
>(equippedArmor, getEquipment);

// EQUIPMENT

// TODO: Better way to use lenses over this data?
export const toggleEq =
	(id: string) =>
	(c: Character.SavedCharacter): Character.SavedCharacter => {
		const equipment: Character.Equipment[] = c.equipment.map((e) =>
			e._id === id ? { ...e, equipped: !e.equipped } : e
		);

		const cp = { ...c, equipment };

		return cp;
	};

// HELPERS
const QUANTITY = 'quantity';

const hasEquippedProp = has('equipped');

// QUANTITY
export const hasQuantityProp = has(QUANTITY);

const getQuantity = prop(QUANTITY);

export const canIncrement = (a: Character.Equipment) =>
	pathOr(0, ['quantity', 'current'], a) < pathOr(0, ['quantity', 'maximum'], a);

export const canDecrement = compose<[Character.Equipment], number, boolean>(
	lt(0),
	pathOr(0, ['quantity', 'current'])
);

// EQUIPPED
export const isEquippable = both(hasEquippedProp, anyPass([isArmor, isShield, isWeapon]));
