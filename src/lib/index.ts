import { join, pathOr } from 'ramda';

export const stringValue = pathOr<string>('', ['target', 'value']);

export const toDiceString = join('');

export const rollToScore = (roll: number): Score => {
	if (roll < 5) {
		return -3;
	} else if (roll < 7) {
		return -2;
	} else if (roll < 9) {
		return -1;
	} else if (roll < 13) {
		return 0;
	} else if (roll < 15) {
		return 1;
	} else if (roll < 17) {
		return 2;
	} else {
		return 3;
	}
};

/**
 * Pad an array to the given size
 * @param size number
 * @param array T[]
 * @returns T[]
 */
export const padTo = <T>(size: number, array: T[]): T[] => {
	const difference: number = size - array.length;
	const tail: T[] = difference < 1 ? [] : new Array(difference).fill(null);

	return [...array, ...tail];
};
