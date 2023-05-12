import { describe, it, expect } from 'vitest';
import { incrementHp, decrementHp } from './hitpoints';

const startCharacter = { hitpoints: { current: 2, maximum: 4 } } as Character.SavedCharacter;

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
