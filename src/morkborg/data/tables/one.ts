const TABLE_ONE: Table = {
	dice: [1, 'd', 6],
	rows: [
		{ dice: [1, 2], value: 'nothing', label: 'nothing' },
		{
			dice: [3],
			value:
				'{"equipment":{"name":"Backpack","type":"container","description":"<p>Holds 7 normal-sized items.</p>","equipped":false,"price":6,"quantity":1,"capacity":7,"img":"systems/morkborg/icons/items/containers/backpack.png","effects":[],"_id":"rvu5GKNoYKiiwfrL"}}',
			label: 'backpack for 7 normal-sized items'
		},
		{
			dice: [4],
			value:
				'{"equipment":{"name":"Sack","type":"container","description":"<p>Holds 10 normal-sized items.</p>","equipped":false,"price":3,"quantity":1,"capacity":10,"img":"systems/morkborg/icons/items/containers/sack.png","effects":[],"_id":"3YCK3phcKtAxcvkU"}}',
			label: 'sack for 10 normal-sized items'
		},
		{
			dice: [5],
			value:
				'{"equipment":{"name":"Small Wagon","type":"container","description":"","equipped":false,"price":25,"quantity":1,"capacity":15,"img":"systems/morkborg/icons/items/containers/wagon.png","effects":[],"_id":"eNcMJ17ikUaGuuBF"}}',
			label: 'small wagon or one item above of your choice'
		},
		{
			dice: [6],
			value:
				'{"follower":{"_id":"xZrAhOxxJSj2czwp","name":"Donkey","type":"follower","followerType":"container","description":"<p>Not bad.</p>","price":10,"quantity":1,"capacity":15,"img":"systems/morkborg/icons/items/containers/donkey.png","effects":[]}}',
			label: 'donkey, not bad'
		}
	]
};

export default TABLE_ONE;
