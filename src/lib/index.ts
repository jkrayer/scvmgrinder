import { add, always, compose, equals, ifElse, length, multiply, pathOr, subtract } from 'ramda';

const LOCAL_MATH: { [key in ModifierMathSymbols]: (arg1: number, arg2: number) => number } =
	Object.freeze({
		'+': add,
		'-': subtract,
		x: multiply
	});

export const toDiceString = (dice: Dice): string => dice.join('');

export const maxRoll = ([number = 0, , dice = 0, symbol = '+', modifier = 0]:
	| Dice
	| never[]): number => LOCAL_MATH[symbol](number * dice, modifier);

export const minRoll = ([number = 0, , , symbol = '+', modifier = 0]: Dice | never[]): number =>
	LOCAL_MATH[symbol](number, modifier);

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
