export const character: CharacterType = {
  name: "Brinta",
  silver: 23,
  abilities: {
    agility: -3,
    presence: 1,
    strength: 2,
    toughness: -3,
  },
  hitpoints: {
    maximum: 1,
    current: 1,
  },
  campaignId: "e9lQv3ZyOxnPKyrK",
  class: {
    name: "Esoteric Hermit",
    abilities:
      "<p><b>Initiate of the Invisible College</b></p><p>Once per day you may summon D2 scrolls, whose power can be used only once. Roll a d4, on a 1–2 the scrolls are sacred, on a 3–4, unclean. If the scrolls are not used before sunrise they turn to ash.</p>",
    image: "images/esoteric_hermit.png",
  },
  tests: {
    agility: 0,
    presence: 0,
    strength: 0,
    toughness: 0,
    attack: 0,
    defense: 0,
  },
  omens: {
    current: 4,
    maximum: 4,
  },
  description:
    "<p>You remember awakening, adult, in a ritual circle underneath the northern bridge to Grift.</p><p>The stone of your cave is one with the stars. Silence and perfection. Now the chaos of a fallen world disturbs your rituals and the caul of night grows blacker than your cavern’s gloom. Irritating!</p><p>Prone to substance abuse and Wasteful. Covered in (for some) blasphemous tattoos. Permanent phlegm deposit in throat. Continuously coughs, snorts, spits and swallows.</p>",
  equipment: [
    {
      _id: "Waterskin_982723",
      type: "food",
      name: "Waterskin",
      description: "and % day's worth of food",
      quantity: {
        maximum: 5,
        current: 1,
      },
    },
    {
      _id: "Femur_287327276",
      type: "weapon",
      name: "Femur",
      description: "1d4 damage",
      damageDie: "1d4",
      subType: "melee",
      equipped: true,
    },
    {
      _id: "Bow_287373",
      type: "weapon",
      name: "Bow",
      description: "and % arrows 1d6 damage",
      damageDie: "1d6",
      subType: "ranged",
      equipped: true,
      ammunitionType: "arrow",
      ammunitionName: "Arrow(s)",
      quantity: {
        current: 10,
        maximum: 20,
      },
    },
    {
      _id: "Padded cloth armor_1663623607076",
      type: "armor",
      name: "Padded cloth armor",
      description: "tier 1",
      tier: {
        current: 1,
        maximum: 1,
      },
      equipped: true,
    },
    {
      _id: "Kite Shield_28373",
      type: "shield",
      name: "Kite Shield",
      description: "",
      equipped: true,
    },
    {
      _id: "Bear trap_28373",
      type: "equipment",
      name: "Bear trap",
      description: "(DR14 to spot, d8 damage)",
    },
    {
      _id: "Lard_83843",
      name: "Lard",
      type: "food",
      description: "(may function as % meals in a pinch)",

      quantity: {
        current: 5,
        maximum: 5,
      },
    },
    {
      _id: "Te-le-kin-esis_29383",
      name: "Te-le-kin-esis",
      type: "scroll",
      subType: "unclean",
      description: "Move an object up 1d10×10 feet for d6 minutes",
    },
    {
      _id: "Grace of a Dead Saint_292726262",
      name: "Grace of a Dead Saint",
      type: "scroll",
      subType: "sacred",
      description: "d2 creatures regain d10 HP each.",
    },
  ],
  status: {},
  powers: 3,
  miseries: [false, false, false, false, false, false, false],
  _id: 5,
};
