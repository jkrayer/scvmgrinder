import {
	allPass,
	always,
	anyPass,
	assoc,
	both,
	compose,
	dec,
	filter,
	find,
	has,
	identity,
	ifElse,
	inc,
	isNil,
	lens,
	lensPath,
	lensProp,
	lt,
	map,
	max,
	min,
	not,
	over,
	pathOr,
	prop,
	propOr,
	propEq,
	set,
	view
} from 'ramda';
import { update } from './store';
import {
	ABILITIES,
	AGILITY,
	ARMOR,
	CURRENT,
	EQUIPMENT,
	EQUIPPED,
	HP,
	MELEE,
	OMENS,
	POWERS,
	QUANTITY,
	SHIELD,
	SILVER,
	STRENGTH,
	WEAPON
} from '$lib/morkborg/game-constants';

type MOD = [ModifierMathSymbols, number] | [];

// LENS - Is This Overkill?
const hpLens = lens<Character.SavedCharacter, CurrentMax>(prop(HP), assoc(HP));
const silverLens = lensProp<Character.SavedCharacter, 'silver'>(SILVER);
const omens = lensPath<Character.SavedCharacter, number>([OMENS, CURRENT]);
const power = lensProp<Character.SavedCharacter, 'powers'>(POWERS);
const eqlens = lensProp<Character.SavedCharacter, 'equipment'>(EQUIPMENT);
const tierlens = lensProp<Equipment.Armor, 'currentTier'>('currentTier');
const quantityLens = lensPath<Character.Equipment>([QUANTITY, CURRENT]);
const equippedLens = lens<Character.Equipment, boolean>(propOr(true, EQUIPPED), assoc(EQUIPPED));

// HELPERS - To Unit Test
const decToZero = compose<[number], number, number>(max<number>(0), dec);

const incrementCurrent = ({ current, maximum }: CurrentMax) => ({
	current: min(maximum, current + 1),
	maximum
});

const decrementCurrent = ({ current, maximum }: CurrentMax) => ({
	current: current - 1,
	maximum
});

const maybeDec = (x: null | number) => (x === null ? null : decToZero(x));

const numberToMod = (n: number): MOD => (n < 0 ? ['-', Math.abs(n)] : n > 0 ? ['+', n] : []);

const getMeleeMod = compose<[Character.SavedCharacter], number, MOD>(
	numberToMod,
	pathOr<number>(0, [ABILITIES, STRENGTH])
);

const getRangedMod = compose<[Character.SavedCharacter], number, MOD>(
	numberToMod,
	pathOr<number>(0, [ABILITIES, AGILITY])
);

const dieToDice = (d: Die | Dice): Dice => (typeof d === 'number' ? [1, 'd', d] : d);

// CHECKS - To Unit Test
const isEquipped = propEq<string>(true, EQUIPPED);
const isArmor = propEq<string>(ARMOR, 'type');
const isShield = propEq<string>(SHIELD, 'type');
const isWeapon = propEq<string>(WEAPON, 'type');
const isEquippedArmor = allPass([isEquipped, isArmor]);
const isEquippedShield = allPass([isEquipped, isShield]);
const isEquippedWeapon = allPass([isEquipped, isWeapon]);
const hasEquippedProp = has(EQUIPPED);
export const hasQuantityProp = has(QUANTITY);
export const isEquippable = both(hasEquippedProp, anyPass([isArmor, isShield, isWeapon]));
export const canIncrement = (a: Character.Equipment) =>
	pathOr(0, [QUANTITY, CURRENT], a) < pathOr(0, [QUANTITY, 'maximum'], a);

export const canDecrement = compose<[Character.Equipment], number, boolean>(
	lt(0),
	pathOr(0, [QUANTITY, CURRENT])
);

// UNIT TEST
export const _incrementSilver = over<Character.SavedCharacter, number>(silverLens, inc);
export const _decrementSilver = over<Character.SavedCharacter, number>(silverLens, decToZero);
export const _decrementOmens = over<Character.SavedCharacter, number>(omens, decToZero);
export const _incrementHp = over<Character.SavedCharacter, CurrentMax>(hpLens, incrementCurrent);
export const _decrementHp = over<Character.SavedCharacter, CurrentMax>(hpLens, decrementCurrent);
export const _decrementPower = over<Character.SavedCharacter, number | null>(power, maybeDec);
export const _modifyEquipment = over<Character.SavedCharacter, Character.Equipment[]>(eqlens); // needs test
export const _setArmorTier = set<Equipment.Armor, ArmorTiers>(tierlens);

// Set Armor Tier
export const armorTier = (tier: ArmorTiers, id: string) =>
	_modifyEquipment(map((eq) => (eq._id === id ? _setArmorTier(tier, eq as Equipment.Armor) : eq)));

// PUBLIC INTERFACE

// Setters
export const incSilver = () => update(_incrementSilver);
export const decSilver = () => update(_decrementSilver);
export const useOmen = () => update(_decrementOmens);
export const incHp = () => update(_incrementHp);
export const decHp = () => update(_decrementHp);
export const decPower = () => update(_decrementPower);
export const setArmorTier = (tier: ArmorTiers, id: string) => () => update(armorTier(tier, id));

// Getters
export const getEquippedArmor = compose<
	[Character.SavedCharacter],
	Character.Equipment[],
	Equipment.Armor | undefined,
	Equipment.Armor | null
>(
	ifElse(isNil, always(null), identity),
	find(isEquippedArmor) as (arg0: Character.Equipment[]) => Equipment.Armor | undefined,
	view(eqlens)
);

export const getEquippedShield = compose<
	[Character.SavedCharacter],
	Character.Equipment[],
	Equipment.Shield | undefined,
	Equipment.Shield | null
>(
	ifElse(isNil, always(null), identity),
	find(isEquippedShield) as (arg0: Character.Equipment[]) => Equipment.Shield | undefined,
	view(eqlens)
);

// WEAPONS
const transformWeapon =
	(melee: MOD, range: MOD) =>
	(w: Equipment.Weapon): Equipment.EquippedWeapon => ({
		...w,
		damage: dieToDice(w.damageDie),
		toHit: [1, 'd', 20, ...(w.weaponType === MELEE ? melee : range)]
	});

const getEquippedWeaponsEq = filter(isEquippedWeapon) as (
	arg0: Character.Equipment[]
) => Equipment.Weapon[];

export const getEquippedWeapons = compose<
	[Character.SavedCharacter],
	[Character.Equipment[], MOD, MOD],
	[Equipment.Weapon[], MOD, MOD],
	Equipment.EquippedWeapon[]
>(
	([weapon, m, r]) => map(transformWeapon(m, r))(weapon),
	([eq, melee, ranged]) => [getEquippedWeaponsEq(eq), melee, ranged],
	(c: Character.SavedCharacter) => [view(eqlens, c), getMeleeMod(c), getRangedMod(c)]
);

// EQUIPMENT
export const dropEquipment = (id: string) =>
	_modifyEquipment(filter((eq: Character.Equipment) => eq._id !== id));

export const toggleEq = (id: string) =>
	_modifyEquipment(map((e) => (e._id === id ? over(equippedLens, not, e) : e)));

export const incEquipment = (id: string) =>
	_modifyEquipment(map((e) => (e._id === id ? over(quantityLens, inc, e) : e)));

export const decEquipment = (id: string) =>
	_modifyEquipment(map((e) => (e._id === id ? over(quantityLens, dec, e) : e)));
