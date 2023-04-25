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

	type Weapon = {
		_id: string;
		name: string;
		type: 'weapon';
		weaponType: 'melee';
		damageDie: number;
		handed: 0 | 1 | 2;
		price: number;
		equipped: boolean;
		broken: boolean;
		usesAmmo: boolean;
		ammoType: null;
		img?: string;
		effects?: string[];
	};

	type CurrentMax = {
		current: number;
		maximum: number;
	};

	type TableRow = {
		dice: number[];
		value: string;
		label: string;
	};

	type Table = {
		title?: string;
		dice: Dice;
		rows: TableRow[];
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
		origin: Table;
		classFeature: Table;
		omens: number;
		naturalWeapon?: Weapon;
	};
}

export {};
