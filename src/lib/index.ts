import { add, multiply, pathOr, sum, subtract } from 'ramda';
import { rollD20, rollD12, rollD10, rollD8, rollD6, rollD4, rollD2 } from './dice';

const DICE: { [key: number]: () => number } = Object.freeze({
	20: rollD20,
	12: rollD12,
	10: rollD10,
	8: rollD8,
	6: rollD6,
	4: rollD4,
	2: rollD2
});

const LOCAL_MATH: { [key in ModifierMathSymbols]: (arg1: number, arg2: number) => number } =
	Object.freeze({
		'+': add,
		'-': subtract,
		x: multiply
	});

export const stringValue = pathOr<string>('', ['target', 'value']);

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

// DICE
export const toDiceString = (dice: Dice): string => dice.join('');

export const minRoll = ([number = 0, , , symbol = '+', modifier = 0]: Dice | never[]): number =>
	LOCAL_MATH[symbol](number, modifier);

export const maxRoll = ([number = 0, , dice = 0, symbol = '+', modifier = 0]:
	| Dice
	| never[]): number => LOCAL_MATH[symbol](number * dice, modifier);

export const rollDice = ([number = 0, , dice = 0, symbol = '+', modifier = 0]: Dice): number => {
	const rolls: number[] = new Array(number).fill(-1).map(() => DICE[dice]());

	return LOCAL_MATH[symbol](sum(rolls), modifier);
};
