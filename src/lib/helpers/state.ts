import { assoc, dec, inc, lens, lensPath, not, over, propOr } from 'ramda';

// LENS
const quantityLens = lensPath<Character.Equipment>(['quantity', 'current']);
const equippedLens = lens<Character.Equipment, boolean>(
	propOr(true, 'equipped'),
	assoc('equipped')
);

// --------------------
export const dropEquipment =
	(id: string) =>
	(c: Character.SavedCharacter): Character.SavedCharacter => {
		console.log(14, id, c);
		return {
			...c,
			equipment: c.equipment.filter((e) => e._id !== id)
		};
	};

// --------------------
export const incEquipment =
	(id: string) =>
	(c: Character.SavedCharacter): Character.SavedCharacter => ({
		...c,
		equipment: c.equipment.map((e) => (e._id === id ? over(quantityLens, inc, e) : e))
	});

// --------------------
export const decEquipment =
	(id: string) =>
	(c: Character.SavedCharacter): Character.SavedCharacter => ({
		...c,
		equipment: c.equipment.map((e) => (e._id === id ? over(quantityLens, dec, e) : e))
	});

// --------------------
export const toggleEq =
	(id: string) =>
	(c: Character.SavedCharacter): Character.SavedCharacter => ({
		...c,
		equipment: c.equipment.map((e) => (e._id === id ? over(equippedLens, not, e) : e))
	});
