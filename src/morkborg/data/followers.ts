const FOLLOWERS: Follower[] = [
	{
		_id: 'xZrAhOxxJSj2czwp',
		name: 'Donkey',
		type: 'follower',
		followerType: 'container',
		description: '<p>Not bad.</p>',
		price: 10,
		quantity: 1,
		capacity: 15,
		// img: "systems/morkborg/icons/items/containers/donkey.png",
		effects: []
		// equipment:[]
	},
	{
		_id: '0bddHriOAq9fEstq',
		name: 'Barbarister the Incredible Horse',
		type: 'follower',
		followerType: 'buffer',
		description:
			'<p>Barbarister is magical, intelligent, arrogant and vain. He can also talk. If you can persuade him to care, Barbarister occasionally adds +2 to Presence tests involving logic and intellect. The horse may be smarter than you and is quite aware of this.</p>',
		price: null,
		quantity: 1,
		capacity: null,
		// img: "systems/morkborg/tokens/followers/barbarister_bw.png",
		effects: [],
		sheet: {
			abilities: {
				agility: 0,
				presence: 0,
				strength: 0,
				toughness: 0
			},
			hitpoints: {
				current: 8,
				maximum: 8
			},
			morale: 7,
			silver: 0,
			speciality: '',
			trait: '',
			value: ''
		}
	},
	{
		_id: '46A26aWQ3yUP3vbi',
		name: 'Monkey',
		type: 'follower',
		followerType: 'combatant',
		description: '<p>d4 monkeys that ignore but love you (d4+2 HP, punch/bite d4).</p>',
		price: null,
		quantity: 1,
		capacity: null,
		// img: 'systems/morkborg/tokens/followers/monkey.png',
		effects: [],
		sheet: {
			abilities: {
				agility: 0,
				presence: 0,
				strength: 0,
				toughness: 0
			},
			hitpoints: {
				current: 3,
				maximum: 3
			},
			morale: 7,
			silver: 0,
			speciality: '',
			trait: '',
			value: '',
			weapons: [
				{
					_id: 'SmPvCHM5fQRwKC0W',
					name: 'Monkey Punch',
					description: '',
					type: 'weapon',
					weaponType: 'melee',
					damageDie: 4,
					handed: 1,
					price: 0,
					equipped: true,
					broken: false,
					usesAmmo: false,
					ammoType: null,
					// img: 'systems/morkborg/icons/followeritems/punch.png',
					effects: []
				}
			],
			armor: {
				tier: {
					current: 1,
					maximum: 1
				}
			}
		}
	},
	{
		_id: 'ErBhN8ay6l22MKHH',
		name: 'Ancient Gore-Hound',
		type: 'follower',
		followerType: 'combatant',
		description:
			'<p>Asthmatic, deluded and on its last legs, this wizened creature still has a superb nose and can sniffle up treasure in the most disgusting debris. Attacks with DR10 (bite d6). Defends with DR12, 10 HP. Becomes frenzied around goblins and berserkers.</p>',
		price: null,
		quantity: 1,
		capacity: null,
		// img: 'systems/morkborg/tokens/followers/hound.png',
		effects: [],
		sheet: {
			abilities: {
				agility: 0,
				presence: 0,
				strength: 0,
				toughness: 0
			},
			hitpoints: {
				current: 10,
				maximum: 10
			},
			morale: 7,
			silver: 0,
			speciality: '',
			trait: '',
			value: '',
			weapons: [
				{
					_id: 'Zus6SwUmNDeXoDtT',
					name: 'Gore-hound Bite',
					type: 'weapon',
					weaponType: 'melee',
					damageDie: 6,
					handed: 1,
					price: 0,
					equipped: true,
					broken: false,
					usesAmmo: false,
					ammoType: null,
					// img: 'systems/morkborg/icons/followeritems/fangs.png',
					effects: [],
					description: '<p>Attacks with DR10 (bite d6).</p>'
				}
			],
			armor: {
				tier: {
					current: 1,
					maximum: 1
				}
			}
		}
	},
	{
		_id: 'KbNCwXUcl7ca9JcV',
		name: 'Small but vicious dog',
		type: 'follower',
		followerType: 'combatant',
		description: '<p>d6+2 HP,&nbsp; bite d4,&nbsp; only obeys you.</p>',
		price: null,
		quantity: 1,
		capacity: null,
		// img: 'systems/morkborg/tokens/followers/dog.png',
		effects: [],
		sheet: {
			abilities: {
				agility: 0,
				presence: 0,
				strength: 0,
				toughness: 0
			},
			hitpoints: {
				current: 3,
				maximum: 3
			},
			morale: 7,
			silver: 0,
			speciality: '',
			trait: '',
			value: '',
			weapons: [
				{
					_id: '0pUjQCKinpkKEphitpoints',
					name: 'Small Dog Bite',
					type: 'weapon',
					description: '',
					weaponType: 'melee',
					damageDie: 4,
					handed: 1,
					price: 0,
					equipped: true,
					broken: false,
					usesAmmo: false,
					ammoType: null,
					// img: 'systems/morkborg/icons/followeritems/fangs.png',
					effects: []
				}
			],
			armor: {
				tier: {
					current: 1,
					maximum: 1
				}
			}
		}
	},
	{
		_id: 'd6pGFaOVukoH4bpB',
		name: 'Hawk as weapon',
		type: 'follower',
		followerType: 'combatant',
		description:
			'<p>Your crafty almost-intelligent hawk is loyal only to you. Even without shared language, you understand its cries as it keeps watch, scouts and swoops to attack foes. Attacks/ defence DR10 (claws/bite D4), HP 8.</p>',
		price: null,
		quantity: 1,
		capacity: null,
		// img: 'systems/morkborg/tokens/followers/hawk.png',
		effects: [],
		sheet: {
			attack: 'DR10',
			defense: 'DR10',
			abilities: {
				agility: 0,
				presence: 0,
				strength: 0,
				toughness: 0
			},
			hitpoints: {
				current: 8,
				maximum: 8
			},
			morale: 7,
			silver: 0,
			speciality: '',
			trait: '',
			value: '',
			weapons: [
				{
					_id: 'WdnKKXEwOX5HFTfx',
					name: 'Hawk Talons',
					type: 'weapon',
					description: '',
					weaponType: 'melee',
					damageDie: 4,
					handed: 2,
					price: 0,
					equipped: true,
					broken: false,
					usesAmmo: false,
					ammoType: null,
					// img: 'systems/morkborg/icons/followeritems/fangs.png',
					effects: []
				}
			],
			armor: {
				tier: {
					current: 1,
					maximum: 1
				}
			}
		}
	},
	{
		_id: 'pNlrszU8gNi2VYWn',
		name: 'Poltroon the Court Jester',
		type: 'follower',
		followerType: 'buffer',
		description:
			'<p>While practically useless, personally irritating and an emotional drain, Poltroon&rsquo;s capering actually makes enemies lose their focus in combat. For the first two rounds you and your allies get +2 on attack/defence.</p>',
		price: null,
		quantity: 1,
		capacity: null,
		// img: 'systems/morkborg/tokens/followers/jester.png',
		effects: [],
		sheet: {
			abilities: {
				agility: 0,
				presence: 0,
				strength: 0,
				toughness: 0
			},
			hitpoints: {
				maximum: 8,
				current: 8
			},
			morale: 7,
			silver: 0,
			speciality: '',
			trait: '',
			value: ''
		}
	},
	{
		_id: 'XRGIHRqjF2sxHOnw',
		name: 'Hamfund the Squire',
		type: 'follower',
		followerType: 'buffer',
		description:
			'<p>This intensely cowardly servant acts only as guardian for the scabbard of the cursed sword Eurekia. Once per combat, if Ham can be found, Eurekia may be drawn. The sword does 2d6 damage, and for every swing of Eurekia roll a d6. On a 1 the squire is slain and Eurekia vanishes forever.</p>',
		price: null,
		quantity: 1,
		capacity: null,
		// img: 'systems/morkborg/icons/classitems/hamfund.png',
		effects: [],
		sheet: {
			abilities: {
				agility: 0,
				presence: 0,
				strength: 0,
				toughness: 0
			},
			hitpoints: {
				maximum: 8,
				current: 8
			},
			morale: 7,
			silver: 0,
			speciality: '',
			trait: '',
			value: ''
		}
	}
];

export default FOLLOWERS;
