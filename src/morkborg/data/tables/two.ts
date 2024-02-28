const TABLE_TWO: Table = {
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
				'{"equipment":{"name":"Torch","type":"equipment","description":"","equipped":false,"price":2,"quantity":1,"img":"systems/morkborg/icons/items/misc/torch.png","effects":[],"_id":"I5RRBmZ4K7M2fq2B"}}',
			label: 'Presence + 4 torches'
		},
		{
			dice: [3],
			value:
				'{"equipment":{"name":"Lantern oil","type":"equipment","description":"<p>Presence + 6 hours.</p>","equipped":false,"price":5,"quantity":6,"img":"systems/morkborg/icons/items/misc/lanternoil.png","effects":[],"_id":"iNy14bPxAgkJwXZv"}}',
			label: 'lantern with oil for Presence + 6 hours'
		},
		{
			dice: [4],
			value:
				'{"equipment":{"name":"Magnesium strip","type":"equipment","description":"","equipped":false,"price":4,"quantity":1,"img":"systems/morkborg/icons/items/misc/magnesiumstrip.png","effects":[],"_id":"I4G2ofGuWZsaK3pO"}}',
			label: 'magnesium strip'
		},
		// samesies
		{ dice: [5], value: 'ruc', label: 'random unclean scroll' },
		{
			dice: [6],
			value:
				'{"equipment":{"name":"Sharp needle","type":"equipment","description":"","equipped":false,"price":3,"quantity":1,"img":"systems/morkborg/icons/items/misc/needle.png","effects":[],"_id":"ExDYtaqoJSSvY3xh"}}',
			label: 'sharp needle'
		},
		{
			dice: [7],
			value:
				'{"equipment":{"name":"Medicine box","type":"equipment","description":"<p>Stops bleeding/infection and +d6 HP. Presence + 4 uses.</p>","equipped":false,"price":15,"quantity":4,"img":"systems/morkborg/icons/items/misc/medicinebox.png","effects":[],"_id":"un4oZvjTD38YiSKx"}}',
			label: 'medicine chest Presence+4 uses (stops bleeding/infection and heals d6 HP)'
		},
		{
			dice: [8],
			value:
				'{"equipment":{"name":"Lockpicks","type":"equipment","description":"Metal File and Lockpicks","equipped":false,"price":5,"quantity":1,"img":"systems/morkborg/icons/items/misc/lockpicks.png","effects":[],"_id":"hqRlVEEDPq6jfJIM"}}',
			label: 'metal file and lockpicks'
		},
		{
			dice: [9],
			value:
				'{"equipment":{"name":"Bear trap","type":"equipment","description":"<p>Presence DR14 to spot, d8 damage.</p>","equipped":false,"price":20,"quantity":1,"img":"systems/morkborg/icons/items/misc/beartrap.png","effects":[],"_id":"AJfYTOZuMto5kqr0"}}',
			label: 'bear trap (Presence DR14 to spot, d8 damage)'
		},
		{ dice: [10], value: 'babomb', label: 'bomb (sealed bottle, d10 damage)' },
		{
			dice: [11],
			value:
				'{"equipment":{"name":"Poison (Red)","type":"equipment","description":"<p>Toughness DR12 or d10 damage. 3 doses.</p>","equipped":false,"price":20,"quantity":3,"img":"systems/morkborg/icons/items/misc/poison.png","effects":[],"_id":"PWnnJiir1b0BauJe"}}',
			label: 'a bottle of red poison d4 doses (Toughness DR12 or d10 damage)'
		},
		{
			dice: [12],
			value:
				'{"equipment":{"name":"Crucifix, silver","type":"equipment","description":"","equipped":false,"price":60,"quantity":1,"img":"systems/morkborg/icons/items/misc/crucifix_silver.png","effects":[],"_id":"taEYHJVN5MqwVWad"}}',
			label: 'silver crucifix'
		}
	]
};

export default TABLE_TWO;
