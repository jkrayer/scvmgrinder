import { assoc, dec, inc, join, lens, min, over, prop } from 'ramda';
import { HP_KEY, SILVER_KEY } from '.';

// KEYS

// LENSES
const hpLens = lens<Character.SavedCharacter, CurrentMax>(prop(HP_KEY), assoc(HP_KEY));
const silverLens = lens<Character.SavedCharacter, number>(prop(SILVER_KEY), assoc(SILVER_KEY));

// const incrementHp =
// 	(hp: number) =>
// 	({ current, maximum }: CurrentMax) => ({
// 		current: min(maximum, current + hp),
// 		maximum
// 	});

const incrementCurrent = ({ current, maximum }: CurrentMax) => ({
	current: min(maximum, current + 1),
	maximum
});

const decrementCurrent = ({ current, maximum }: CurrentMax) => ({
	current: current - 1,
	maximum
});

// HIT POINTS
export const incrementHp = (character: Character.SavedCharacter): Character.SavedCharacter =>
	over(hpLens, incrementCurrent, character);

export const decrementHp = (character: Character.SavedCharacter): Character.SavedCharacter =>
	over(hpLens, decrementCurrent, character);

export const toDiceString = join('');

//
export const incSilver = (c: Character.SavedCharacter) => over(silverLens, inc, c);
export const decSilver = (c: Character.SavedCharacter) => over(silverLens, dec, c);
