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

// HP Helpers
export const incrementHp = () => character.update((currentCharacter) => {
  const { current, maximum } = currentCharacter.hitpoints;

  return current < maximum ? {
    ...currentCharacter,
    hitpoints: {
      current: current + 1,
      maximum
    }
  } : currentCharacter;
})

export const decrementHp = () => character.update((currentCharacter) => {
  const { current, maximum } = currentCharacter.hitpoints;

  return {
    ...currentCharacter,
    hitpoints: {
      current: current - 1,
      maximum
    }
  }
})