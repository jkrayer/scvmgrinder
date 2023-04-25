import { compose, filter, max, min, propOr, propSatisfies } from 'ramda';

export const getEquipment = propOr([], 'equipment') as (x: CharacterType) => Equipment[];

const isTrue = (x: any): boolean => x === true;

export const isEquipped = propSatisfies(isTrue, 'equipped');

export const isWeapon = propSatisfies((x: string) => x === 'weapon', 'type');

export const isScroll = propSatisfies((x: string) => x === 'scroll', 'type');

export const isArmor = propSatisfies((x: string) => x === 'armor' || x === 'shield', 'type');

// EXPORTS

export const useOmen = () => (character: CharacterType) => {
	const { current, maximum } = character.omens;

	return {
		...character,
		omens: {
			current: max(0, current - 1),
			maximum
		}
	};
};

export const setOmens = (num: number) => (character: CharacterType) => {
	const { maximum } = character.omens;

	return {
		...character,
		omens: {
			current: min(maximum, num),
			maximum
		}
	};
};

// TODO: Candidate for either since adjust could have
export const incrementSilver = (num: number) => (character: CharacterType) => {
	const { silver } = character;

	return {
		...character,
		silver: max(0, silver + num)
	};
};

export const equipmentToggle =
	(eq: Equipment) =>
	(character: CharacterType): CharacterType => {
		const { equipment } = character;

		return {
			...character,
			equipment: equipment.map((e: Equipment) =>
				e.name === eq.name ? { ...e, equipped: !e.equipped } : e
			)
		};
	};

export const equipmentTier =
	(armor: Armor, nextTier: number) =>
	(character: CharacterType): CharacterType => {
		const { equipment } = character;
		const { maximum } = armor.tier;
		const tier = {
			current: nextTier > maximum ? maximum : nextTier,
			maximum
		};

		return {
			...character,
			equipment: equipment.map((eq: Equipment) => (eq.name === armor.name ? { ...eq, tier } : eq))
		};
	};

export const equipmentQuantity = (eq: Equipment, difference: number) => {
	if (eq.quantity.current + difference === 0 && eq.type !== 'weapon') {
		// return equipmentDrop(eq);
	}

	return (character: CharacterType): CharacterType => {
		const { equipment } = character;

		return {
			...character,
			equipment: equipment.map((e: Equipment) => {
				if (e.name === eq.name) {
					const { current, maximum } = e.quantity;
					return { ...e, quantity: { current: current + difference, maximum } };
				}
				return e;
			})
		};
	};
};

//
export const trace =
	(msg: string) =>
	(x: any): any => {
		console.log(msg, x);
		return x;
	};

// GETTERS

export const getScrolls = compose(filter(isScroll), getEquipment) as (
	arg1: CharacterType
) => Scroll[];
