// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	type ModifierMathSymbols = '+' | '-' | 'x';

	type Dice = [number, 'd', number, ModifierMathSymbols?, number?];

	type Score = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

	type AbilityKeys = 'agility' | 'presence' | 'strength' | 'toughness';

	type CurrentMax = {
		current: number;
		maximum: number;
	};

	type Ability = { key: AbilityKeys; name: string; dice: Dice };

	type RawClassData = {
		_id: string;
		name: string;
		silver: Dice;
		food: Dice;
		tableOne: number;
		tableTwo: number;
		tableThree: number;
		weaponTable: number;
		armorTable: number;
		abilities: Ability[];
		hitPoints: [Dice[0], Dice[1], Dice[2]];
		terribleTraits: boolean;
		brokenBodies: boolean;
		badHabits: boolean;
		troublingTales: boolean;
		omens: number;
	};
}

export {};
