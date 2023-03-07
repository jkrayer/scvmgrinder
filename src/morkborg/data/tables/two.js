const TABLE_TWO = {
	dice: [1, 'd', 12],
	rows: [
		{
			dice: [1],
			value:
				'{"equipment":{"name":"Rope","type":"equipment","description":"<p>30 feet.</p>","equipped":false,"price":4,"quantity":1,"img":"systems/morkborg/icons/items/misc/rope.png","effects":[],"_id":"PqBFT58mU6EJ20HM"}}',
			label: 'rope. 30 feet'
		},
		{
			dice: [2],
			value:
				'{"equipment":{"name":"Backpack","type":"container","description":"<p>Holds 7 normal-sized items.</p>","equipped":false,"price":6,"quantity":1,"capacity":7,"img":"systems/morkborg/icons/items/containers/backpack.png","effects":[],"_id":"rvu5GKNoYKiiwfrL"}}',
			label: 'Presence + 4 torches'
		},
		{
			dice: [3],
			value:
				'{"equipment":{"name":"Sack","type":"container","description":"<p>Holds 10 normal-sized items.</p>","equipped":false,"price":3,"quantity":1,"capacity":10,"img":"systems/morkborg/icons/items/containers/sack.png","effects":[],"_id":"3YCK3phcKtAxcvkU"}}',
			label: 'lantern with oil for Presence + 6 hours'
		},
		{
			dice: [4],
			value:
				'{"equipment":{"name":"Small Wagon","type":"container","description":"","equipped":false,"price":25,"quantity":1,"capacity":15,"img":"systems/morkborg/icons/items/containers/wagon.png","effects":[],"_id":"eNcMJ17ikUaGuuBF"}}',
			label: 'magnesium strip'
		},
		{ dice: [5], value: 'follower', label: 'random unclean scroll' },
		{ dice: [6], value: 'followe', label: 'sharp needle' },
		{
			dice: [7],
			value: 'follow',
			label: 'medicine chest Presence+4 uses (stops bleeding/infection and heals d6 HP)'
		},
		{ dice: [8], value: 'follo', label: 'metal file and lockpicks' },
		{
			dice: [9],
			value: 'foll',
			label: 'bear trap (Presence DR14 to spot, d8 damage)'
		},
		{ dice: [10], value: 'fol', label: 'bomb (sealed bottle, d10 damage)' },
		{
			dice: [11],
			value: 'fo',
			label: 'a bottle of red poison d4 doses (Toughness DR12 or d10 damage)'
		},
		{ dice: [12], value: 'f', label: 'silver crucifix' }
	]
};

export default TABLE_TWO;
