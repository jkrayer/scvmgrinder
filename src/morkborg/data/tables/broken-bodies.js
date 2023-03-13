const BROKEN_BODIES = {
	dice: [1, 'd', 20],
	rows: [
		{ dice: [1], value: 'Staring Manic Gaze', label: 'Staring Manic Gaze' },
		{
			dice: [2],
			value: 'Covered in (for some) blasphemous tattoos',
			label: 'Covered in (for some) blasphemous tattoos'
		},
		{ dice: [3], value: 'Rotting face, wears a mask', label: 'Rotting face, wears a mask' },
		{ dice: [4], value: 'Lost three toes, limps', label: 'Lost three toes, limps' },
		{ dice: [5], value: 'Starved: gaunt and pale', label: 'Starved: gaunt and pale' },
		// THis one needs equipment
		{
			dice: [6],
			value:
				'{"weapon":{"_id":"6c3ae926d04a2aba5db4031c1b0a5260","name":"Rusting Hook","type":"weapon","weaponType":"melee","description":"","damageDie":"1d6","handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"","effects":[]}}',
			label: 'One hand replaced with a rusting hook. (d6 damage)'
		},
		{ dice: [7], value: 'Decaying teeth', label: 'Decaying teeth' },
		{
			dice: [8],
			value: 'Hauntingly beautify, unnervingly clean',
			label: 'Hauntingly beautify, unnervingly clean'
		},
		{ dice: [9], value: 'Hands caked with sores', label: 'Hands caked with sores' },
		{
			dice: [10],
			value: 'Cataracts slowly but surely spreading in both eyes',
			label: 'Cataracts slowly but surely spreading in both eyes'
		},
		{
			dice: [11],
			value: 'Long tangled hair, at least one cockroach in residence',
			label: 'Long tangled hair, at least one cockroach in residence'
		},
		{ dice: [12], value: 'Broken crushed ears', label: 'Broken crushed ears' },
		{
			dice: [13],
			value: 'Juddering and studttering from nerve damage or stress',
			label: 'Juddering and studttering from nerve damage or stress'
		},
		{ dice: [14], value: 'Corpulent, ravenous, drooling', label: 'Corpulent, ravenous, drooling' },
		{
			dice: [15],
			value: 'One hand lacks thumb and index finger, grips like a lobster',
			label: 'One hand lacks thumb and index finger, grips like a lobster'
		},
		{ dice: [16], value: "Red, swollen alcoholic's nose", label: "Red, swollen alcoholic's nose" },
		{
			dice: [17],
			value: 'Resting maniac face, making friends is hard',
			label: 'Resting maniac face, making friends is hard'
		},
		{
			dice: [18],
			value: "Chronis athelte's foot, stinks",
			label: "Chronis athelte's foot, stinks"
		},
		{
			dice: [19],
			value: 'Recently slashed and stinking eye, covered with a patch',
			label: 'Recently slashed and stinking eye, covered with a patch'
		},
		{
			dice: [20],
			value: 'Nails cracked and black, maybe about to drop off ',
			label: 'Nails cracked and black, maybe about to drop off '
		}
	]
};

export default BROKEN_BODIES;
