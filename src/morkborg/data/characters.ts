const CHARACTERS: RawClassData[] = [
	{
		_id: '7e852bda-130c-4bc4-acdf-4b0cdbbb222c',
		name: 'No Class',
		silver: [2, 'd', 6, 'x', 10],
		food: [1, 'd', 4],
		tableOne: 6,
		tableTwo: 12,
		tableThree: 12,
		weaponTable: 10,
		armorTable: 4,
		abilities: [
			{ key: 'agility', name: 'Agility', dice: [3, 'd', 6] },
			{ key: 'presence', name: 'Presence', dice: [3, 'd', 6] },
			{ key: 'strength', name: 'Strength', dice: [3, 'd', 6] },
			{ key: 'toughness', name: 'Toughness', dice: [3, 'd', 6] }
		],
		hitPoints: [1, 'd', 8],
		terribleTraits: true,
		brokenBodies: true,
		badHabits: true,
		origin: {},
		classFeature: {},
		omens: 4
	},
	{
		_id: '11f8ab09-1fc8-48fc-af9e-34b29210c5e7',
		name: 'Fanged Deserter',
		silver: [2, 'd', 6, 'x', 10],
		food: [1, 'd', 4],
		tableOne: 6,
		tableTwo: 12,
		tableThree: 12,
		weaponTable: 10,
		armorTable: 4,
		abilities: [
			{ key: 'agility', name: 'Agility', dice: [3, 'd', 6, '-', 1] },
			{ key: 'presence', name: 'Presence', dice: [3, 'd', 6, '-', 1] },
			{ key: 'strength', name: 'Strength', dice: [3, 'd', 6, '+', 2] },
			{ key: 'toughness', name: 'Toughness', dice: [3, 'd', 6] }
		],
		hitPoints: [1, 'd', 8],
		terribleTraits: true,
		brokenBodies: true,
		badHabits: true,
		origin: {
			title: 'Earliest Memories',
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value: 'background:A burnt-black building in Sarkash. Your home?',
					label: 'A burnt-black building in Sarkash. Your home?'
				},
				{
					dice: [2],
					value: 'background:A derelict rotting ship rolling endlessly across a grey sea.',
					label: 'A derelict rotting ship rolling endlessly across a grey sea.'
				},
				{
					dice: [3],
					value: 'background:A brothel in Schleswig. Quite a friendly environment.',
					label: 'A brothel in Schleswig. Quite a friendly environment.'
				},
				{
					dice: [4],
					value:
						'background:Sleeping with dogs in the corner of an inn, waiting for someone to return.',
					label: 'Sleeping with dogs in the corner of an inn, waiting for someone to return.'
				},
				{
					dice: [5],
					value: 'background:Following an army in eastern Wästland.',
					label: 'Following an army in eastern Wästland.'
				},
				{
					dice: [6],
					value: 'background:Suckling a wolf in the wild of Bergen Chrypt.',
					label: 'Suckling a wolf in the wild of Bergen Chrypt.'
				}
			]
		},
		classFeature: {
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value:
						'{"equipment":{"_id":"Z2IiivTmmlSKdgoX","name":"Crumpled Monster Mask","type":"equipment","description":"<p>Scares things</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/crumpledmonstermask.png","effects":[]}}',
					label:
						'<b>Crumpled Monster Mask</b> Strikes primitive fear into lesser creatures like goblins, gnoums and children. While worn, they check Morale every round.'
				},
				{
					dice: [2],
					value:
						'{"weapon":{"_id":"7Ivp3hzydrBn4W7s","name":"The Brown Scimitar of Galgenbeck","type":"weapon","weaponType":"melee","damageDie":6,"handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/classitems/brownscimitar.png","effects":[{"toHit":"DR10"},{"defence":"DR10"}]}}',
					label:
						'<b>The Brown Scimitar of Galgenbeck</b> A stinking sword you pulled from a military shit-ditch. D6 damage. DR10 attack and defence while you wield it. 1 in 6 chance a wounded enemy is smitten with potent sepsis, dying in 10 minutes.'
				},
				{
					dice: [3],
					value:
						'{"equipment":{"_id":"Jh2uzOSivFQmI1gv","name":"Wizard Teeth","type":"equipment","description":"<p>Four weird teeth rattle within a blackened pouch. Before battle roll a d6 for each one. For every 6 one of your attacks deals maximum damage.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/wizardteeth.png","effects":[]}}',
					label:
						'<b>Wizard Teeth</b> Four weird teeth rattle within a blackened pouch. Before battle roll a d6 for each one. For every 6 one of your attacks deals maximum damage.'
				},
				{
					dice: [4],
					value: `{"weapon":{"_id":"z5DDfEekUZSqXEgF","name":"Old Sigûrd's sling","type":"weapon","weaponType":"ranged","damageDie":[2,"d",4],"handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":true,"ammoType":"sling stone","img":"systems/morkborg/icons/classitems/sigurd-sling.png","effects":[]}}`,
					label:
						'<b>Old Sigûrd’s sling</b> Sigûrd was the strongest man whose throat you ever gnawed. Woven from his long grey hair, this sling has never failed you. 2d4 damage, requires fist-sized rocks which, perhaps regrettably, are everywhere.'
				},
				{
					dice: [5],
					value:
						'{"follower":{"_id":"ErBhN8ay6l22MKHH","name":"Ancient Gore-Hound","type":"follower","followerType":"combatant","description":"<p>Asthmatic, deluded and on its last legs, this wizened creature still has a superb nose and can sniffle up treasure in the most disgusting debris. Attacks with DR10 (bite d6). Defends with DR12, 10 HP. Becomes frenzied around goblins and berserkers.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/hound.png","effects":[],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"value":10,"max":10},"morale":7,"silver":null,"speciality":"","trait":"","value":"","weapons":[{"_id":"Zus6SwUmNDeXoDtT","name":"Gore-hound Bite","type":"weapon","weaponType":"melee","damageDie":6,"handed":1,"price":0,"equipped":true,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/followeritems/fangs.png","effects":[],"description":"<p>Attacks with DR10 (bite d6).</p>"}],"armor":{"tier":{"value":1,"max":1}}},"items":[]}}',
					label:
						'<b>Ancient Gore-Hound</b> Asthmatic, deluded and on its last legs, this wizened creature still has a superb nose and can sniffle up treasure in the most disgusting debris. Attacks with DR10 (bite d6). Defends with DR12, 10 HP. Becomes frenzied around goblins and berserkers.'
				},
				{
					dice: [6],
					value: `{"weapon":{"_id":"Z67qRvYbqREr7Y0I","name":"The Shoe of Death's Horse","description":"","type":"weapon","weaponType":"ranged","damageDie":4,"handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/classitems/horseshoe.png","effects":[{"toHit":"DR10"}]}}`,
					label:
						'<b>The Shoe of Death’s Horse</b> It looks normal but since finding it in an obscure crypt you are convinced this shoe came from the horse of Death himself. In your hands it hits with DR10, d4 damage. 1 in 6 chance the shoe smashes the skull, instantly killing small-to-medium sized creatures. The shoe returns to your hand like a boomerang.'
				}
			]
		},
		omens: 2,
		naturalWeapon: {
			_id: 'fangedDeserterBite',
			name: 'Bite attack',
			type: 'weapon',
			weaponType: 'melee',
			damageDie: 6,
			handed: 0,
			price: 0,
			equipped: true,
			broken: false,
			usesAmmo: false,
			ammoType: null,
			effects: [
				'DR10 to attack.',
				'You mu st be close to your target. 1–2 on d6 chance the enemy gets a free attack.'
			]
		}
	},
	{
		_id: 'f17362ef-e8c3-4b8a-bbab-1728015e4160',
		name: 'Gutterborn Scum',
		silver: [1, 'd', 6, 'x', 10],
		food: [1, 'd', 4],
		tableOne: 6,
		tableTwo: 12,
		tableThree: 12,
		weaponTable: 6,
		armorTable: 2,
		abilities: [
			{ key: 'agility', name: 'Agility', dice: [3, 'd', 6] },
			{ key: 'presence', name: 'Presence', dice: [3, 'd', 6] },
			{ key: 'strength', name: 'Strength', dice: [3, 'd', 6, '-', 2] },
			{ key: 'toughness', name: 'Toughness', dice: [3, 'd', 6] }
		],
		hitPoints: [1, 'd', 6],
		terribleTraits: true,
		brokenBodies: true,
		badHabits: true,
		origin: {
			title: 'Bad Birth',
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value: 'background:Dumped onto a moving shit-cart still in your birth caul.',
					label: 'Dumped onto a moving shit-cart still in your birth caul.'
				},
				{
					dice: [2],
					value:
						'background:Mother hanged from a tree outside of Galgenbeck, you fell from the corpse.',
					label: 'Mother hanged from a tree outside of Galgenbeck, you fell from the corpse.'
				},
				{
					dice: [3],
					value: 'background:Raised by rats in the gutters of Grift.',
					label: 'Raised by rats in the gutters of Grift.'
				},
				{
					dice: [4],
					value: 'background:Kicked and beaten beneath a baker’s table in Schleswig.',
					label: 'Kicked and beaten beneath a baker’s table in Schleswig.'
				},
				{
					dice: [5],
					value: 'background:Escaped the Tvelandian orphanarium.',
					label: 'Escaped the Tvelandian orphanarium.'
				},
				{
					dice: [6],
					value: 'background:Educated by outlaws in a hovel south of Alliáns.',
					label: 'Educated by outlaws in a hovel south of Alliáns.'
				}
			]
		},
		classFeature: {
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value:
						'feature:<b>Coward’s Jab</b> When attacking by surprise test Agility DR10. On a success you automatically hit once with a light one-handed weapon, dealing normal damage +3.',
					label:
						'<b>Coward’s Jab</b> When attacking by surprise test Agility DR10. On a success you automatically hit once with a light one-handed weapon, dealing normal damage +3.'
				},
				{
					dice: [2],
					value:
						'feature:<b>Filthy Fingersmith</b> Your snaky little digits get into pockets and pick locks with a DR8 Agility test. You also begin with lockpicks!',
					label:
						'<b>Filthy Fingersmith</b> Your snaky little digits get into pockets and pick locks with a DR8 Agility test. You also begin with lockpicks!'
				},
				{
					dice: [3],
					value:
						'feature:<b>Abominable Gob Lobber</b> Your phlegm is viscous, lumpy, vile and ballistically accurate at short range. You can spit d2 times during a fight. Roll a DR8 Presence test for accuracy. Targets are blinded, retching and vomiting for d4 rounds. Anyone witnessing this—friend and foe—must make a Toughness test to not also vomit. PCs test DR10 and enemies DR12.',
					label:
						'<b>Abominable Gob Lobber</b> Your phlegm is viscous, lumpy, vile and ballistically accurate at short range. You can spit d2 times during a fight. Roll a DR8 Presence test for accuracy. Targets are blinded, retching and vomiting for d4 rounds. Anyone witnessing this—friend and foe—must make a Toughness test to not also vomit. PCs test DR10 and enemies DR12.'
				},
				{
					dice: [4],
					value:
						'feature:<b>Escaping Fate</b> Every time you use an omen there is a 50% chance it is not spent.',
					label:
						'<b>Escaping Fate</b> Every time you use an omen there is a 50% chance it is not spent.'
				},
				{
					dice: [5],
					value:
						'feature:<b>Excretal Stealth</b> You have an astounding, almost preternatural ability to hide in muck, debris and filth. When hidden in these conditions a DR16 Presence test is required to notice you.',
					label:
						'<b>Excretal Stealth</b> You have an astounding, almost preternatural ability to hide in muck, debris and filth. When hidden in these conditions a DR16 Presence test is required to notice you.'
				},
				{
					dice: [6],
					value:
						'feature:<b>Dodging Death</b> You are so unpleasant, irrelevant, disgusting and vile even Death would rather avoid you if it can. On death, if there is even the slightest possibility that you survived, there is a 50% chance that you did. If successful, after 10 rounds you pop back up with d4 HP and an unlikely explanation of your escape.',
					label:
						'<b>Dodging Death</b> You are so unpleasant, irrelevant, disgusting and vile even Death would rather avoid you if it can. On death, if there is even the slightest possibility that you survived, there is a 50% chance that you did. If successful, after 10 rounds you pop back up with d4 HP and an unlikely explanation of your escape.'
				}
			]
		},
		omens: 2
	},
	{
		_id: 'd781a4fb-1f29-4041-8033-eb788561a17d',
		name: 'Esoteric Hermit',
		silver: [1, 'd', 6, 'x', 10],
		food: [1, 'd', 4],
		tableOne: 6,
		tableTwo: 12,
		tableThree: 12,
		weaponTable: 4,
		armorTable: 2,
		abilities: [
			{ key: 'agility', name: 'Agility', dice: [3, 'd', 6] },
			{ key: 'presence', name: 'Presence', dice: [3, 'd', 6, '+', 2] },
			{ key: 'strength', name: 'Strength', dice: [3, 'd', 6, '-', 2] },
			{ key: 'toughness', name: 'Toughness', dice: [3, 'd', 6] }
		],
		hitPoints: [1, 'd', 4],
		terribleTraits: true,
		brokenBodies: true,
		badHabits: true,
		origin: {
			title: 'Eldritch Origins',
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value:
						'background:Awakening, adult, in a ritual circle underneath the northern bridge to Grift.',
					label: 'Awakening, adult, in a ritual circle underneath the northern bridge to Grift.'
				},
				{
					dice: [2],
					value:
						'background:Wandered, memoryless, from the mouth of a cavern at the cliffs of Terion.',
					label: 'Wandered, memoryless, from the mouth of a cavern at the cliffs of Terion.'
				},
				{
					dice: [3],
					value:
						'background:Single child survivor of an incident in the Valley of the Unfortunate Undead.',
					label: 'Single child survivor of an incident in the Valley of the Unfortunate Undead.'
				},
				{
					dice: [4],
					value:
						'background:Dying of plague in a Bergen Chrypt hovel, you touched something from outside.',
					label: 'Dying of plague in a Bergen Chrypt hovel, you touched something from outside.'
				},
				{
					dice: [5],
					value:
						'background:An average individual until you encountered something in a dim glade in Sarkash.',
					label: 'An average individual until you encountered something in a dim glade in Sarkash.'
				},
				{
					dice: [6],
					value:
						'background:Raised on a lonely island in Lake Onda. No one else has ever heard of this island and you can’t return.',
					label:
						'Raised on a lonely island in Lake Onda. No one else has ever heard of this island and you can’t return.'
				}
			]
		},

		classFeature: {
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value:
						'feature:<b>Master of Fate</b> What use are maps when the substance of causality itself is open to you? You know the right way with a DR8 Presence test.',
					label:
						'<b>Master of Fate</b> What use are maps when the substance of causality itself is open to you? You know the right way with a DR8 Presence test.'
				},
				{
					dice: [2],
					value:
						'feature:<b>A Book of Boiling Blood</b> You may open and read from this book once a day. Your enemy must make a DR12 test to prevent this. If they fail D2 Berserker- slayers appear from the depths of a forgotten dimension of blood. Roll a D6. On a 1–4 these creatures fight alongside you. On a 5–6 they turn on you, attempting to kill you and destroy the book. After the battle they return to their imprisonment.',
					label:
						'<b>A Book of Boiling Blood</b> You may open and read from this book once a day. Your enemy must make a DR12 test to prevent this. If they fail D2 Berserker- slayers appear from the depths of a forgotten dimension of blood. Roll a D6. On a 1–4 these creatures fight alongside you. On a 5–6 they turn on you, attempting to kill you and destroy the book. After the battle they return to their imprisonment.'
				},
				{
					dice: [3],
					value:
						'feature:<b>Speaker of Truths</b> Twice per day use your wisdom, knowledge, advice and inner calm to bring clarity to a creature of your choice. The DR of the next test they undertake is lowered by 4.',
					label:
						'<b>Speaker of Truths</b> Twice per day use your wisdom, knowledge, advice and inner calm to bring clarity to a creature of your choice. The DR of the next test they undertake is lowered by 4.'
				},
				{
					dice: [4],
					value:
						'feature:<b>Initiate of the Invisible College</b> Once per day you may summon D2 scrolls, whose power can be used only once. Roll a d4, on a 1–2 the scrolls are sacred, on a 3–4, unclean. If the scrolls are not used before sunrise they turn to ash.',
					label:
						'<b>Initiate of the Invisible College</b> Once per day you may summon D2 scrolls, whose power can be used only once. Roll a d4, on a 1–2 the scrolls are sacred, on a 3–4, unclean. If the scrolls are not used before sunrise they turn to ash.'
				},
				{
					dice: [5],
					value:
						'{"equipment":{"name":"Bard of the Undying","type":"misc","description":"<b>Bard of the Undying</b> You learnt your melodies in the Otherworld. The music of your Harp gives +D4 on reaction rolls.","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"","effects":[],"_id":"s5IPLLQcYedhA5mI"}}',
					label:
						'<b>Bard of the Undying</b> You learnt your melodies in the Otherworld. The music of your Harp gives +D4 on reaction rolls.'
				},
				{
					dice: [6],
					value:
						'{"follower":{"_id":"d6pGFaOVukoH4bpB","name":"Hawk as weapon","type":"follower","followeType":"combatant","description":"<p>Your crafty almost-intelligent hawk is loyal only to you. Even without shared language, you understand its cries as it keeps watch, scouts and swoops to attack foes. Attacks/ defence DR10 (claws/bite D4), HP 8.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/hawk.png","effects":[],"sheet":{"attack":"DR10","defense":"DR10","abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"value":8,"max":8},"morale":7,"silver":null,"speciality":"","trait":"","value":"","weapons":[{"_id":"WdnKKXEwOX5HFTfx","name":"Hawk Talons","type":"weapon","weaponType":"melee","damageDie":4,"handed":2,"price":0,"equipped":true,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/followeritems/fangs.png","effects":[]}],"armor":{"tier":{"value":0,"max":0}}},"items":[]}}',
					label:
						'<b>Hawk as weapon</b> Your crafty almost-intelligent hawk is loyal only to you. Even without shared language, you understand its cries as it keeps watch, scouts and swoops to attack foes. Attacks/defence DR10 (claws/bite D4), HP 8.'
				}
			]
		},

		omens: 4
	},
	{
		_id: 'e6490e4f-5bd2-49d3-a1a2-17848e5936ec',
		name: 'Wretched Royalty',
		silver: [4, 'd', 6, 'x', 10],
		food: [1, 'd', 4],
		tableOne: 6,
		tableTwo: 12,
		tableThree: 12,
		weaponTable: 8,
		armorTable: 3,
		abilities: [
			{ key: 'agility', name: 'Agility', dice: [3, 'd', 6] },
			{ key: 'presence', name: 'Presence', dice: [3, 'd', 6] },
			{ key: 'strength', name: 'Strength', dice: [3, 'd', 6] },
			{ key: 'toughness', name: 'Toughness', dice: [3, 'd', 6] }
		],
		hitPoints: [1, 'd', 6],
		terribleTraits: true,
		brokenBodies: true,
		badHabits: true,
		origin: {
			title: 'Things were going so well, until&hellip;',
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value: 'background:your Wästland palace was reduced to rubble.',
					label: 'your Wästland palace was reduced to rubble.'
				},
				{
					dice: [2],
					value: 'background:your caravan kingdom of Tveland fell into penury.',
					label: 'your caravan kingdom of Tveland fell into penury.'
				},
				{
					dice: [3],
					value: 'background:King Fathmu IX’s brother Zigmund, your father, was murdered.',
					label: 'King Fathmu IX’s brother Zigmund, your father, was murdered.'
				},
				{
					dice: [4],
					value: 'background:the southern empire of Südglans sank into the sea.',
					label: 'the southern empire of Südglans sank into the sea.'
				},
				{
					dice: [5],
					value: 'background:Anthelia demanded a gift of noble blood.',
					label: 'Anthelia demanded a gift of noble blood.'
				},
				{
					dice: [6],
					value:
						'background:two young princes were kidnapped west of Bergen Chrypt and disappeared into the black crevasse of the eastern slopes.',
					label:
						'two young princes were kidnapped west of Bergen Chrypt and disappeared into the black crevasse of the eastern slopes.'
				}
			]
		},
		classFeature: {
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value:
						'{"weapon":{"_id":"pLzhbrwoC6FIt9c5","name":"The Blade of your Ancestors","type":"weapon","weaponType":"melee","description":"<p>This magnificent and clearly magical talking sword is foppish, unreliable and quietly despises you. It taunts your failures and, if continually disappointed, develops a 1 in 6 chance to &lsquo;accidentally&rsquo; attack you or your companions. Deals d6+1 damage. Attack/Defence DR is 10.</p>","damageDie":"1d6+1","handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/classitems/bladeofyourancestors.png","effects":[{"toHit":"DR10"},{"defence":"DR10"}]}}',
					label:
						'<b>The Blade of your Ancestors</b> This magnificent and clearly magical talking sword is foppish, unreliable and quietly despises you. It taunts your failures and, if continually disappointed, develops a 1 in 6 chance to ‘accidentally’ attack you or your companions. Deals d6+1 damage. Attack/Defence DR is 10.'
				},
				{
					dice: [2],
					value:
						'{"follower":{"_id":"pNlrszU8gNi2VYWn","name":"Poltroon the Court Jester","type":"follower","followerType":"buffer","description":"<p>While practically useless, personally irritating and an emotional drain, Poltroon&rsquo;s capering actually makes enemies lose their focus in combat. For the first two rounds you and your allies get +2 on attack/defence.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/jester.png","effects":["possibly buff effect here"],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"max":8,"value":8},"morale":7,"silver":0,"speciality":"","trait":"","value":""},"items":[]}}',
					label:
						'<b>‘Poltroon’ the Court Jester</b> While practically useless, personally irritating and an emotional drain, Poltroon’s capering actually makes enemies lose their focus in combat. For the first two rounds you and your allies get +2 on attack/defence.'
				},
				{
					dice: [3],
					value:
						'{"follower":{"_id":"0bddHriOAq9fEstq","name":"Barbarister the Incredible Horse","type":"follower","followerType":"buffer","description":"<p>Barbarister is magical, intelligent, arrogant and vain. He can also talk. If you can persuade him to care, Barbarister occasionally adds +2 to Presence tests involving logic and intellect. The horse may be smarter than you and is quite aware of this.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/barbarister_bw.png","effects":["possibly buff effect here"],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"max":8,"value":8},"morale":7,"silver":0,"speciality":"","trait":"","value":""},"items":[]}}',
					label:
						'<b>Barbarister the Incredible Horse</b> Barbarister is magical, intelligent, arrogant and vain. He can also talk. If you can persuade him to care, Barbarister occasionally adds +2 to Presence tests involving logic and intellect. The horse may be smarter than you and is quite aware of this.'
				},
				{
					dice: [4],
					value:
						'{"follower":{"_id":"XRGIHRqjF2sxHOnw","name":"Hamfund the Squire","type":"follower","followerType":"buffer","description":"<p>This intensely cowardly servant acts only as guardian for the scabbard of the cursed sword Eurekia. Once per combat, if Ham can be found, Eurekia may be drawn. The sword does 2d6 damage, and for every swing of Eurekia roll a d6. On a 1 the squire is slain and Eurekia vanishes forever.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/icons/classitems/hamfund.png","effects":["possibly buff effect here"],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"max":8,"value":8},"morale":7,"silver":0,"speciality":"","trait":"","value":""},"items":[]}}',
					label:
						'<b>Hamfund the Squire</b> This intensely cowardly servant acts only as guardian for the scabbard of the cursed sword Eurekia. Once per combat, if Ham can be found, Eurekia may be drawn. The sword does 2d6 damage, and for every swing of Eurekia roll a d6. On a 1 the squire is slain and Eurekia vanishes forever.'
				},
				{
					dice: [5],
					value:
						'{"equipment":{"name":"The Snake-Skin Gift","type":"container","description":"<p>An expensive sandalwood box bound in snakeskin. It contains a seemingly ordinary dagger, wrapped in silk. The dagger does d4 damage but on a 1 the target dies immediately of deadly poison weeping from the blade.</p>","equipped":false,"price":6,"quantity":1,"capacity":7,"img":"systems/morkborg/icons/classitems/snakeskingift.png","effects":[],"_id":"2WFqsHRF4UuaJ3X2"}}',
					label:
						'<b>The Snake-Skin Gift</b> An expensive sandalwood box bound in snakeskin. It contains a seemingly ordinary dagger, wrapped in silk. The dagger does d4 damage but on a 1 the target dies immediately of deadly poison weeping from the blade.'
				},
				{
					dice: [6],
					value:
						'{"equipment":{"name":"Horn of the Schleswig Lords!","type":"misc","description":"<p>Once per day release a blare from this dented old trumpet and test Presence DR12. One creature may make their next non-combat test an automatic success.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/trumpet.png","effects":[],"_id":"3Q5h6hShVlzykRzG"}}',
					label:
						'<b>Horn of the Schleswig Lords!</b> Once per day release a blare from this dented old trumpet and test Presence DR12. One creature may make their next non-combat test an automatic success.'
				}
			]
		},

		omens: 2
	},
	{
		_id: 'bd957fad-7ec5-4315-bfad-622089d5a197',
		name: 'Heretical Priest',
		silver: [3, 'd', 6, 'x', 10],
		food: [1, 'd', 4],
		tableOne: 6,
		tableTwo: 12,
		tableThree: 12,
		weaponTable: 8,
		armorTable: 4,
		abilities: [
			{ key: 'agility', name: 'Agility', dice: [3, 'd', 6] },
			{ key: 'presence', name: 'Presence', dice: [3, 'd', 6, '+', 2] },
			{ key: 'strength', name: 'Strength', dice: [3, 'd', 6, '-', 2] },
			{ key: 'toughness', name: 'Toughness', dice: [3, 'd', 6] }
		],
		hitPoints: [1, 'd', 8],
		terribleTraits: true,
		brokenBodies: true,
		badHabits: true,
		origin: {
			title: 'Unholy origins',
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value: 'background:Galgenbeck, near the cathedral of the Two-Headed Basilisks.',
					label: 'Galgenbeck, near the cathedral of the Two-Headed Basilisks.'
				},
				{
					dice: [2],
					value: 'background:Massacred Alliáns cult, sole survivor.',
					label: 'Massacred Alliáns cult, sole survivor.'
				},
				{
					dice: [3],
					value: 'background:The crypts of Grift.',
					label: 'The crypts of Grift.'
				},
				{
					dice: [4],
					value: 'background:Temple ruins in the Valley of the Unfortunate Undead.',
					label: 'Temple ruins in the Valley of the Unfortunate Undead.'
				},
				{
					dice: [5],
					value: 'background:One of the many Graven-Tosk thief-tunnels.',
					label: 'One of the many Graven-Tosk thief-tunnels.'
				},
				{
					dice: [6],
					value: 'background:Secret Bergen Chrypt church.',
					label: 'Secret Bergen Chrypt church.'
				}
			]
		},
		classFeature: {
			dice: [1, 'd', 6],
			rows: [
				{
					dice: [1],
					value:
						'{"weapon":{"_id":"OzdhtFbwwJNMk1py","name":"Sacred shepherd’s crook","type":"weapon","weaponType":"melee","description":"<p>Its head a hook of human bone inscribed with overlapping anti-prayers. This crook hooks through other worlds. Staff does 2d4 damage except to faithless humans.</p>","damageDie":"2d4","handed":2,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/classitems/shepherds-crook.png","effects":[{"toHit":"DR10"},{"defence":"DR10"}]}}',
					label:
						'<b>Sacred shepherd’s crook</b> Its head a hook of human bone inscribed with overlapping anti-prayers. This crook hooks through other worlds. Staff does 2d4 damage except to faithless humans.'
				},
				{
					dice: [2],
					value: `{"equipment":{"name":"Stolen Mitre","type":"misc","description":"<p>While wearing this holy hat the priest's vile body fades, becoming hard to hit in combat (Defense DR10). If pulled over the ears outside of battle the priest becomes nearly invisible, testing stealth against DR8.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/mitre.png","effects":[{"toHit":"DR10"},{"stealth":"DR8"}],"_id":"hhCP0wkVWMjXjLGi"}}`,
					label:
						'<b>Stolen Mitre</b> While wearing this holy hat the priest’s vile body fades, becoming hard to hit in combat (Defence DR10). If pulled over the ears outside of battle the priest becomes nearly invisible, testing stealth against DR8.'
				},
				{
					dice: [3],
					value: `{"equipment":{"name":"List of Sins","type":"misc","description":"<p>A long and accurate document cross-referenced against reality to discover unseen evil-doers. Successful Presence DR10: A strange light surrounds evil creatures. The list's owner defends with +2 against any being discovered this way.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/listofsins.png","effects":[],"_id":"tmBvT2Xa23nKQJXE"}}`,
					label:
						'<b>List of Sins</b> A long and accurate document cross-referenced against reality to discover unseen evil-doers. Successful Presence DR10: A strange light surrounds evil creatures. The list’s owner defends with +2 against any being discovered this way.'
				},
				{
					dice: [4],
					value:
						'{"equipment":{"name":"The Blasphemous Nechrubel Bible","type":"misc","description":"<p>So intensely blasphemous even the Priests themselves can only peruse it once per day. When read, roll a die.&nbsp;</p>\\n<p><span style=\\"text-decoration: underline;\\">Even result:</span> For the rest of the day PCs heal d4 HP after just five minutes of rest.</p>\\n<p><span style=\\"text-decoration: underline;\\">Odd result:</span> The priest is plagued by demon hallucinations. The DM may invent d3 things that only the Priest can see and describe them to the player as if true. This effect ends with sunrise.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/blasphemousbible.png","effects":[],"_id":"lmjtliPXdk0u2zW6"}}',
					label:
						'<b>The Blasphemous Nechrubel Bible</b> So intensely blasphemous even the Priests themselves can only peruse it once per day. When read, roll a die. Even result: For the rest of the day PCs heal d4 HP after just five minutes of rest. Odd result: The priest is plagued by demonic hallucinations. The DM may invent d3 things that only the Priest can see and describe them to the player as if true. <i>This effect ends with sunrise</i>'
				},
				{
					dice: [5],
					value: `{"equipment":{"name":"Stones taken from Thel-Emas' Lost Temple","type":"misc","description":"<p>Cast the stones on the ground. Their pattern reveals if danger lurks in an adjacent room. The stones can lie. The priest tests Presence DR10 to see if they are true but after failing they cannot test again until the sun has set.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/stones.png","effects":[],"_id":"Q5EckLsZNjsNVLc6"}}`,
					label:
						'<b>Stones taken from Thel-Emas’ Lost Temple</b> Cast the stones on the ground. Their pattern reveals if danger lurks in an adjacent room. The stones can lie. The priest tests Presence DR10 to see if they are true but after failing they cannot test again until the sun has set.'
				},
				{
					dice: [6],
					value: `{"equipment":{"name":"(MʁOИҼ ՂEƧꓵƧ) CRUCIFIX","type":"misc","description":"<p>The crucifix can be used in encounters with the undead as we as lesser trolls and goblins. Check morale (add or subtract the priest's Presence modifier) to see if the creatures bow and kindly remove themselves.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/wrong-crucifix.png","effects":[],"_id":"s7IPLLQcYedhA7mI"}}`,
					label:
						'<b>666 (MʁOИҼ ՂEƧꓵƧ) CRUCIFIX</b> The crucifix can be used in encounters with the undead as well as lesser trolls and goblins. Check morale (add or subtract the priest’s Presence modifier) to see if the creatures bow and kindly remove themselves.'
				}
			]
		},
		omens: 4
	},
	{
		_id: '754bc21c-3a45-4274-ba61-96b1d5282962',
		name: 'Occult Herbmaster',
		silver: [2, 'd', 6, 'x', 10],
		food: [1, 'd', 4],
		tableOne: 6,
		tableTwo: 12,
		tableThree: 12,
		weaponTable: 6,
		armorTable: 2,
		abilities: [
			{ key: 'agility', name: 'Agility', dice: [3, 'd', 6] },
			{ key: 'presence', name: 'Presence', dice: [3, 'd', 6] },
			{ key: 'strength', name: 'Strength', dice: [3, 'd', 6, '-', 2] },
			{ key: 'toughness', name: 'Toughness', dice: [3, 'd', 6, '+', 2] }
		],
		hitPoints: [1, 'd', 6],
		terribleTraits: true,
		brokenBodies: true,
		badHabits: true,
		origin: {
			title: 'Probably raised in &hellip;',
			dice: [1, 'd', 8],
			rows: [
				{
					dice: [1, 2, 3],
					value: 'background:calm isolation in the Sarkash dark.',
					label: 'calm isolation in the Sarkash dark.'
				},
				{
					dice: [4],
					value: 'background:the illegal midnight markets of Schleswig.',
					label: 'the illegal midnight markets of Schleswig.'
				},
				{
					dice: [5],
					value: 'background:the heretic isle of Crëlut, two nautical miles east of Grift.',
					label: 'the heretic isle of Crëlut, two nautical miles east of Grift.'
				},
				{
					dice: [6],
					value: 'background:the old frozen ruins not far from Alliáns.',
					label: 'the old frozen ruins not far from Alliáns.'
				},
				{
					dice: [7],
					value: 'background:a little witches cottage in Galgenbeck.',
					label: 'a little witches cottage in Galgenbeck.'
				},
				{
					dice: [8],
					value:
						'background:the ruins of the Shadow King’s manse, thick with memories of mushrooms and smoke.',
					label: 'the ruins of the Shadow King’s manse, thick with memories of mushrooms and smoke.'
				}
			]
		},
		classFeature: {},
		omens: 2
		// classTable: {
		//   description:"You carry a portable laboratory and continually search for frequently expended ingredients. Daily you have the materials to create two randomly determined decoctions and can brew a total of d4 doses. If unused they lose vitality after 24 hours",
		//   dice: [1,"d",8],
		// 	rows: [
		// 		{
		// 			dice: [1],
		// 			value: '{"equipment":{"name":"Poison (Red)","type":"equipment","description":"<p>Toughness DR12 or d10 damage. 3 doses.</p>","equipped":false,"price":20,"quantity":3,"img":"systems/morkborg/icons/items/misc/poison.png","effects":[],"_id":"PWnnJiir1b0BauJe"}}',
		// 			label: 'Red Poison Toughness DR12 or -d10 HP.'
		// 		},
		// 		{
		// 			dice: [2],
		// 			value: 'equipment:',
		// 			label: 'Ezumiels Vapor Pass a DR14 test or severe (and arguably fun) hallucinations for d4 hours.'
		// 		},
		// 		{
		// 			dice: [3],
		// 			value: 'equipment:',
		// 			label: 'Southern Frog Stew Vomit for d4 hours, pass a DR14 test or you can do nothing else.'
		// 		},
		// 		{
		// 			dice: [4],
		// 			value: 'equipment:',
		// 			label: 'Elixir Vitalis Heals d6 HP and stops infection. Can be habit-forming.'
		// 		},
		// 		{
		// 			dice: [5],
		// 			value: 'equipment:',
		// 			label: 'Spider-Owl Soup See in darkness, climb on walls for 30 minutes.'
		// 		},
		// 		{
		// 			dice: [6],
		// 			value: 'equipment:',
		// 			label: 'Fernor’s Philtre Translucent oil, must be dabbed right into the eye. Heals infection and gives +2 on Presence tests for d4 hours.'
		// 		},
		// 		{
		// 			dice: [7],
		// 			value: 'equipment:',
		// 			label: 'Hyphos’ Enervating Snuff Berserk! Two attacks per round but defend with DR14. Lasts one fight. Must be snorted, causes sneezing'
		// 		},
		// 		{
		// 			dice: [8],
		// 			value: '{"equipment":{"name":"Poison (Black)","type":"equipment","description":"<p>Toughness DR14 or d6 damage + blind for one hour. 3 doses.</p>","equipped":false,"price":20,"quantity":3,"img":"systems/morkborg/icons/items/misc/poison.png","effects":[],"_id":"hirhCLiQItOqH6Ad"}}',
		// 			label: 'Black Poison Toughness DR14 or -d6 HP and blinded for one hour.'
		// 		}
		// 	]
		// }
	}
];

export default CHARACTERS;
