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

	type Dice = [number, 'd', Die, ModifierMathSymbols?, number?];

	type Score = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

	type AbilityKeys = 'agility' | 'presence' | 'strength' | 'toughness';

	type ArmorTiers = 1 | 2 | 3;

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
		weaponTable: Die;
		armorTable: Die;
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
			type: string;
			broken?: boolean;
			description: string;
			name: string;
			equipped?: boolean;
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
			tier: CurrentMax; // @TODO delete
			currentTier: ArmorTiers;
			maxTier: ArmorTiers;
			// img
			// effect?: Effect;
		};

		type Shield = CommonEquipmentProps & {
			type: 'shield';
			effects?: Effect[];
			// img
			// effect?: Effect;
		};

		type ArmorAndShield = {
			armor: Armor | null;
			shield: Shield | null;
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

		type EquippedWeapon = Weapon & {
			damage: Dice;
			toHit: Dice;
		};

		type EquippedArmor = Armor & {
			damage: Dice;
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
			| Equipment.Equipment
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

		type SavedCharacter = Required<CharacterData>;
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

	// MESSAGES
	type MessageBody = {
		name?: string;
		rollType?: 'To Hit' | 'Damage' | 'Test' | 'Armor';
		type?: 'To Hit' | 'Damage' | 'Test' | 'Armor';
		roll?: number;
		rollFormula?: string;
		formula?: Dice;
		target?: string;
		dc?: number;
	};

	namespace Message {
		type CommonProps = {
			name: string;
		};

		type Test = Message & {
			type: 'TEST';
			rowRoll: number;
			roll: number;
			score: number;
			rollFormula: string;
		};
	}
}

export {};

// function (fd:FormData):CharacterData => {}
