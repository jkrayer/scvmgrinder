import { add, multiply, sum, subtract } from 'ramda';
import { IO } from './IO';

const roll = (d: number): number => Math.floor(Math.random() * d) + 1;

const d20 = IO.of(20).map(roll);
const d12 = IO.of(12).map(roll);
const d10 = IO.of(10).map(roll);
const d8 = IO.of(8).map(roll);
const d6 = IO.of(6).map(roll);
const d4 = IO.of(4).map(roll);
const d3 = IO.of(3).map(roll);
const d2 = IO.of(2).map(roll);

type RollDie = () => number;

export const rollD20: RollDie = () => d20.run();
export const rollD12: RollDie = () => d12.run();
export const rollD10: RollDie = () => d10.run();
export const rollD8: RollDie = () => d8.run();
export const rollD6: RollDie = () => d6.run();
export const rollD4: RollDie = () => d4.run();
export const rollD3: RollDie = () => d3.run();
export const rollD2: RollDie = () => d2.run();

const DICE_MAP: Record<Die, RollDie> = Object.freeze({
	2: rollD2,
	3: rollD3,
	4: rollD4,
	6: rollD6,
	8: rollD8,
	10: rollD10,
	12: rollD12,
	20: rollD20
});

/**
 * Caches Rolls so they're not repeated. Originally designed to solve duplicate
 * rolls on the traits table this could also be used to prevent duplicate rolls
 * elsehwere (i.e.) preventing rolling two 1s in a row on a d20.
 *
 * @param {function} fn A function that generates a die roll
 * @param {number} [history=1] Maximum number of rolls to save
 * @param {number} [excludeMax=-1] A number to exclude from the history
 * @returns
 *
 * @since 0.1.1
 */
export const rollWithHistory = (
	fn: (arg0: Dice) => number,
	history: number = 1,
	excludeMax: number = -1
) => {
	const rolls: number[] = [];

	return (dice: Dice): number => {
		let roll: number = -1;

		do {
			roll = fn(dice);
		} while (rolls.includes(roll));

		if (roll !== excludeMax) rolls.push(roll);
		if (rolls.length >= history) rolls.shift();

		return roll;
	};
};

const LOCAL_MATH: { [key in ModifierMathSymbols]: (arg1: number, arg2: number) => number } =
	Object.freeze({
		'+': add,
		'-': subtract,
		x: multiply
	});

export const minRoll = ([number = 0, , , symbol = '+', modifier = 0]: Dice | never[]): number =>
	LOCAL_MATH[symbol](number, modifier);

export const maxRoll = ([number = 0, , dice = 2, symbol = '+', modifier = 0]:
	| Dice
	| never[]): number => LOCAL_MATH[symbol](number * dice, modifier);

export const rollDice = ([number = 0, , dice = 2, symbol = '+', modifier = 0]: Dice): number => {
	const rolls: number[] = new Array(number).fill(-1).map(() => DICE_MAP[dice]());

	return LOCAL_MATH[symbol](sum(rolls), modifier);
};
