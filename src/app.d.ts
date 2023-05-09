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

	type Die = 2 | 4 | 6 | 8 | 10 | 12 | 20;

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
		// troublingTales: boolean;
		origin: Table | Record<string, never>;
		classFeature: Table | Record<string, never>;
		classFeature: Table;
		omens: 2 | 4;
		powers: boolean;
		naturalWeapon?: Weapon;
	};

	//
	type CreateCharacterData = {
		tables: {
			characters: RawClassData[];
			tableOne: Table;
			tableTwo: Table;
			tableThree: Table;
			weaponTable: Table;
			armorTable: Table;
			terribelTraits: Table;
			brokenBodies: Table;
			badHabits: Table;
		};
	};

	namespace Equipment {
		type CommonEquipmentProps = {
			_id: string;
			broken?: boolean;
			description: string;
			name: string;
			equipped: boolean;
			price: number;
			quantity?: CurrentMax;
		};

		type Effect = { [key: string]: string };

		type Scroll = CommonEquipmentProps & {
			type: 'scroll';
			subType: 'unclean' | 'sacred';
		};

		type Armor = CommonEquipmentProps & {
			type: 'armor';
			effects?: string[];
			currentTier: number;
			maxTier: number;
			// img
			// effect?: Effect;
		};

		type Shield = CommonEquipmentProps & {
			type: 'shield';
			effects?: Effect[];
			// img
			// effect?: Effect;
		};

		type Weapon = CommonEquipmentProps & {
			type: 'weapon';
			weaponType: 'melee' | 'ranged';
			damageDie: Die | Dice;
			handed: 1 | 2;
			usesAmmo: boolean;
			ammoType: null | 'arrow' | 'bolt' | 'sling stone';
			effects?: Effect[];
		};

		type Container = CommonEquipmentProps & {
			type: 'container';
			capacity: 7;
		};

		type Equipment = CommonEquipmentProps & {
			type: 'equipment';
		};

		type Misc = CommonEquipmentProps & {
			type: 'misc';
			effects?: Effect[];
		};
	}

	namespace Character {
		// type CharacterClasses;
		type AbilityScore = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

		type AbilityScores = {
			agility: AbilityScore;
			presence: AbilityScore;
			strength: AbilityScore;
			toughness: AbilityScore;
		};

		type CurrentMax = {
			current: number;
			maximum: number;
		};

		type Equipment =
			| Equipment.Scroll
			| Equipment.Armor
			| Equipment.Shield
			| Equipment.Weapon
			| Equipment.Container
			| Equipment.Misc;

		type CharacterData = {
			_id?: number;
			name: string;
			className: string;
			silver: number;
			abilities: AbilityScores;
			hitpoints: CurrentMax;
			omens: CurrentMax;
			powers: null | number;
			equipment: Equipment[];
			miseries?: [boolean, string][];
			followers: Follower[];
			description: string[];
			// 	tests: any; // Tests;
			// 	description: string;
			//
			// 	status: { [keys: string]: Status };
		};
	}

	type Follower = {
		_id: string;
		name: string;
		type: 'follower';
		followerType: 'container' | 'buffer' | 'combatant';
		description: string;
		price: null | number;
		quantity: number;
		capacity: null | number;
		// img: 'systems/morkborg/icons/items/containers/donkey.png';
		effects: Equipment.Effect[];
		sheet?: {
			attack?: string;
			defense?: string;
			abilities: AbilityScores;
			hitpoints: CurrentMax;
			morale: number;
			silver: number;
			speciality: string;
			trait: string;
			value: string;
			weapons?: Equipment.Weapon[];
			armor?: {
				tier: CurrentMax;
			};
		};
		// Equipment
	};
}

export {};

// function (fd:FormData):CharacterData => {}
