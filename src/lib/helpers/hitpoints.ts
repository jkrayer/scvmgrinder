// copied from src/CharacterSheet/*
import { assoc, equals, lens, max, min, over, pathSatisfies, prop } from 'ramda';

// KEYS
const HP_KEY = 'hitpoints';

// LENSES
const hpLens = lens<Character.SavedCharacter, CurrentMax>(prop(HP_KEY), assoc(HP_KEY));

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
