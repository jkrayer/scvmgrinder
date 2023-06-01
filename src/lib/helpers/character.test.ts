import { describe, it, expect } from 'vitest';
import {
	dieToDice,
	toDiceString,
	incrementHp,
	decrementHp,
	getEquippedWeapons,
	toggleEq
} from './character';

const startCharacter = { hitpoints: { current: 2, maximum: 4 } } as Character.SavedCharacter;

describe('dieToDice', () => {
	it('should return a Dice type', () => {
		expect(dieToDice(2)).toEqual([1, 'd', 2]);
	});
});

describe('toDiceString', () => {
	it('should return a dice string', () => {
		expect(toDiceString([1, 'd', 2])).toBe('1d2');
		expect(toDiceString([3, 'd', 6, '+', 2])).toBe('3d6+2');
	});
});

describe('incrementHp', () => {
	it('adds one to the current hit points without exceeding max', () => {
		const a = incrementHp(startCharacter);
		const b = incrementHp(a);
		const c = incrementHp(b);

		expect(a.hitpoints.current).toBe(3);
		expect(b.hitpoints.current).toBe(4);
		expect(c.hitpoints.current).toBe(4);
	});
});

describe('decrementHp', () => {
	it('subtracts one from the current hit points', () => {
		const a = decrementHp(startCharacter);
		const b = decrementHp(a);
		const c = decrementHp(b);

		expect(a.hitpoints.current).toBe(1);
		expect(b.hitpoints.current).toBe(0);
		expect(c.hitpoints.current).toBe(-1);
	});
});
