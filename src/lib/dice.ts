/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { sum } from 'ramda';

const IO = (run) => ({
	run,
	map: (f) => IO(() => f(run())),
	insert: (f) => IO(() => run(f())),
	chain: (f) => IO(() => f(run()).run()), // when f returns an IO
	concat: (other) => IO(() => run().concat(other.run())) // when run() returns an IO
});
IO.of = (x) => IO(() => x);

const roll = (d: number): number => Math.floor(Math.random() * d) + 1;

const d20 = IO.of(20).map(roll);
const d12 = IO.of(12).map(roll);
const d10 = IO.of(10).map(roll);
const d8 = IO.of(8).map(roll);
const d6 = IO.of(6).map(roll);
const d4 = IO.of(4).map(roll);
const d2 = IO.of(2).map(roll);

type RollDie = () => number;

export const rollD20: RollDie = () => d20.run();
export const rollD12: RollDie = () => d12.run();
export const rollD10: RollDie = () => d10.run();
export const rollD8: RollDie = () => d8.run();
export const rollD6: RollDie = () => d6.run();
export const rollD4: RollDie = () => d4.run();
export const rollD2: RollDie = () => d2.run();

// IO.of(20).map(roll).map(add(-2));
export const DICE_MAP = Object.freeze({
	'0': () => 0,
	'1d2': rollD2,
	'1d4': rollD4,
	'1d6': rollD6,
	'1d8': rollD8,
	'1d10': rollD10,
	'1d12': rollD12,
	'1d20': rollD20
});

export const rollNDice = (n: number, die: RollDie): [number, number[]] => {
	const dice: number[] = new Array(n).fill(die).map((d) => d());

	return [sum(dice), dice];
};
