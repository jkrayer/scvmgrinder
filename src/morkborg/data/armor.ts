const ARMOR: Array<Equipment.Armor | Equipment.Shield> = [
	{
		_id: 'ODqK19IBLTyfDjtD',
		name: 'Shield',
		type: 'shield',
		// containerSpace: 1,
		description:
			'<p>-1 damage. You may choose to ignore all damage from one attack but shield breaks.</p>',
		equipped: false,
		broken: false,
		price: 20,
		// img: 'systems/morkborg/icons/items/armor/shield.png',
		effects: []
	},
	{
		_id: 'OdANZUpaMPggKU0F',
		name: 'Light Armor',
		type: 'armor',
		description: '<p>Fur, padded cloth, leather, etc.</p>',
		equipped: false,
		broken: false,
		price: 20,
		tier: {
			current: 1,
			maximum: 1
		}
		// img: 'systems/morkborg/icons/items/armor/light.png',
		// effects: []
	},
	{
		_id: 'raiGDQXNkHpHe1ts',
		name: 'Medium Armor',
		type: 'armor',
		description: '<p>Scale, mail, etc.</p>',
		equipped: false,
		broken: false,
		price: 100,
		tier: {
			current: 2,
			maximum: 2
		}
		// img: 'systems/morkborg/icons/items/armor/medium.png',
		// effects: []
	},
	{
		_id: 'a9NSVvJgpD1tdIga',
		name: 'Heavy Armor',
		type: 'armor',
		description: '<p>Splint, plate, etc.</p>',
		equipped: false,
		broken: false,
		price: 200,
		tier: {
			current: 3,
			maximum: 3
		}
		// img: 'systems/morkborg/icons/items/armor/heavy.png',
		// effects: []
	}
];

export default ARMOR;
