import { map } from 'ramda'
import { writable } from 'svelte/store';

const STORAGE_KEY = 'character:';

const character = writable({});

// const character = writable({}, (set) => {
//   const char = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); // add either?

//   set(char)
  
//   return (a,b,c,d) => console.log('nomoresubs',a,b,c,d)
// })

// More events ... perhaps a way to push changes when the local stops changing
character.subscribe(value => {
  // console.log('sub', value)
  // localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  console.log('selected', value)
  // const  {id } = value;
  // localStorage.setItem(`${STORAGE_KEY}${id}`, JSON.stringify(value))

});

export default character

export const setSelected = (id) => {
    console.log('id', id)
    const selected = localStorage.getItem(`${STORAGE_KEY}${id}`)
    console.log('gotselected', selected)
    // TODO: handle this case
    // if (selected == null)

    character.update(() => JSON.parse(selected))
}


//
const toggleArmor = (itemId) => (value) => {
  const { type, _id, equipped } = value;

  if (type !== 'armor') {
    return value;
  }

  return {...value, equipped: itemId === _id ?  !equipped : false}
}

//
export const equipArmor = (itemId) => character.update((currentCharacter) => {
  const { equipment } = currentCharacter;
  
  return {
    ...currentCharacter,
    equipment: map(toggleArmor(itemId), equipment)
  }
});

// ARMOR
// TODO: This method need to check for out of bounds
export const setArmorTier = (itemId, currentTier) => character.update((currentCharacter) => {
  const equipment = currentCharacter.equipment.map(eq => eq._id === itemId ? { ...eq, currentTier } : eq );
  

  return {
    ...currentCharacter,
    equipment
  }
})

// Weapons
export const breakWeapon = (itemId) => character.update((currentCharacter) => {
  const equipment = currentCharacter.equipment.map((eq) => eq._id !== itemId ? eq : {...eq, broken: true })

  return {
    ...currentCharacter,
    equipment
  }
});

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

// EQUIPMENT
export const dropEquipment = (index) => character.update((currentCharacter) => {
  const { equipment } = currentCharacter;

  return {
    ...currentCharacter,
    equipment: equipment.filter((value, i) => i !== index)
  }
});