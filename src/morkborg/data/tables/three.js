const TABLE_THREE = {
	dice: [1, 'd', 12],
	rows: [
		{
			dice: [1],
			value:
				'{"equipment":{"name":"Rope","type":"equipment","description":"<p>30 feet.</p>","equipped":false,"price":4,"quantity":1,"img":"systems/morkborg/icons/items/misc/rope.png","effects":[],"_id":"PqBFT58mU6EJ20HM"}}',
			label: 'life elixir d4 doses (heals d6 HP and removes infection)'
		},
		{
			dice: [2],
			value:
				'{"equipment":{"name":"Backpack","type":"container","description":"<p>Holds 7 normal-sized items.</p>","equipped":false,"price":6,"quantity":1,"capacity":7,"img":"systems/morkborg/icons/items/containers/backpack.png","effects":[],"_id":"rvu5GKNoYKiiwfrL"}}',
			label: 'random sacred scroll'
		},
		{
			dice: [3],
			value:
				'{"equipment":{"name":"Sack","type":"container","description":"<p>Holds 10 normal-sized items.</p>","equipped":false,"price":3,"quantity":1,"capacity":10,"img":"systems/morkborg/icons/items/containers/sack.png","effects":[],"_id":"3YCK3phcKtAxcvkU"}}',
			label: 'small but vicious dog (d6+2 HP, bite d4, only obeys you)'
		},
		{
			dice: [4],
			value:
				'{"equipment":{"name":"Small Wagon","type":"container","description":"","equipped":false,"price":25,"quantity":1,"capacity":15,"img":"systems/morkborg/icons/items/containers/wagon.png","effects":[],"_id":"eNcMJ17ikUaGuuBF"}}',
			label: 'd4 monkeys that ignore but love you (d4+2 HP, punch/bite d4)'
		},
		{ dice: [5], value: 'follower', label: 'exquisite perfume worth 25s' },
		{ dice: [6], value: 'followe', label: 'toolbox 10 nails, tongs, hammer, small saw and drill' },
		{
			dice: [7],
			value: 'follow',
			label: 'heavy chain 15 feet'
		},
		{ dice: [8], value: 'follo', label: 'grappling hook' },
		{
			dice: [9],
			value: 'foll',
			label: 'shield (-1 HP damage or have the shield break to ignore one attack)'
		},
		{ dice: [10], value: 'fol', label: 'crowbar (d4 damage)' },
		{
			dice: [11],
			value: 'fo',
			label: 'lard (may function as 5 meals in a pinch)'
		},
		{ dice: [12], value: 'f', label: 'tent' }
	]
};

export default TABLE_THREE;
