import {
	allPass,
	assoc,
	compose,
	either,
	equals,
	filter,
	isNil,
	join,
	lens,
	map,
	min,
	over,
	pathOr,
	prop,
	propEq,
	propSatisfies,
	reduce,
	view
} from 'ramda';

// KEYS
const HP_KEY = 'hitpoints';
const EQUIPMENT_KEY = 'equipment';
const ABILITIES = 'abilities';
const STRENGTH = 'strength';
const AGILITY = 'agility';

// LENSES
const hpLens = lens<Character.SavedCharacter, CurrentMax>(prop(HP_KEY), assoc(HP_KEY));
const eqLens = lens<Character.SavedCharacter, Character.Equipment[]>(
	prop(EQUIPMENT_KEY),
	assoc(EQUIPMENT_KEY)
);

// const incrementHp =
// 	(hp: number) =>
// 	({ current, maximum }: CurrentMax) => ({
// 		current: min(maximum, current + hp),
// 		maximum
// 	});

const incrementCurrent = ({ current, maximum }: CurrentMax) => ({
	current: min(maximum, current + 1),
	maximum
});

const decrementCurrent = ({ current, maximum }: CurrentMax) => ({
	current: current - 1,
	maximum
});

// DICE
export const dieToDice = (d: Die | Dice): Dice => (typeof d === 'number' ? [1, 'd', d] : d);

export const toDiceString = join('');

const numberToMod = (n: number): [ModifierMathSymbols, number] | [] =>
	n < 0 ? ['-', Math.abs(n)] : n > 0 ? ['+', n] : [];

// HIT POINTS
export const incrementHp = (character: Character.SavedCharacter): Character.SavedCharacter =>
	over(hpLens, incrementCurrent, character);

export const decrementHp = (character: Character.SavedCharacter): Character.SavedCharacter =>
	over(hpLens, decrementCurrent, character);

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
