import { describe, it, expect, vi } from 'vitest';
import {
	_incrementSilver,
	_decrementSilver,
	_decrementOmens,
	_incrementHp,
	_decrementHp,
	_decrementPower,
	// _modifyEquipment,
	_setArmorTier,
	armorTier,
	hasQuantityProp
	// isEquippable,
	// canIncrement
} from '.';

vi.doMock('./store.ts', () => ({ update: (x: unknown) => x }));

const startCharacter = {
	silver: 2,
	hitpoints: { current: 2, maximum: 4 },
	omens: { current: 2, maximum: 2 },
	powers: 1,
	equipment: [{ name: 'lantern' }, { _id: '2', currentTier: 3 }]
} as unknown as Character.SavedCharacter;

describe('incrementHp', () => {
	it('adds one to the current hit points without exceeding max', () => {
		const a = _incrementHp(startCharacter);
		const b = _incrementHp(a);
		const c = _incrementHp(b);

		expect(a.hitpoints.current).toBe(3);
		expect(b.hitpoints.current).toBe(4);
		expect(c.hitpoints.current).toBe(4);
	});
});

describe('decrementHp', () => {
	it('subtracts one from the current hit points', () => {
		const a = _decrementHp(startCharacter);
		const b = _decrementHp(a);
		const c = _decrementHp(b);

		expect(a.hitpoints.current).toBe(1);
		expect(b.hitpoints.current).toBe(0);
		expect(c.hitpoints.current).toBe(-1);
	});
});

describe('incrementSilver', () => {
	it('adds one to the current silver', () => {
		const a = _incrementSilver(startCharacter);
		const b = _incrementSilver(a);

		expect(a.silver).toBe(3);
		expect(b.silver).toBe(4);
	});
});

describe('decrementSilver', () => {
	it('subtracts one from the current silver but does not go below 0', () => {
		const a = _decrementSilver(startCharacter);
		const b = _decrementSilver(a);
		const c = _decrementSilver(b);

		expect(a.silver).toBe(1);
		expect(b.silver).toBe(0);
		expect(c.silver).toBe(0);
	});
});

describe('useOmens', () => {
	it('decreses omens by 1 but does not go below 0', () => {
		const a = _decrementOmens(startCharacter);
		const b = _decrementOmens(a);
		const c = _decrementOmens(b);

		expect(a.omens.current).toBe(1);
		expect(b.omens.current).toBe(0);
		expect(c.omens.current).toBe(0);
	});
});

describe('decPowers', () => {
	it('decreses powers by 1 but does not go below 0', () => {
		const a = _decrementPower(startCharacter);
		const b = _decrementPower(a);

		expect(a.powers).toBe(0);
		expect(b.powers).toBe(0);
	});

	it('keep null', () => {
		const a = { ...startCharacter, powers: null };
		const b = _decrementPower(a);

		expect(b.powers).toBe(null);
	});
});

describe('_setArmorTier', () => {
	it('set currentTier to the given value', () => {
		const armor = { currentTier: 3 } as Equipment.Armor;
		const a = _setArmorTier(1)(armor);
		const b = _setArmorTier(2)(armor);

		expect(a.currentTier).toBe(1);
		expect(b.currentTier).toBe(2);
		expect(armor.currentTier).toBe(3);
	});
});

describe('armorTier', () => {
	it('set currentTier of armor in equipment', () => {
		const a = armorTier(2, '2')(startCharacter);
		const ar = a.equipment[1] as Equipment.Armor;

		expect(ar.currentTier).toBe(2);
	});
});

describe('hasQuantityProp', () => {
	it('should return true when the object contains the "quantity" property', () => {
		expect(hasQuantityProp({ quantity: 1 })).toBe(true);
		expect(hasQuantityProp({ quantity: undefined })).toBe(true);
	});

	it('should return false when the object does not contain the "quantity" property', () => {
		expect(hasQuantityProp({})).toBe(false);
	});
});

//isEquippable, canIncrement;
