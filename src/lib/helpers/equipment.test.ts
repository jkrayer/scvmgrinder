import { describe, it, expect } from 'vitest';
import { dieToDice } from './equipment';

describe('dieToDice', () => {
	it('should return a Dice type', () => {
		expect(dieToDice(2)).toEqual([1, 'd', 2]);
	});
});
