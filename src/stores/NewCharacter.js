import { writable } from "svelte/store";
import { newProvisions } from "../lib/factory";

const emptyCharacter = () => ({
  name: "",
  silver: 0,
  food: 0,
  tableoneresult: null,
  tabletworesult: null,
  tablethreeresult: null,
  weapon: null,
  armor: null,
  strength: 0,
  agility: 0,
  presence: 0,
  toughness: 0,
  hitpoints: 0,
});

const NewCharacter = writable(emptyCharacter());

NewCharacter.subscribe((value) => {
  console.log(value);
});

export default NewCharacter;

// Sample for parsing above data into final data
const createCharacter = (newCharacter) => {
  const { food, ...rest } = newCharacter;

  return { ...rest, equipment: [newProvisions(food)] };
};
