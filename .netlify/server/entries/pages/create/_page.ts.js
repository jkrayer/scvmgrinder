import { compose, modifyPath } from "ramda";
import { b as rollD10 } from "../../../chunks/dice.js";
const CHARACTERS = [
  {
    _id: "7e852bda-130c-4bc4-acdf-4b0cdbbb222c",
    name: "No Class",
    silver: [2, "d", 6, "x", 10],
    food: [1, "d", 4],
    tableOne: 6,
    tableTwo: 12,
    tableThree: 12,
    weaponTable: 10,
    armorTable: 4,
    abilities: [
      { key: "agility", name: "Agility", dice: [3, "d", 6] },
      { key: "presence", name: "Presence", dice: [3, "d", 6] },
      { key: "strength", name: "Strength", dice: [3, "d", 6] },
      { key: "toughness", name: "Toughness", dice: [3, "d", 6] }
    ],
    hitPoints: [1, "d", 8],
    terribleTraits: true,
    brokenBodies: true,
    badHabits: true,
    origin: {},
    classFeature: {},
    omens: 4,
    powers: true
  },
  {
    _id: "11f8ab09-1fc8-48fc-af9e-34b29210c5e7",
    name: "Fanged Deserter",
    silver: [2, "d", 6, "x", 10],
    food: [1, "d", 4],
    tableOne: 6,
    tableTwo: 12,
    tableThree: 12,
    weaponTable: 10,
    armorTable: 4,
    abilities: [
      { key: "agility", name: "Agility", dice: [3, "d", 6, "-", 1] },
      { key: "presence", name: "Presence", dice: [3, "d", 6, "-", 1] },
      { key: "strength", name: "Strength", dice: [3, "d", 6, "+", 2] },
      { key: "toughness", name: "Toughness", dice: [3, "d", 6] }
    ],
    hitPoints: [1, "d", 8],
    terribleTraits: true,
    brokenBodies: true,
    badHabits: true,
    origin: {
      title: "Earliest Memories",
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: "background:A burnt-black building in Sarkash. Your home?",
          label: "A burnt-black building in Sarkash. Your home?"
        },
        {
          dice: [2],
          value: "background:A derelict rotting ship rolling endlessly across a grey sea.",
          label: "A derelict rotting ship rolling endlessly across a grey sea."
        },
        {
          dice: [3],
          value: "background:A brothel in Schleswig. Quite a friendly environment.",
          label: "A brothel in Schleswig. Quite a friendly environment."
        },
        {
          dice: [4],
          value: "background:Sleeping with dogs in the corner of an inn, waiting for someone to return.",
          label: "Sleeping with dogs in the corner of an inn, waiting for someone to return."
        },
        {
          dice: [5],
          value: "background:Following an army in eastern Wästland.",
          label: "Following an army in eastern Wästland."
        },
        {
          dice: [6],
          value: "background:Suckling a wolf in the wild of Bergen Chrypt.",
          label: "Suckling a wolf in the wild of Bergen Chrypt."
        }
      ]
    },
    classFeature: {
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: '{"equipment":{"_id":"Z2IiivTmmlSKdgoX","name":"Crumpled Monster Mask","type":"equipment","description":"<p>Scares things</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/crumpledmonstermask.png","effects":[]}}',
          label: "<b>Crumpled Monster Mask</b> Strikes primitive fear into lesser creatures like goblins, gnoums and children. While worn, they check Morale every round."
        },
        {
          dice: [2],
          value: '{"equipment":{"_id":"7Ivp3hzydrBn4W7s","name":"The Brown Scimitar of Galgenbeck","type":"weapon","weaponType":"melee","damageDie":6,"handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/classitems/brownscimitar.png","effects":[{"toHit":"DR10"},{"defence":"DR10"}]}}',
          label: "<b>The Brown Scimitar of Galgenbeck</b> A stinking sword you pulled from a military shit-ditch. D6 damage. DR10 attack and defence while you wield it. 1 in 6 chance a wounded enemy is smitten with potent sepsis, dying in 10 minutes."
        },
        {
          dice: [3],
          value: '{"equipment":{"_id":"Jh2uzOSivFQmI1gv","name":"Wizard Teeth","type":"equipment","description":"<p>Four weird teeth rattle within a blackened pouch. Before battle roll a d6 for each one. For every 6 one of your attacks deals maximum damage.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/wizardteeth.png","effects":[]}}',
          label: "<b>Wizard Teeth</b> Four weird teeth rattle within a blackened pouch. Before battle roll a d6 for each one. For every 6 one of your attacks deals maximum damage."
        },
        {
          dice: [4],
          value: `{"equipment":{"_id":"z5DDfEekUZSqXEgF","name":"Old Sigûrd's sling","type":"weapon","weaponType":"ranged","damageDie":[2,"d",4],"handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":true,"ammoType":"sling stone","img":"systems/morkborg/icons/classitems/sigurd-sling.png","effects":[]}}`,
          label: "<b>Old Sigûrd's sling</b> Sigûrd was the strongest man whose throat you ever gnawed. Woven from his long grey hair, this sling has never failed you. 2d4 damage, requires fist-sized rocks which, perhaps regrettably, are everywhere."
        },
        {
          dice: [5],
          value: '{"follower":{"_id":"ErBhN8ay6l22MKHH","name":"Ancient Gore-Hound","type":"follower","followerType":"combatant","description":"<p>Asthmatic, deluded and on its last legs, this wizened creature still has a superb nose and can sniffle up treasure in the most disgusting debris. Attacks with DR10 (bite d6). Defends with DR12, 10 HP. Becomes frenzied around goblins and berserkers.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/hound.png","effects":[],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"value":10,"max":10},"morale":7,"silver":null,"speciality":"","trait":"","value":"","weapons":[{"_id":"Zus6SwUmNDeXoDtT","name":"Gore-hound Bite","type":"weapon","weaponType":"melee","damageDie":6,"handed":1,"price":0,"equipped":true,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/followeritems/fangs.png","effects":[],"description":"<p>Attacks with DR10 (bite d6).</p>"}],"armor":{"tier":{"value":1,"max":1}}},"items":[]}}',
          label: "<b>Ancient Gore-Hound</b> Asthmatic, deluded and on its last legs, this wizened creature still has a superb nose and can sniffle up treasure in the most disgusting debris. Attacks with DR10 (bite d6). Defends with DR12, 10 HP. Becomes frenzied around goblins and berserkers."
        },
        {
          dice: [6],
          value: `{"equipment":{"_id":"Z67qRvYbqREr7Y0I","name":"The Shoe of Death's Horse","description":"","type":"weapon","weaponType":"ranged","damageDie":4,"handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/classitems/horseshoe.png","effects":[{"toHit":"DR10"}]}}`,
          label: "<b>The Shoe of Death's Horse</b> It looks normal but since finding it in an obscure crypt you are convinced this shoe came from the horse of Death himself. In your hands it hits with DR10, d4 damage. 1 in 6 chance the shoe smashes the skull, instantly killing small-to-medium sized creatures. The shoe returns to your hand like a boomerang."
        }
      ]
    },
    omens: 2,
    powers: false,
    naturalWeapon: {
      _id: "fangedDeserterBite",
      name: "Bite attack",
      type: "weapon",
      weaponType: "melee",
      damageDie: 6,
      handed: 0,
      price: 0,
      equipped: true,
      broken: false,
      usesAmmo: false,
      ammoType: null,
      effects: [
        "DR10 to attack.",
        "You mu st be close to your target. 1-2 on d6 chance the enemy gets a free attack."
      ]
    }
  },
  {
    _id: "f17362ef-e8c3-4b8a-bbab-1728015e4160",
    name: "Gutterborn Scum",
    silver: [1, "d", 6, "x", 10],
    food: [1, "d", 4],
    tableOne: 6,
    tableTwo: 12,
    tableThree: 12,
    weaponTable: 6,
    armorTable: 2,
    abilities: [
      { key: "agility", name: "Agility", dice: [3, "d", 6] },
      { key: "presence", name: "Presence", dice: [3, "d", 6] },
      { key: "strength", name: "Strength", dice: [3, "d", 6, "-", 2] },
      { key: "toughness", name: "Toughness", dice: [3, "d", 6] }
    ],
    hitPoints: [1, "d", 6],
    terribleTraits: true,
    brokenBodies: true,
    badHabits: true,
    origin: {
      title: "Bad Birth",
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: "background:Dumped onto a moving shit-cart still in your birth caul.",
          label: "Dumped onto a moving shit-cart still in your birth caul."
        },
        {
          dice: [2],
          value: "background:Mother hanged from a tree outside of Galgenbeck, you fell from the corpse.",
          label: "Mother hanged from a tree outside of Galgenbeck, you fell from the corpse."
        },
        {
          dice: [3],
          value: "background:Raised by rats in the gutters of Grift.",
          label: "Raised by rats in the gutters of Grift."
        },
        {
          dice: [4],
          value: "background:Kicked and beaten beneath a baker's table in Schleswig.",
          label: "Kicked and beaten beneath a baker's table in Schleswig."
        },
        {
          dice: [5],
          value: "background:Escaped the Tvelandian orphanarium.",
          label: "Escaped the Tvelandian orphanarium."
        },
        {
          dice: [6],
          value: "background:Educated by outlaws in a hovel south of Alliáns.",
          label: "Educated by outlaws in a hovel south of Alliáns."
        }
      ]
    },
    classFeature: {
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: "feature:<b>Coward's Jab</b> When attacking by surprise test Agility DR10. On a success you automatically hit once with a light one-handed weapon, dealing normal damage +3.",
          label: "<b>Coward's Jab</b> When attacking by surprise test Agility DR10. On a success you automatically hit once with a light one-handed weapon, dealing normal damage +3."
        },
        {
          dice: [2],
          value: "feature:<b>Filthy Fingersmith</b> Your snaky little digits get into pockets and pick locks with a DR8 Agility test. You also begin with lockpicks!",
          label: "<b>Filthy Fingersmith</b> Your snaky little digits get into pockets and pick locks with a DR8 Agility test. You also begin with lockpicks!"
        },
        {
          dice: [3],
          value: "feature:<b>Abominable Gob Lobber</b> Your phlegm is viscous, lumpy, vile and ballistically accurate at short range. You can spit d2 times during a fight. Roll a DR8 Presence test for accuracy. Targets are blinded, retching and vomiting for d4 rounds. Anyone witnessing this—friend and foe—must make a Toughness test to not also vomit. PCs test DR10 and enemies DR12.",
          label: "<b>Abominable Gob Lobber</b> Your phlegm is viscous, lumpy, vile and ballistically accurate at short range. You can spit d2 times during a fight. Roll a DR8 Presence test for accuracy. Targets are blinded, retching and vomiting for d4 rounds. Anyone witnessing this—friend and foe—must make a Toughness test to not also vomit. PCs test DR10 and enemies DR12."
        },
        {
          dice: [4],
          value: "feature:<b>Escaping Fate</b> Every time you use an omen there is a 50% chance it is not spent.",
          label: "<b>Escaping Fate</b> Every time you use an omen there is a 50% chance it is not spent."
        },
        {
          dice: [5],
          value: "feature:<b>Excretal Stealth</b> You have an astounding, almost preternatural ability to hide in muck, debris and filth. When hidden in these conditions a DR16 Presence test is required to notice you.",
          label: "<b>Excretal Stealth</b> You have an astounding, almost preternatural ability to hide in muck, debris and filth. When hidden in these conditions a DR16 Presence test is required to notice you."
        },
        {
          dice: [6],
          value: "feature:<b>Dodging Death</b> You are so unpleasant, irrelevant, disgusting and vile even Death would rather avoid you if it can. On death, if there is even the slightest possibility that you survived, there is a 50% chance that you did. If successful, after 10 rounds you pop back up with d4 HP and an unlikely explanation of your escape.",
          label: "<b>Dodging Death</b> You are so unpleasant, irrelevant, disgusting and vile even Death would rather avoid you if it can. On death, if there is even the slightest possibility that you survived, there is a 50% chance that you did. If successful, after 10 rounds you pop back up with d4 HP and an unlikely explanation of your escape."
        }
      ]
    },
    omens: 2,
    powers: true
  },
  {
    _id: "d781a4fb-1f29-4041-8033-eb788561a17d",
    name: "Esoteric Hermit",
    silver: [1, "d", 6, "x", 10],
    food: [1, "d", 4],
    tableOne: 6,
    tableTwo: 12,
    tableThree: 12,
    weaponTable: 4,
    armorTable: 2,
    abilities: [
      { key: "agility", name: "Agility", dice: [3, "d", 6] },
      { key: "presence", name: "Presence", dice: [3, "d", 6, "+", 2] },
      { key: "strength", name: "Strength", dice: [3, "d", 6, "-", 2] },
      { key: "toughness", name: "Toughness", dice: [3, "d", 6] }
    ],
    hitPoints: [1, "d", 4],
    terribleTraits: true,
    brokenBodies: true,
    badHabits: true,
    origin: {
      title: "Eldritch Origins",
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: "background:Awakening, adult, in a ritual circle underneath the northern bridge to Grift.",
          label: "Awakening, adult, in a ritual circle underneath the northern bridge to Grift."
        },
        {
          dice: [2],
          value: "background:Wandered, memoryless, from the mouth of a cavern at the cliffs of Terion.",
          label: "Wandered, memoryless, from the mouth of a cavern at the cliffs of Terion."
        },
        {
          dice: [3],
          value: "background:Single child survivor of an incident in the Valley of the Unfortunate Undead.",
          label: "Single child survivor of an incident in the Valley of the Unfortunate Undead."
        },
        {
          dice: [4],
          value: "background:Dying of plague in a Bergen Chrypt hovel, you touched something from outside.",
          label: "Dying of plague in a Bergen Chrypt hovel, you touched something from outside."
        },
        {
          dice: [5],
          value: "background:An average individual until you encountered something in a dim glade in Sarkash.",
          label: "An average individual until you encountered something in a dim glade in Sarkash."
        },
        {
          dice: [6],
          value: "background:Raised on a lonely island in Lake Onda. No one else has ever heard of this island and you can't return.",
          label: "Raised on a lonely island in Lake Onda. No one else has ever heard of this island and you can't return."
        }
      ]
    },
    classFeature: {
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: "feature:<b>Master of Fate</b> What use are maps when the substance of causality itself is open to you? You know the right way with a DR8 Presence test.",
          label: "<b>Master of Fate</b> What use are maps when the substance of causality itself is open to you? You know the right way with a DR8 Presence test."
        },
        {
          dice: [2],
          value: "feature:<b>A Book of Boiling Blood</b> You may open and read from this book once a day. Your enemy must make a DR12 test to prevent this. If they fail D2 Berserker- slayers appear from the depths of a forgotten dimension of blood. Roll a D6. On a 1-4 these creatures fight alongside you. On a 5-6 they turn on you, attempting to kill you and destroy the book. After the battle they return to their imprisonment.",
          label: "<b>A Book of Boiling Blood</b> You may open and read from this book once a day. Your enemy must make a DR12 test to prevent this. If they fail D2 Berserker- slayers appear from the depths of a forgotten dimension of blood. Roll a D6. On a 1-4 these creatures fight alongside you. On a 5-6 they turn on you, attempting to kill you and destroy the book. After the battle they return to their imprisonment."
        },
        {
          dice: [3],
          value: "feature:<b>Speaker of Truths</b> Twice per day use your wisdom, knowledge, advice and inner calm to bring clarity to a creature of your choice. The DR of the next test they undertake is lowered by 4.",
          label: "<b>Speaker of Truths</b> Twice per day use your wisdom, knowledge, advice and inner calm to bring clarity to a creature of your choice. The DR of the next test they undertake is lowered by 4."
        },
        {
          dice: [4],
          value: "feature:<b>Initiate of the Invisible College</b> Once per day you may summon D2 scrolls, whose power can be used only once. Roll a d4, on a 1-2 the scrolls are sacred, on a 3-4, unclean. If the scrolls are not used before sunrise they turn to ash.",
          label: "<b>Initiate of the Invisible College</b> Once per day you may summon D2 scrolls, whose power can be used only once. Roll a d4, on a 1-2 the scrolls are sacred, on a 3-4, unclean. If the scrolls are not used before sunrise they turn to ash."
        },
        {
          dice: [5],
          value: '{"equipment":{"name":"Bard of the Undying","type":"misc","description":"<b>Bard of the Undying</b> You learnt your melodies in the Otherworld. The music of your Harp gives +D4 on reaction rolls.","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"","effects":[],"_id":"s5IPLLQcYedhA5mI"}}',
          label: "<b>Bard of the Undying</b> You learnt your melodies in the Otherworld. The music of your Harp gives +D4 on reaction rolls."
        },
        {
          dice: [6],
          value: '{"follower":{"_id":"d6pGFaOVukoH4bpB","name":"Hawk as weapon","type":"follower","followeType":"combatant","description":"<p>Your crafty almost-intelligent hawk is loyal only to you. Even without shared language, you understand its cries as it keeps watch, scouts and swoops to attack foes. Attacks/ defence DR10 (claws/bite D4), HP 8.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/hawk.png","effects":[],"sheet":{"attack":"DR10","defense":"DR10","abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"value":8,"max":8},"morale":7,"silver":null,"speciality":"","trait":"","value":"","weapons":[{"_id":"WdnKKXEwOX5HFTfx","name":"Hawk Talons","type":"weapon","weaponType":"melee","damageDie":4,"handed":2,"price":0,"equipped":true,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/followeritems/fangs.png","effects":[]}],"armor":{"tier":{"value":0,"max":0}}},"items":[]}}',
          label: "<b>Hawk as weapon</b> Your crafty almost-intelligent hawk is loyal only to you. Even without shared language, you understand its cries as it keeps watch, scouts and swoops to attack foes. Attacks/defence DR10 (claws/bite D4), HP 8."
        }
      ]
    },
    omens: 4,
    powers: true
  },
  {
    _id: "e6490e4f-5bd2-49d3-a1a2-17848e5936ec",
    name: "Wretched Royalty",
    silver: [4, "d", 6, "x", 10],
    food: [1, "d", 4],
    tableOne: 6,
    tableTwo: 12,
    tableThree: 12,
    weaponTable: 8,
    armorTable: 3,
    abilities: [
      { key: "agility", name: "Agility", dice: [3, "d", 6] },
      { key: "presence", name: "Presence", dice: [3, "d", 6] },
      { key: "strength", name: "Strength", dice: [3, "d", 6] },
      { key: "toughness", name: "Toughness", dice: [3, "d", 6] }
    ],
    hitPoints: [1, "d", 6],
    terribleTraits: true,
    brokenBodies: true,
    badHabits: true,
    origin: {
      title: "Things were going so well, until&hellip;",
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: "background:your Wästland palace was reduced to rubble.",
          label: "your Wästland palace was reduced to rubble."
        },
        {
          dice: [2],
          value: "background:your caravan kingdom of Tveland fell into penury.",
          label: "your caravan kingdom of Tveland fell into penury."
        },
        {
          dice: [3],
          value: "background:King Fathmu IX's brother Zigmund, your father, was murdered.",
          label: "King Fathmu IX's brother Zigmund, your father, was murdered."
        },
        {
          dice: [4],
          value: "background:the southern empire of Südglans sank into the sea.",
          label: "the southern empire of Südglans sank into the sea."
        },
        {
          dice: [5],
          value: "background:Anthelia demanded a gift of noble blood.",
          label: "Anthelia demanded a gift of noble blood."
        },
        {
          dice: [6],
          value: "background:two young princes were kidnapped west of Bergen Chrypt and disappeared into the black crevasse of the eastern slopes.",
          label: "two young princes were kidnapped west of Bergen Chrypt and disappeared into the black crevasse of the eastern slopes."
        }
      ]
    },
    classFeature: {
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: '{"equipment":{"_id":"pLzhbrwoC6FIt9c5","name":"The Blade of your Ancestors","type":"weapon","weaponType":"melee","description":"<p>This magnificent and clearly magical talking sword is foppish, unreliable and quietly despises you. It taunts your failures and, if continually disappointed, develops a 1 in 6 chance to &lsquo;accidentally&rsquo; attack you or your companions. Deals d6+1 damage. Attack/Defence DR is 10.</p>","damageDie":"1d6+1","handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/classitems/bladeofyourancestors.png","effects":[{"toHit":"DR10"},{"defence":"DR10"}]}}',
          label: "<b>The Blade of your Ancestors</b> This magnificent and clearly magical talking sword is foppish, unreliable and quietly despises you. It taunts your failures and, if continually disappointed, develops a 1 in 6 chance to ‘accidentally' attack you or your companions. Deals d6+1 damage. Attack/Defence DR is 10."
        },
        {
          dice: [2],
          value: '{"follower":{"_id":"pNlrszU8gNi2VYWn","name":"Poltroon the Court Jester","type":"follower","followerType":"buffer","description":"<p>While practically useless, personally irritating and an emotional drain, Poltroon&rsquo;s capering actually makes enemies lose their focus in combat. For the first two rounds you and your allies get +2 on attack/defence.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/jester.png","effects":["possibly buff effect here"],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"max":8,"value":8},"morale":7,"silver":0,"speciality":"","trait":"","value":""},"items":[]}}',
          label: "<b>‘Poltroon' the Court Jester</b> While practically useless, personally irritating and an emotional drain, Poltroon's capering actually makes enemies lose their focus in combat. For the first two rounds you and your allies get +2 on attack/defence."
        },
        {
          dice: [3],
          value: '{"follower":{"_id":"0bddHriOAq9fEstq","name":"Barbarister the Incredible Horse","type":"follower","followerType":"buffer","description":"<p>Barbarister is magical, intelligent, arrogant and vain. He can also talk. If you can persuade him to care, Barbarister occasionally adds +2 to Presence tests involving logic and intellect. The horse may be smarter than you and is quite aware of this.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/barbarister_bw.png","effects":["possibly buff effect here"],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"max":8,"value":8},"morale":7,"silver":0,"speciality":"","trait":"","value":""},"items":[]}}',
          label: "<b>Barbarister the Incredible Horse</b> Barbarister is magical, intelligent, arrogant and vain. He can also talk. If you can persuade him to care, Barbarister occasionally adds +2 to Presence tests involving logic and intellect. The horse may be smarter than you and is quite aware of this."
        },
        {
          dice: [4],
          value: '{"follower":{"_id":"XRGIHRqjF2sxHOnw","name":"Hamfund the Squire","type":"follower","followerType":"buffer","description":"<p>This intensely cowardly servant acts only as guardian for the scabbard of the cursed sword Eurekia. Once per combat, if Ham can be found, Eurekia may be drawn. The sword does 2d6 damage, and for every swing of Eurekia roll a d6. On a 1 the squire is slain and Eurekia vanishes forever.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/icons/classitems/hamfund.png","effects":["possibly buff effect here"],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"max":8,"value":8},"morale":7,"silver":0,"speciality":"","trait":"","value":""},"items":[]}}',
          label: "<b>Hamfund the Squire</b> This intensely cowardly servant acts only as guardian for the scabbard of the cursed sword Eurekia. Once per combat, if Ham can be found, Eurekia may be drawn. The sword does 2d6 damage, and for every swing of Eurekia roll a d6. On a 1 the squire is slain and Eurekia vanishes forever."
        },
        {
          dice: [5],
          value: '{"equipment":{"name":"The Snake-Skin Gift","type":"container","description":"<p>An expensive sandalwood box bound in snakeskin. It contains a seemingly ordinary dagger, wrapped in silk. The dagger does d4 damage but on a 1 the target dies immediately of deadly poison weeping from the blade.</p>","equipped":false,"price":6,"quantity":1,"capacity":7,"img":"systems/morkborg/icons/classitems/snakeskingift.png","effects":[],"_id":"2WFqsHRF4UuaJ3X2"}}',
          label: "<b>The Snake-Skin Gift</b> An expensive sandalwood box bound in snakeskin. It contains a seemingly ordinary dagger, wrapped in silk. The dagger does d4 damage but on a 1 the target dies immediately of deadly poison weeping from the blade."
        },
        {
          dice: [6],
          value: '{"equipment":{"name":"Horn of the Schleswig Lords!","type":"misc","description":"<p>Once per day release a blare from this dented old trumpet and test Presence DR12. One creature may make their next non-combat test an automatic success.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/trumpet.png","effects":[],"_id":"3Q5h6hShVlzykRzG"}}',
          label: "<b>Horn of the Schleswig Lords!</b> Once per day release a blare from this dented old trumpet and test Presence DR12. One creature may make their next non-combat test an automatic success."
        }
      ]
    },
    omens: 2,
    powers: true
  },
  {
    _id: "bd957fad-7ec5-4315-bfad-622089d5a197",
    name: "Heretical Priest",
    silver: [3, "d", 6, "x", 10],
    food: [1, "d", 4],
    tableOne: 6,
    tableTwo: 12,
    tableThree: 12,
    weaponTable: 8,
    armorTable: 4,
    abilities: [
      { key: "agility", name: "Agility", dice: [3, "d", 6] },
      { key: "presence", name: "Presence", dice: [3, "d", 6, "+", 2] },
      { key: "strength", name: "Strength", dice: [3, "d", 6, "-", 2] },
      { key: "toughness", name: "Toughness", dice: [3, "d", 6] }
    ],
    hitPoints: [1, "d", 8],
    terribleTraits: true,
    brokenBodies: true,
    badHabits: true,
    origin: {
      title: "Unholy origins",
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: "background:Galgenbeck, near the cathedral of the Two-Headed Basilisks.",
          label: "Galgenbeck, near the cathedral of the Two-Headed Basilisks."
        },
        {
          dice: [2],
          value: "background:Massacred Alliáns cult, sole survivor.",
          label: "Massacred Alliáns cult, sole survivor."
        },
        {
          dice: [3],
          value: "background:The crypts of Grift.",
          label: "The crypts of Grift."
        },
        {
          dice: [4],
          value: "background:Temple ruins in the Valley of the Unfortunate Undead.",
          label: "Temple ruins in the Valley of the Unfortunate Undead."
        },
        {
          dice: [5],
          value: "background:One of the many Graven-Tosk thief-tunnels.",
          label: "One of the many Graven-Tosk thief-tunnels."
        },
        {
          dice: [6],
          value: "background:Secret Bergen Chrypt church.",
          label: "Secret Bergen Chrypt church."
        }
      ]
    },
    classFeature: {
      dice: [1, "d", 6],
      rows: [
        {
          dice: [1],
          value: `{"equipment":{"_id":"OzdhtFbwwJNMk1py","name":"Sacred shepherd's crook","type":"weapon","weaponType":"melee","description":"<p>Its head a hook of human bone inscribed with overlapping anti-prayers. This crook hooks through other worlds. Staff does 2d4 damage except to faithless humans.</p>","damageDie":"2d4","handed":2,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/classitems/shepherds-crook.png","effects":[{"toHit":"DR10"},{"defence":"DR10"}]}}`,
          label: "<b>Sacred shepherd's crook</b> Its head a hook of human bone inscribed with overlapping anti-prayers. This crook hooks through other worlds. Staff does 2d4 damage except to faithless humans."
        },
        {
          dice: [2],
          value: `{"equipment":{"name":"Stolen Mitre","type":"misc","description":"<p>While wearing this holy hat the priest's vile body fades, becoming hard to hit in combat (Defense DR10). If pulled over the ears outside of battle the priest becomes nearly invisible, testing stealth against DR8.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/mitre.png","effects":[{"toHit":"DR10"},{"stealth":"DR8"}],"_id":"hhCP0wkVWMjXjLGi"}}`,
          label: "<b>Stolen Mitre</b> While wearing this holy hat the priest's vile body fades, becoming hard to hit in combat (Defence DR10). If pulled over the ears outside of battle the priest becomes nearly invisible, testing stealth against DR8."
        },
        {
          dice: [3],
          value: `{"equipment":{"name":"List of Sins","type":"misc","description":"<p>A long and accurate document cross-referenced against reality to discover unseen evil-doers. Successful Presence DR10: A strange light surrounds evil creatures. The list's owner defends with +2 against any being discovered this way.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/listofsins.png","effects":[],"_id":"tmBvT2Xa23nKQJXE"}}`,
          label: "<b>List of Sins</b> A long and accurate document cross-referenced against reality to discover unseen evil-doers. Successful Presence DR10: A strange light surrounds evil creatures. The list's owner defends with +2 against any being discovered this way."
        },
        {
          dice: [4],
          value: '{"equipment":{"name":"The Blasphemous Nechrubel Bible","type":"misc","description":"<p>So intensely blasphemous even the Priests themselves can only peruse it once per day. When read, roll a die.&nbsp;</p>\\n<p><span style=\\"text-decoration: underline;\\">Even result:</span> For the rest of the day PCs heal d4 HP after just five minutes of rest.</p>\\n<p><span style=\\"text-decoration: underline;\\">Odd result:</span> The priest is plagued by demon hallucinations. The DM may invent d3 things that only the Priest can see and describe them to the player as if true. This effect ends with sunrise.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/blasphemousbible.png","effects":[],"_id":"lmjtliPXdk0u2zW6"}}',
          label: "<b>The Blasphemous Nechrubel Bible</b> So intensely blasphemous even the Priests themselves can only peruse it once per day. When read, roll a die. Even result: For the rest of the day PCs heal d4 HP after just five minutes of rest. Odd result: The priest is plagued by demonic hallucinations. The DM may invent d3 things that only the Priest can see and describe them to the player as if true. <i>This effect ends with sunrise</i>"
        },
        {
          dice: [5],
          value: `{"equipment":{"name":"Stones taken from Thel-Emas' Lost Temple","type":"misc","description":"<p>Cast the stones on the ground. Their pattern reveals if danger lurks in an adjacent room. The stones can lie. The priest tests Presence DR10 to see if they are true but after failing they cannot test again until the sun has set.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/stones.png","effects":[],"_id":"Q5EckLsZNjsNVLc6"}}`,
          label: "<b>Stones taken from Thel-Emas' Lost Temple</b> Cast the stones on the ground. Their pattern reveals if danger lurks in an adjacent room. The stones can lie. The priest tests Presence DR10 to see if they are true but after failing they cannot test again until the sun has set."
        },
        {
          dice: [6],
          value: `{"equipment":{"name":"(MʁOИҼ ՂEƧꓵƧ) CRUCIFIX","type":"misc","description":"<p>The crucifix can be used in encounters with the undead as we as lesser trolls and goblins. Check morale (add or subtract the priest's Presence modifier) to see if the creatures bow and kindly remove themselves.</p>","equipped":false,"price":0,"quantity":1,"capacity":0,"img":"systems/morkborg/icons/classitems/wrong-crucifix.png","effects":[],"_id":"s7IPLLQcYedhA7mI"}}`,
          label: "<b>666 (MʁOИҼ ՂEƧꓵƧ) CRUCIFIX</b> The crucifix can be used in encounters with the undead as well as lesser trolls and goblins. Check morale (add or subtract the priest's Presence modifier) to see if the creatures bow and kindly remove themselves."
        }
      ]
    },
    omens: 4,
    powers: true
  },
  {
    _id: "754bc21c-3a45-4274-ba61-96b1d5282962",
    name: "Occult Herbmaster",
    silver: [2, "d", 6, "x", 10],
    food: [1, "d", 4],
    tableOne: 6,
    tableTwo: 12,
    tableThree: 12,
    weaponTable: 6,
    armorTable: 2,
    abilities: [
      { key: "agility", name: "Agility", dice: [3, "d", 6] },
      { key: "presence", name: "Presence", dice: [3, "d", 6] },
      { key: "strength", name: "Strength", dice: [3, "d", 6, "-", 2] },
      { key: "toughness", name: "Toughness", dice: [3, "d", 6, "+", 2] }
    ],
    hitPoints: [1, "d", 6],
    terribleTraits: true,
    brokenBodies: true,
    badHabits: true,
    origin: {
      title: "Probably raised in &hellip;",
      dice: [1, "d", 8],
      rows: [
        {
          dice: [1, 2, 3],
          value: "background:calm isolation in the Sarkash dark.",
          label: "calm isolation in the Sarkash dark."
        },
        {
          dice: [4],
          value: "background:the illegal midnight markets of Schleswig.",
          label: "the illegal midnight markets of Schleswig."
        },
        {
          dice: [5],
          value: "background:the heretic isle of Crëlut, two nautical miles east of Grift.",
          label: "the heretic isle of Crëlut, two nautical miles east of Grift."
        },
        {
          dice: [6],
          value: "background:the old frozen ruins not far from Alliáns.",
          label: "the old frozen ruins not far from Alliáns."
        },
        {
          dice: [7],
          value: "background:a little witches cottage in Galgenbeck.",
          label: "a little witches cottage in Galgenbeck."
        },
        {
          dice: [8],
          value: "background:the ruins of the Shadow King's manse, thick with memories of mushrooms and smoke.",
          label: "the ruins of the Shadow King's manse, thick with memories of mushrooms and smoke."
        }
      ]
    },
    classFeature: {},
    omens: 2,
    powers: true
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
    // 			label: 'Fernor\'s Philtre Translucent oil, must be dabbed right into the eye. Heals infection and gives +2 on Presence tests for d4 hours.'
    // 		},
    // 		{
    // 			dice: [7],
    // 			value: 'equipment:',
    // 			label: 'Hyphos\' Enervating Snuff Berserk! Two attacks per round but defend with DR14. Lasts one fight. Must be snorted, causes sneezing'
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
const TABLE_ONE = {
  dice: [1, "d", 6],
  rows: [
    { dice: [1, 2], value: "nothing", label: "nothing" },
    {
      dice: [3],
      value: '{"equipment":{"name":"Backpack","type":"container","description":"<p>Holds 7 normal-sized items.</p>","equipped":false,"price":6,"quantity":1,"capacity":7,"img":"systems/morkborg/icons/items/containers/backpack.png","effects":[],"_id":"rvu5GKNoYKiiwfrL"}}',
      label: "backpack for 7 normal-sized items"
    },
    {
      dice: [4],
      value: '{"equipment":{"name":"Sack","type":"container","description":"<p>Holds 10 normal-sized items.</p>","equipped":false,"price":3,"quantity":1,"capacity":10,"img":"systems/morkborg/icons/items/containers/sack.png","effects":[],"_id":"3YCK3phcKtAxcvkU"}}',
      label: "sack for 10 normal-sized items"
    },
    {
      dice: [5],
      value: '{"equipment":{"name":"Small Wagon","type":"container","description":"","equipped":false,"price":25,"quantity":1,"capacity":15,"img":"systems/morkborg/icons/items/containers/wagon.png","effects":[],"_id":"eNcMJ17ikUaGuuBF"}}',
      label: "small wagon or one item above of your choice"
    },
    {
      dice: [6],
      value: '{"follower":{"_id":"xZrAhOxxJSj2czwp","name":"Donkey","type":"follower","followerType":"container","description":"<p>Not bad.</p>","price":10,"quantity":1,"capacity":15,"img":"systems/morkborg/icons/items/containers/donkey.png","effects":[]}}',
      label: "donkey, not bad"
    }
  ]
};
const TABLE_TWO = {
  dice: [1, "d", 12],
  rows: [
    {
      dice: [1],
      value: '{"equipment":{"name":"Rope","type":"equipment","description":"<p>30 feet.</p>","equipped":false,"price":4,"quantity":1,"img":"systems/morkborg/icons/items/misc/rope.png","effects":[],"_id":"PqBFT58mU6EJ20HM"}}',
      label: "rope. 30 feet"
    },
    {
      dice: [2],
      value: '{"equipment":{"name":"Torch","type":"equipment","description":"","equipped":false,"price":2,"quantity":1,"img":"systems/morkborg/icons/items/misc/torch.png","effects":[],"_id":"I5RRBmZ4K7M2fq2B"}}',
      label: "Presence + 4 torches"
    },
    {
      dice: [3],
      value: '{"equipment":{"name":"Lantern oil","type":"equipment","description":"<p>Presence + 6 hours.</p>","equipped":false,"price":5,"quantity":6,"img":"systems/morkborg/icons/items/misc/lanternoil.png","effects":[],"_id":"iNy14bPxAgkJwXZv"}}',
      label: "lantern with oil for Presence + 6 hours"
    },
    {
      dice: [4],
      value: '{"equipment":{"name":"Magnesium strip","type":"equipment","description":"","equipped":false,"price":4,"quantity":1,"img":"systems/morkborg/icons/items/misc/magnesiumstrip.png","effects":[],"_id":"I4G2ofGuWZsaK3pO"}}',
      label: "magnesium strip"
    },
    // samesies
    { dice: [5], value: "ruc", label: "random unclean scroll" },
    {
      dice: [6],
      value: '{"equipment":{"name":"Sharp needle","type":"equipment","description":"","equipped":false,"price":3,"quantity":1,"img":"systems/morkborg/icons/items/misc/needle.png","effects":[],"_id":"ExDYtaqoJSSvY3xh"}}',
      label: "sharp needle"
    },
    {
      dice: [7],
      value: '{"equipment":{"name":"Medicine box","type":"equipment","description":"<p>Stops bleeding/infection and +d6 HP. Presence + 4 uses.</p>","equipped":false,"price":15,"quantity":4,"img":"systems/morkborg/icons/items/misc/medicinebox.png","effects":[],"_id":"un4oZvjTD38YiSKx"}}',
      label: "medicine chest Presence+4 uses (stops bleeding/infection and heals d6 HP)"
    },
    {
      dice: [8],
      value: '{"equipment":{"name":"Lockpicks","type":"equipment","description":"Metal File and Lockpicks","equipped":false,"price":5,"quantity":1,"img":"systems/morkborg/icons/items/misc/lockpicks.png","effects":[],"_id":"hqRlVEEDPq6jfJIM"}}',
      label: "metal file and lockpicks"
    },
    {
      dice: [9],
      value: '{"equipment":{"name":"Bear trap","type":"equipment","description":"<p>Presence DR14 to spot, d8 damage.</p>","equipped":false,"price":20,"quantity":1,"img":"systems/morkborg/icons/items/misc/beartrap.png","effects":[],"_id":"AJfYTOZuMto5kqr0"}}',
      label: "bear trap (Presence DR14 to spot, d8 damage)"
    },
    { dice: [10], value: "babomb", label: "bomb (sealed bottle, d10 damage)" },
    {
      dice: [11],
      value: '{"equipment":{"name":"Poison (Red)","type":"equipment","description":"<p>Toughness DR12 or d10 damage. 3 doses.</p>","equipped":false,"price":20,"quantity":3,"img":"systems/morkborg/icons/items/misc/poison.png","effects":[],"_id":"PWnnJiir1b0BauJe"}}',
      label: "a bottle of red poison d4 doses (Toughness DR12 or d10 damage)"
    },
    {
      dice: [12],
      value: '{"equipment":{"name":"Crucifix, silver","type":"equipment","description":"","equipped":false,"price":60,"quantity":1,"img":"systems/morkborg/icons/items/misc/crucifix_silver.png","effects":[],"_id":"taEYHJVN5MqwVWad"}}',
      label: "silver crucifix"
    }
  ]
};
const TABLE_THREE = {
  dice: [1, "d", 12],
  rows: [
    {
      dice: [1],
      value: '{"equipment":{"name":"Life Elixir","type":"equipment","description":"<p>d4 doses (heals d6 HP and removes infection)</p>","equipped":false,"price":30,"quantity":4,"img":"systems/morkborg/icons/items/misc/potion.png","effects":[],"_id":"xXkP7QnTVlXChAAh"}}',
      label: "life elixir d4 doses (heals d6 HP and removes infection)"
    },
    // This could either open another table with roll for sacred scroll OR rolle fo a sacred scroll when it mounts and insert into this position.
    {
      dice: [2],
      value: "rss",
      label: "random sacred scroll"
    },
    {
      dice: [3],
      value: '{"follower":{"_id":"KbNCwXUcl7ca9JcV","name":"Small but vicious dog","type":"follower","followeType":"combatant","description":"<p>d6+2 HP,&nbsp; bite d4,&nbsp; only obeys you.</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/dog.png","effects":[],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"value":3,"max":3},"morale":7,"silver":null,"speciality":"","trait":"","value":"","weapons":[{"_id":"0pUjQCKinpkKEphp","name":"Small Dog Bite","type":"weapon","weaponType":"melee","damageDie":4,"handed":1,"price":0,"equipped":true,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/followeritems/fangs.png","effects":[]}],"armor":{"tier":{"value":1,"max":1}}},"items":[]}}',
      label: "small but vicious dog (d6+2 HP, bite d4, only obeys you)"
    },
    {
      dice: [4],
      value: '{"follower":{"_id":"46A26aWQ3yUP3vbi","name":"Monkey","type":"follower","followerType":"combatant","description":"<p>d4 monkeys that ignore but love you (d4+2 HP, punch/bite d4).</p>","price":null,"quantity":1,"capacity":null,"img":"systems/morkborg/tokens/followers/monkey.png","effects":[],"sheet":{"abilities":{"agility":0,"presence":0,"strength":0,"toughness":0},"hp":{"value":3,"max":3},"morale":7,"silver":null,"speciality":"","trait":"","value":"","weapons":[{"_id":"SmPvCHM5fQRwKC0W","name":"Monkey Punch","type":"weapon","weaponType":"melee","damageDie":4,"handed":1,"price":0,"equipped":true,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/followeritems/punch.png","effects":[]}],"armor":{"tier":{"value":1,"max":1}}},"items":[]}}',
      label: "d4 monkeys that ignore but love you (d4+2 HP, punch/bite d4)"
    },
    {
      dice: [5],
      value: '{"equipment":{"name":"Exquisite perfume","type":"equipment","description":"","equipped":false,"price":25,"quantity":1,"img":"systems/morkborg/icons/items/misc/perfume.png","effects":[],"_id":"1NG5EjvjUNscXbLt"}}',
      label: "exquisite perfume worth 25s"
    },
    {
      dice: [6],
      value: '{"equipment":{"name":"Toolbox","type":"equipment","description":"<p>10 nails, hammer, small saw, tongs.</p>","equipped":false,"price":20,"quantity":1,"img":"systems/morkborg/icons/items/misc/toolbox.png","effects":[],"_id":"Br9MTFlVww7MJOBw"}}',
      label: "toolbox 10 nails, tongs, hammer, small saw and drill"
    },
    {
      dice: [7],
      value: '{"equipment":{"name":"Heavy chain","type":"equipment","description":"<p>15 feet.</p>","equipped":false,"price":10,"quantity":1,"img":"systems/morkborg/icons/items/misc/chain.png","effects":[],"_id":"9xhtcIhL1nATBHZZ"}}',
      label: "heavy chain 15 feet"
    },
    {
      dice: [8],
      value: '{"equipment":{"name":"Grappling hook","type":"equipment","description":"","equipped":false,"price":12,"quantity":1,"img":"systems/morkborg/icons/items/misc/grapplinghook.png","effects":[],"_id":"5oPOeN1GxwN05Gyo"}}',
      label: "grappling hook"
    },
    {
      dice: [9],
      value: '{"equipment":{"_id":"ODqK19IBLTyfDjtD","name":"Shield","type":"shield","containerSpace":1,"description":"<p>-1 damage. You may choose to ignore all damage from one attack but shield breaks.</p>","equipped":false,"broken":false,"price":20,"img":"systems/morkborg/icons/items/armor/shield.png","effects":[]}}',
      label: "shield (-1 HP damage or have the shield break to ignore one attack)"
    },
    {
      dice: [10],
      value: '{"equipment":{"_id":"kl4Zj6r3i4xbNygO","name":"Crowbar","type":"weapon","weaponType":"melee","damageDie":4,"handed":1,"price":8,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/items/misc/crowbar.png","effects":[]}}',
      label: "crowbar (d4 damage)"
    },
    {
      dice: [11],
      value: '{"equipment":{"name":"Lard","type":"equipment","description":"<p>May function as # meals.</p>","equipped":false,"price":5,"quantity":5,"img":"systems/morkborg/icons/items/misc/lard.png","effects":[],"_id":"2WhuGSaZ7FAfBpkT"}}',
      label: "lard (may function as 5 meals in a pinch)"
    },
    {
      dice: [12],
      value: '{"equipment":{"name":"Tent","type":"equipment","description":"","equipped":false,"price":12,"quantity":1,"img":"systems/morkborg/icons/items/misc/tent.png","effects":[],"_id":"pFUi6OsQ2ziEWwil"}}',
      label: "tent"
    }
  ]
};
const WEAPONS = {
  dice: [1, "d", 12],
  rows: [
    {
      dice: [1],
      value: '{"equipment":{"_id":"KDG9eB0nnFz3TEwH","name":"Femur","type":"weapon","weaponType":"melee","damageDie":4,"handed":1,"price":0,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/items/weapons/femur.png","effects":[]}}',
      label: "Femur "
    },
    {
      dice: [2],
      value: '{"equipment":{"_id":"O4NLiIskKuu7PnlB","name":"Staff","type":"weapon","weaponType":"melee","damageDie":4,"handed":2,"price":5,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/items/weapons/staff.png","effects":[]}}',
      label: "Staff "
    },
    {
      dice: [3],
      value: '{"equipment":{"_id":"mG7a0H0RpkyCkQhL","name":"Shortsword","type":"weapon","weaponType":"melee","damageDie":4,"handed":1,"price":20,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/items/weapons/shortsword.png","effects":[]}}',
      label: "Shortsword"
    },
    {
      dice: [4],
      value: '{"equipment":{"_id":"0pBtjACKS3geBOXe","name":"Knife","type":"weapon","weaponType":"melee","damageDie":4,"handed":1,"price":10,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/items/weapons/knife.png","effects":[]}}',
      label: "Knife "
    },
    {
      dice: [5],
      value: '{"equipment":{"_id":"EpSMli8PXaTn7lBl","name":"Warhammer","type":"weapon","weaponType":"melee","damageDie":6,"handed":1,"price":30,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/items/weapons/warhammer.png","effects":[]}}',
      label: "Warhammer"
    },
    {
      dice: [6],
      value: '{"equipment":{"_id":"y15WVnW15Nstea1h","name":"Sword","type":"weapon","weaponType":"melee","damageDie":6,"handed":1,"price":30,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/items/weapons/sword.png","effects":[]}}',
      label: "Sword"
    },
    {
      dice: [7],
      value: '{"equipment":{"_id":"SPf1BJ07TGxnTwMn","name":"Bow","type":"weapon","weaponType":"ranged","damageDie":6,"handed":2,"price":25,"equipped":false,"broken":false,"usesAmmo":true,"ammoType":"arrow","img":"systems/morkborg/icons/items/weapons/bow.png","effects":[]}}',
      label: "Bow (with Presence + 10 arrows)"
    },
    {
      dice: [8],
      value: '{"equipment":{"_id":"ALOZ2xWpcN3Xov2Z","name":"Flail","type":"weapon","weaponType":"melee","damageDie":8,"handed":1,"price":35,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null,"img":"systems/morkborg/icons/items/weapons/flail.png","effects":[]}}',
      label: "Flail"
    },
    {
      dice: [9],
      value: '{"equipment":{"_id":"Sdlx1RmJeMujdPvN","name":"Crossbow","type":"weapon","weaponType":"ranged","damageDie":8,"handed":2,"price":40,"equipped":false,"broken":false,"usesAmmo":true,"ammoType":"bolt","img":"systems/morkborg/icons/items/weapons/crossbow.png","effects":[]}}',
      label: "Crossbow (with Presence + 10 bolts)"
    },
    {
      dice: [10],
      value: '{"equipment":{"_id":"5veZFchoHJzZetCm","name":"Zweihänder","type":"weapon","weaponType":"melee","damageDie":10,"handed":2,"price":60,"equipped":false,"broken":false,"usesAmmo":false,"ammoType":null}}',
      label: "Zweihänder"
    }
  ]
};
const ARMOR_TABLE = {
  dice: [1, "d", 4],
  rows: [
    { dice: [1], value: "no armor", label: "nothing" },
    {
      dice: [2],
      value: '{"equipment":{"_id":"OdANZUpaMPggKU0F","name":"Light Armor","type":"armor","description":"<p>Fur, padded cloth, leather, etc.</p>","equipped":false,"broken":false,"price":20,"currentTier":1,"maxTier":1,"img":"systems/morkborg/icons/items/armor/light.png","effects":[]}}',
      label: "light armor (tier 1)"
    },
    {
      dice: [3],
      value: '{"equipment":{"_id":"raiGDQXNkHpHe1ts","name":"Medium Armor","type":"armor","description":"<p>Scale, mail, etc.</p>","equipped":false,"broken":false,"price":100,"currentTier":2,"maxTier":2,"img":"systems/morkborg/icons/items/armor/medium.png","effects":[]}}',
      label: "medium armor (tier 2)"
    },
    {
      dice: [4],
      value: '{"equipment":{"_id":"a9NSVvJgpD1tdIga","name":"Heavy Armor","type":"armor","description":"<p>Splint, plate, etc.</p>","equipped":false,"broken":false,"price":200,"currentTier":3,"maxTier":3,"img":"systems/morkborg/icons/items/armor/heavy.png","effects":[]}}',
      label: "heavy armor (tier 2)"
    }
  ]
};
const TERRIBE_TRAITS = {
  dice: [1, "d", 20],
  rows: [
    { dice: [1], value: "Endlessly aggravated", label: "Endlessly aggravated" },
    { dice: [2], value: "Inferiority complex", label: "Inferiority complex" },
    { dice: [3], value: "Problems with authority", label: "Problems with authority" },
    { dice: [4], value: "Loud mouth", label: "Loud mouth" },
    { dice: [5], value: "Cruel", label: "Cruel" },
    { dice: [6], value: "Egocentric", label: "Egocentric" },
    { dice: [7], value: "Nihilistic", label: "Nihilistic" },
    { dice: [8], value: "Prone to substance abuse", label: "Prone to substance abuse" },
    { dice: [9], value: "Conflicted", label: "Conflicted" },
    { dice: [10], value: "Shrewd", label: "Shrewd" },
    { dice: [11], value: "Vindictive", label: "Vindictive" },
    { dice: [12], value: "Cowardly", label: "Cowardly" },
    { dice: [13], value: "Lazy", label: "Lazy" },
    { dice: [14], value: "Suspocious", label: "Suspocious" },
    { dice: [15], value: "Ruthless", label: "Ruthless" },
    { dice: [16], value: "Worried", label: "Worried" },
    { dice: [17], value: "Bitter", label: "Bitter" },
    { dice: [18], value: "Deceitful", label: "Deceitful" },
    { dice: [19], value: "Wasteful", label: "Wasteful" },
    { dice: [20], value: "Arrogant", label: "Arrogant" }
  ]
};
const BROKEN_BODIES = {
  dice: [1, "d", 20],
  rows: [
    { dice: [1], value: "Staring Manic Gaze", label: "Staring Manic Gaze" },
    {
      dice: [2],
      value: "Covered in (for some) blasphemous tattoos",
      label: "Covered in (for some) blasphemous tattoos"
    },
    { dice: [3], value: "Rotting face, wears a mask", label: "Rotting face, wears a mask" },
    { dice: [4], value: "Lost three toes, limps", label: "Lost three toes, limps" },
    { dice: [5], value: "Starved: gaunt and pale", label: "Starved: gaunt and pale" },
    {
      dice: [6],
      value: '{"equipment":{"_id":"6c3ae926d04a2aba5db4031c1b0a5260","name":"Rusting Hook","type":"weapon","weaponType":"melee","description":"","damageDie":"1d6","handed":1,"price":0,"equipped":true,"broken":false,"usesAmmo":false,"ammoType":null,"img":"","effects":[]}}',
      label: "One hand replaced with a rusting hook. (d6 damage)"
    },
    { dice: [7], value: "Decaying teeth", label: "Decaying teeth" },
    {
      dice: [8],
      value: "Hauntingly beautify, unnervingly clean",
      label: "Hauntingly beautify, unnervingly clean"
    },
    { dice: [9], value: "Hands caked with sores", label: "Hands caked with sores" },
    {
      dice: [10],
      value: "Cataracts slowly but surely spreading in both eyes",
      label: "Cataracts slowly but surely spreading in both eyes"
    },
    {
      dice: [11],
      value: "Long tangled hair, at least one cockroach in residence",
      label: "Long tangled hair, at least one cockroach in residence"
    },
    { dice: [12], value: "Broken crushed ears", label: "Broken crushed ears" },
    {
      dice: [13],
      value: "Juddering and studttering from nerve damage or stress",
      label: "Juddering and studttering from nerve damage or stress"
    },
    { dice: [14], value: "Corpulent, ravenous, drooling", label: "Corpulent, ravenous, drooling" },
    {
      dice: [15],
      value: "One hand lacks thumb and index finger, grips like a lobster",
      label: "One hand lacks thumb and index finger, grips like a lobster"
    },
    { dice: [16], value: "Red, swollen alcoholic's nose", label: "Red, swollen alcoholic's nose" },
    {
      dice: [17],
      value: "Resting maniac face, making friends is hard",
      label: "Resting maniac face, making friends is hard"
    },
    {
      dice: [18],
      value: "Chronis athelte's foot, stinks",
      label: "Chronis athelte's foot, stinks"
    },
    {
      dice: [19],
      value: "Recently slashed and stinking eye, covered with a patch",
      label: "Recently slashed and stinking eye, covered with a patch"
    },
    {
      dice: [20],
      value: "Nails cracked and black, maybe about to drop off ",
      label: "Nails cracked and black, maybe about to drop off "
    }
  ]
};
const BAD_HABITS = {
  dice: [1, "d", 20],
  rows: [
    {
      dice: [1],
      value: "Obsessively collect small sharp stones",
      label: "Obsessively collect small sharp stones."
    },
    {
      dice: [2],
      value: "Won't use a blade without testing it on your own flesh. Arms knitted with scars.",
      label: "Won't use a blade without testing it on your own flesh. Arms knitted with scars."
    },
    {
      dice: [3],
      value: "Can't start drinking once you start.",
      label: "Can't start drinking once you start."
    },
    {
      dice: [4],
      value: "Gambling addict. Must bet every day. If yopu lose raise and bet again",
      label: "Gambling addict. Must bet every day. If yopu lose raise and bet again"
    },
    {
      dice: [5],
      value: "Cannot tolerate criticism of any kind, Results in rage and weeping.",
      label: "Cannot tolerate criticism of any kind, Results in rage and weeping."
    },
    {
      dice: [6],
      value: "Unable to get to the point. Have never actually finished a story.",
      label: "Unable to get to the point. Have never actually finished a story."
    },
    {
      dice: [7],
      value: "Best friend is a skull. Carry it with you, tell it everything, you trust no one more.",
      label: "Best friend is a skull. Carry it with you, tell it everything, you trust no one more."
    },
    {
      dice: [8],
      value: "You pick your nose so deep it bleeds.",
      label: "You pick your nose so deep it bleeds."
    },
    {
      dice: [9],
      value: "Laugh hysterically at your own jokes which you then explain in detail.",
      label: "Laugh hysterically at your own jokes which you then explain in detail."
    },
    {
      dice: [10],
      value: "A nihilist. You insist on telling everyone you're a nihilist and explaining why.",
      label: "A nihilist. You insist on telling everyone you're a nihilist and explaining why."
    },
    { dice: [11], value: "Inveterate bug eater.", label: "Inveterate bug eater." },
    {
      dice: [12],
      value: "Stress response is aesthetic display. The worse things get the fancier you need to be.",
      label: "Stress response is aesthetic display. The worse things get the fancier you need to be."
    },
    {
      dice: [13],
      value: "Permanent phegm deposit in throat. Continuously cough, snort, spit and swallow.",
      label: "Permanent phegm deposit in throat. Continuously cough, snort, spit and swallow."
    },
    { dice: [14], value: "Pyromanniac", label: "Pyromanniac" },
    {
      dice: [15],
      value: "Consistently lose important items and forget vital facts.",
      label: "Consistently lose important items and forget vital facts."
    },
    {
      dice: [16],
      value: "Insecure shit-stirrer. Will talk about whoever just left the room.",
      label: "Insecure shit-stirrer. Will talk about whoever just left the room."
    },
    { dice: [17], value: "You stutter when lying.", label: "You stutter when lying." },
    {
      dice: [18],
      value: "You giggle insanely at the worst possible times.",
      label: "You giggle insanely at the worst possible times."
    },
    {
      dice: [19],
      value: "You whisle while trying to hide. You will deny this. Whistle when 5, 7, 9, 11 or 13 is rolled ona d20.",
      label: "You whisle while trying to hide. You will deny this. Whistle when 5, 7, 9, 11 or 13 is rolled ona d20."
    },
    {
      dice: [20],
      value: "You make jewelry from the teeth of the dead.",
      label: "You make jewelry from the teeth of the dead."
    }
  ]
};
const SACRED_SCROLLS = [
  {
    _id: "1hEUOlxuvuMNNgVi",
    name: "Grace of a Dead Saint",
    type: "scroll",
    subType: "sacred",
    description: "d2 creatures regain d10 HP each.",
    equipped: false,
    price: 50
  },
  {
    _id: "8FV2oEoPbNifRj8g",
    name: "Grace for a Sinner",
    type: "scroll",
    subType: "sacred",
    description: "A creature of your choice gets +d6 on one roll (damage, test, etc).",
    equipped: false,
    price: 50
  },
  {
    _id: "fOKuIMfJ2978t456",
    name: "Whispers Pass the Gate",
    // permission: { default: 0, rJEU6XERAWNvCOnp: 3 },
    type: "scroll",
    subType: "sacred",
    description: "Ask three questions to a deceased creature.",
    equipped: false,
    price: 50
  },
  {
    _id: "hnWMYrgmXjAqobPz",
    name: "Aegis of Sorrow",
    type: "scroll",
    subType: "sacred",
    description: "A creature of your choice gains 2d6 extra HP for 10 rounds.",
    equipped: false,
    price: 50
  },
  {
    _id: "Peik0MlV5kT67Hr9",
    name: "Unmet Fate",
    // permission: { default: 0, rJEU6XERAWNvCOnp: 3 },
    type: "scroll",
    subType: "sacred",
    description: "One creature, dead for no more than a week, is awakened with terrible memories.",
    equipped: false,
    price: 50
  },
  {
    _id: "p0rICWx4UKj0FTHg",
    name: "Bestial Speech",
    // permission: { default: 0, rJEU6XERAWNvCOnp: 3 },
    type: "scroll",
    subType: "sacred",
    description: "You may speak with animals for d20 minutes.",
    equipped: false,
    price: 50
  },
  {
    _id: "RWSYJhwBTl5VvAtG",
    name: "False Dawn / Night's Chariot",
    type: "scroll",
    subType: "sacred",
    description: "Light or pitch black for 3d10 minutes.",
    equipped: false,
    price: 20
  },
  {
    _id: "L8slmLbtf8jle2wj",
    name: "Hermetic Step",
    type: "scroll",
    subType: "sacred",
    description: "You find all traps in your path for 2d10 minutes.",
    equipped: false,
    price: 50
  },
  {
    _id: "5NzOqTf3uCL0i5Op",
    name: "Roskoe's Consuming Glare",
    type: "scroll",
    subType: "sacred",
    description: "d4 creatures lose d8 HP each.",
    equipped: false,
    price: 50
  },
  {
    _id: "l0exLr5fcq8x2xeY",
    name: "Enochian Syntax",
    type: "scroll",
    subType: "sacred",
    description: "One creature blindly obeys a single command.",
    equipped: false,
    price: 50
  }
];
const UNCLEAN_SCROLLS = [
  {
    _id: "CbvABUTSPxNelOrL",
    name: "Palms Open the Southern Gate",
    type: "scroll",
    subType: "unclean",
    description: "A ball of fire hits d2 creatures dealing d8 damage per creature.",
    equipped: false,
    price: 50
  },
  {
    _id: "9O2uVheduMsAIwPO",
    name: "Tongue of Eris",
    type: "scroll",
    subType: "unclean",
    description: "A creature of your choice is confused for 10 minutes.",
    equipped: false,
    price: 50
  },
  {
    _id: "YMNcBMkzrOJTm0IF",
    name: "Te-le-kin-esis",
    type: "scroll",
    subType: "unclean",
    description: "Move an object up to 1d10x10 feet for d6 minutes.",
    equipped: false,
    price: 50
  },
  {
    _id: "BfEXLatFNxR1YLGC",
    name: "Lucy-fires Levitation",
    type: "scroll",
    subType: "unclean",
    description: "Hover for Presence+d10 rounds.",
    equipped: false,
    price: 50
  },
  {
    _id: "QTxhdRVyUtUrPnut",
    name: "Daemon of Capillaries",
    type: "scroll",
    subType: "unclean",
    description: "One creature suffocates for d6 rounds, losing d4 HP per round.",
    equipped: false,
    price: 50
  },
  {
    _id: "2iAx6wxinffq1YKT",
    name: "Nine Violet Signs Unknot the Storm",
    type: "scroll",
    subType: "unclean",
    description: "Produce d2 lightning bolts dealing d6 damage each.",
    // carryWeight: 1,
    equipped: false,
    price: 50
  },
  {
    _id: "3cfSJevx0ceuHUxD",
    name: "Metzhuotl Blind Your Eye",
    type: "scroll",
    subType: "unclean",
    description: "A creature becomes invisible for d6 rounds or until it is damaged, attacking/defending with DR6.",
    equipped: false,
    price: 50
  },
  {
    _id: "RCN76U4gJ31TlhK9",
    name: "Foul Psychopomp",
    // permission: { default: 0, rJEU6XERAWNvCOnp: 3 },
    type: "scroll",
    subType: "unclean",
    description: "Summon (d6): 1-3 d4 skeletons, 4-6 d4 zombies.",
    equipped: false,
    price: 50
  },
  {
    _id: "Gn5HPKO2JjWU8DRV",
    name: "Eyelid Blinds the Mind",
    type: "scroll",
    subType: "unclean",
    description: "d5 creatures fall asleep for one hour unless they succeed a DR14 test.",
    equipped: false,
    price: 20
  },
  {
    _id: "QMuQNTG58YEozEoA",
    name: "Death",
    type: "scroll",
    subType: "unclean",
    description: "All creatures within 30 feet lose a total of 4d10 HP.",
    equipped: false,
    price: 50
  }
];
const scrollAtIndex = (scrolls) => (index) => scrolls[index];
const stringify = (x) => JSON.stringify({ equipment: x });
const nameAndScroll = (x) => [x.name, x];
const scrollString = ([name, scroll]) => [
  name,
  stringify(scroll)
];
const getSacredScroll = compose(scrollString, nameAndScroll, scrollAtIndex(SACRED_SCROLLS));
const getnUncleanScroll = compose(scrollString, nameAndScroll, scrollAtIndex(UNCLEAN_SCROLLS));
function load() {
  const [sacredName, sacredScroll] = getSacredScroll(rollD10() - 1);
  const [uncleanName, uncleanScroll] = getnUncleanScroll(rollD10() - 1);
  const tableTwo = modifyPath(
    ["rows", 4],
    (s) => ({
      ...s,
      value: uncleanScroll,
      label: `${uncleanName} (unclean scroll)`
    }),
    { ...TABLE_TWO }
  );
  const tableThree = modifyPath(
    ["rows", 1],
    (s) => ({
      ...s,
      value: sacredScroll,
      label: `${sacredName} (sacred scroll)`
    }),
    { ...TABLE_THREE }
  );
  return {
    tables: {
      characters: CHARACTERS,
      tableOne: TABLE_ONE,
      tableTwo,
      tableThree,
      weaponTable: WEAPONS,
      armorTable: ARMOR_TABLE,
      terribelTraits: TERRIBE_TRAITS,
      brokenBodies: BROKEN_BODIES,
      badHabits: BAD_HABITS
    }
  };
}
export {
  load
};
