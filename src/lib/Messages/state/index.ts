import { rollD20 } from '$lib/dice';
import { compose } from 'ramda';
import { addMessage } from './store';
import { rollDice, toDiceString } from '$lib';
// import { sum } from 'ramda';
// import { ARMOR_TIERS } from '../CharacterSheet/enums';
// import { rollD2, rollD4, rollD6, rollD8, rollD10, rollD12, rollD20, DICE_MAP } from '../lib/dice';

// export const sign = (x: number) => (x < 0 ? '-' : '+');

// export const rollFormula = (roll: number, modifier: number = 0): string =>
// 	`${roll} ${sign(modifier)} ${Math.abs(modifier)}`;

// export const testMessage = ({
// 	name,
// 	score,
// 	modifier
// }: {
// 	name: string;
// 	score: string;
// 	modifier: number;
// }): MessageBody => {
// 	const roll: number = rollD20();
// 	const total: number = roll + modifier;
// 	const s = sign(modifier);
// 	const mod = Math.abs(modifier);

// 	return {
// 		name,
// 		rollType: 'Test',
// 		roll: total,
// 		rollFormula: `${roll} ${s} ${mod}`,
// 		target: `${score} Test`,
// 		dc: null
// 	};
// };

// export const diceMessage = (
// 	name: string,
// 	rollFormula: string,
// 	roll: number,
// 	target: string
// ): MessageBody => {
// 	return {
// 		name,
// 		rollType: 'Test',
// 		roll,
// 		rollFormula,
// 		target,
// 		dc: null
// 	};
// };

// export const damageMessage = (weapon: Weapon, name: string): MessageBody => {
// 	const dice = parseInt(weapon.damageDie.split('d')[0], 10);
// 	const rollDie = weapon.damageDie.replace(/^\d+/, '1');

// 	const roll: number[] = new Array(dice).fill(null).map(() => DICE_MAP[rollDie]());

// 	return {
// 		name,
// 		rollType: 'Damage',
// 		roll: sum(roll),
// 		rollFormula: weapon.damageDie,
// 		target: weapon.name,
// 		dc: null
// 	};
// };

// export const armorMessage = ({
// 	tier,
// 	shield,
// 	name
// }: {
// 	tier: number;
// 	shield: boolean;
// 	name: string;
// }): MessageBody => {
// 	const roll: number = DICE_MAP[ARMOR_TIERS[tier]]();
// 	const total: number = roll + Number(shield);
// 	const rollFormula = roll + (shield ? ' + 1' : '');

// 	return {
// 		name,
// 		rollType: 'Armor',
// 		roll: total,
// 		rollFormula,
// 		target: `Damage resisted`,
// 		dc: null
// 	};
// };

// // const roll: number = rollD20();
// // const s = sign(modifier);
// // const mod = Math.abs(modifier);

// export const usePowerMessage = (
// 	name: string,
// 	modifier: number,
// 	roll: number,
// 	dc: number
// ): MessageBody => {
// 	const total: number = roll + modifier;
// 	const s = sign(modifier);
// 	const status: string = total < dc ? 'Failed' : 'Succeeded';

// 	return {
// 		name,
// 		rollType: 'Test',
// 		roll: total,
// 		rollFormula: `${roll} ${s} ${modifier}`,
// 		target: `${status} Power Test`,
// 		dc
// 	};
// };

const capfirst = (x: string): string => x[0].toUpperCase() + x.substring(1);
const getSign = (x: number): ModifierMathSymbols => (Math.sign(x) === -1 ? '-' : '+');

const composeTest = ([name, score]: [AbilityKeys, number]): Message.Test => {
	const rawRoll = rollD20(); // impure? or pure because it's stuck in IO?

	return {
		type: 'TEST',
		name: `${capfirst(name)} Test`,
		score,
		roll: rawRoll + score,
		rollFormula: `${rawRoll} ${getSign(score)} ${Math.abs(score)}`
	};
};

const composeToHit = ([name, score]: [string, number]) => {
	// impure? or pure because it's stuck in IO?
	const rawRoll = rollD20();
	// impure because given the same inputs this will produce a different output

	return {
		type: 'TO_HIT',
		name,
		score,
		roll: rawRoll + score,
		rollFormula: `${rawRoll} ${getSign(score)} ${Math.abs(score)}`
	};
};

const composeDamage = ({ name, damageDie }: Equipment.Weapon) => {
	const dice: Dice = typeof damageDie === 'number' ? [1, 'd', damageDie] : damageDie;
	const rawRoll = rollDice(dice);

	return {
		type: 'DAMAGE',
		name,
		score: '',
		roll: rawRoll,
		rollFormula: toDiceString(dice)
	};
};

const rollArmor = (armor: Equipment.Armor | null, shield: boolean = false) => {
	const TIERS: { [key: number]: Dice } = { 1: [1, 'd', 2], 2: [1, 'd', 4], 3: [1, 'd', 6] };

	const { name = '', currentTier = 0 } = armor || {};

	let rawRoll: number = currentTier === 0 ? 0 : rollDice(TIERS[currentTier]) + Number(shield);

	const s = shield ? 'Shield' : '';
	const rollFormula = [...(TIERS[currentTier] || [])].concat(shield ? ['+', 1] : []);

	return {
		type: 'ARMOR',
		name: `${name}${!!name ? ' + ' : ''}${s}`,
		score: '',
		roll: rawRoll,
		rollFormula: toDiceString(rollFormula)
	};
};

export const abilityTest = compose<[[AbilityKeys, number]], Message.Test, void>(
	addMessage,
	composeTest
);

export const toHit = compose<[[string, number]], Message.Test, void>(addMessage, composeToHit);

export const damage = compose<[Equipment.Weapon], Message.Test, void>(addMessage, composeDamage);

export const damageMitigation = compose<[Equipment.Armor | null, boolean], Message.Test, void>(
	addMessage,
	rollArmor
);
