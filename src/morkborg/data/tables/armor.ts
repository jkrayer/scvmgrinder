const ARMOR_TABLE: Table = {
	dice: [1, 'd', 4],
	rows: [
		{ dice: [1], value: 'no armor', label: 'nothing' },
		{
			dice: [2],
			value:
				'{"equipment":{"_id":"OdANZUpaMPggKU0F","name":"Light Armor","type":"armor","description":"<p>Fur, padded cloth, leather, etc.</p>","equipped":false,"broken":false,"price":20,"currentTier":1,"maxTier":1,"img":"systems/morkborg/icons/items/armor/light.png","effects":[]}}',
			label: 'light armor (tier 1)'
		},
		{
			dice: [3],
			value:
				'{"equipment":{"_id":"raiGDQXNkHpHe1ts","name":"Medium Armor","type":"armor","description":"<p>Scale, mail, etc.</p>","equipped":false,"broken":false,"price":100,"currentTier":2,"maxTier":2,"img":"systems/morkborg/icons/items/armor/medium.png","effects":[]}}',
			label: 'medium armor (tier 2)'
		},
		{
			dice: [4],
			value:
				'{"equipment":{"_id":"a9NSVvJgpD1tdIga","name":"Heavy Armor","type":"armor","description":"<p>Splint, plate, etc.</p>","equipped":false,"broken":false,"price":200,"currentTier":3,"maxTier":3,"img":"systems/morkborg/icons/items/armor/heavy.png","effects":[]}}',
			label: 'heavy armor (tier 2)'
		}
	]
};

export default ARMOR_TABLE;
