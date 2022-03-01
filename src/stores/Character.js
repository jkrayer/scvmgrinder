import { mapObjIndexed } from 'ramda'
import { writable } from 'svelte/store';

const STORAGE_KEY = 'character'

const character = writable({}, (set) => {
  const char = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); // add either?

  set(char)
  
  return (a,b,c,d) => console.log('nomoresubs',a,b,c,d)
})

character.subscribe(value => {
  console.log('sub', value)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
});

export default character

// 
const toggleArmor = (slotId) => (value, key, obj) => {
  const { type, equipped } = value;

  if (type !== 'armor') {
    return value;
  }

  return {...value, equipped: key === slotId ?  !equipped : false}
}

// 
export const equipArmor = (slotId) => character.update((currentCharacter) => {
  const {equipment} = currentCharacter;
  
  return {
    ...currentCharacter,
    equipment: mapObjIndexed(toggleArmor(slotId), equipment)
  }
});

export const setArmorTier = (slotId, currentTier) => character.update((currentCharacter) => {
  const armor = { ...currentCharacter.equipment[slotId], currentTier };

  return {
    ...currentCharacter,
    equipment:{
      ...currentCharacter.equipment,
      [slotId]: armor
    }
  }
})

// STRUCTURE
const CHARACTER = {
  name: 'Gotven',
  description: '<p>Brought up by illiterate, pig-ignorant churls in a peaceful Wästland forest. You were Südglans’ most revered philosopher — which sank into the sea and now everyone ruthlessly mocks you.</p><p>The road an unreasoning maze, every temple soaked in blood, each destination drenched in gloom; you once thought that cold analysis might tame Fate itself, now that dream of reason has decayed to shifting madness and only the cold remains.</p><p>Suspicious and shrewd. Hands caked with sores. Inveterate bug eater.</p>',
  class: {
    name: 'Forlorn Philosopher',
    powers: ['Carno-Organic Speleophagy (Ochre Tablet) Transmogrifies a child-sized rock into burnt, chewy meat. Feeds d4 famished people.', 'Prism of Ambiguity An external light source and a Presence DR10 test are needed to activate the prism. Its light may shine on up to two creatures healing d6 HP. For the next hour one of them lowers all test DRs by -2. If the test is failed they suffer d4 damage and their armor or a weapon is destroyed. You can use the prism twice per day.']
  },
  hitpoints: {
    maximum: 1,
    current: 1
  },
  omens: {
    die:4,
    current:1
  },
  abilities: {
    strength: 1,
    agility: 0,
    presence: 0,
    toughness: -1,
  },
  armorWorn: {},
  shieldEquipped: {},
  equipment: {
    '001': {
      _id: '',
      type: 'armor',
      equipped: true,
      maxtier: 3,
      currentTier: 2,
      broken: false,
      name: 'Plate'
    },
    '002': {
      _id: '',
      type: 'food',
      name: 'Waterskin and 2 days\' worth of food'
    },
    '003': {
      _id: '',
      type: 'weapon',
      equipped: true,
      damage: 6,
      broken: false,
      name: 'Warhammer'
    },
    '004': {
      _id: '',
      type: 'scroll',
      name: 'Death (unclean scroll)',
      description: 'All creatures within 30 feet lose a total of 4d10 HP'
    },
    '005': {
      _id: '',
      type: 'animal',
      name: 'Small but vicious dog',
      description: '(5 HP, bite d4, only obeys you)'
    },
    '006': {},
    '007': {},
    '008': {},
    '009': {},
    '010': {},
    '011': {},
    '012': {},
    '013': {},
    '014': {},
    '015': {},
    '016': {},
  },
  silver: 21
}


