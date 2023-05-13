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
