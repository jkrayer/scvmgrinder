import {
	allPass,
	always,
	assoc,
	compose,
	dec,
	find,
	identity,
	ifElse,
	inc,
	isNil,
	lens,
	lensIndex,
	lensPath,
	lensProp,
	map,
	max,
	min,
	over,
	prop,
	propEq,
	set,
	view
} from 'ramda';
import { update } from './store';
import { EQUIPMENT, HP, POWERS, SILVER, OMENS } from '$lib/morkborg/game-constants';

// LENS - Is This Overkill?
const hpLens = lens<Character.SavedCharacter, CurrentMax>(prop(HP), assoc(HP));
const silverLens = lensProp<Character.SavedCharacter, 'silver'>(SILVER);
const omens = lensPath<Character.SavedCharacter, number>([OMENS, 'current']);
const power = lensProp<Character.SavedCharacter, 'powers'>(POWERS);
const eqlens = lensProp<Character.SavedCharacter, 'equipment'>(EQUIPMENT);
const tierlens = lensProp<Equipment.Armor, 'currentTier'>('currentTier');

// HELPERS
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

// const setTier =
// 	(currentTier: ArmorTiers) =>
// 	(a: Equipment.Armor): Equipment.Armor => ({ ...a, currentTier });

// UNIT TEST
export const _incrementSilver = over<Character.SavedCharacter, number>(silverLens, inc);
export const _decrementSilver = over<Character.SavedCharacter, number>(silverLens, decToZero);
export const _decrementOmens = over<Character.SavedCharacter, number>(omens, decToZero);
export const _incrementHp = over<Character.SavedCharacter, CurrentMax>(hpLens, incrementCurrent);
export const _decrementHp = over<Character.SavedCharacter, CurrentMax>(hpLens, decrementCurrent);
export const _decrementPower = over<Character.SavedCharacter, number | null>(power, maybeDec);
export const _modifyEquipment = over<Character.SavedCharacter, Character.Equipment[]>(eqlens);
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
const isEquipped = propEq<string>(true, 'equipped');
const isArmor = propEq<string>('armor', 'type');
const isShield = propEq<string>('shield', 'type');
const isEquippedArmor = allPass([isEquipped, isArmor]);
const isEquippedShield = allPass([isEquipped, isShield]);

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
