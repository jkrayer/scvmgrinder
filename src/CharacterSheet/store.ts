import { writable } from "svelte/store";
import type { CharacterType } from "./type";

const defaultCharacter: CharacterType = {
  name: "Katlak",
  silver: 34,
  status: [],
  abilities: { agility: 0, presence: -2, strength: 1, toughness: 1 },
  hitpoints: { current: 3, maximum: 6 },
  campaignId: "e9lQv3ZyOxnPKyrK",
  class: {
    name: "Fanged Deserter",
    abilities:
      "<p><b>Clumsy and Dull-witted</b> Agility tests are DR+2, excluding defence. You are incapable of understanding scrolls.</p><p><b>Bite Attack</b>DR10 to attack, d6 damage. You must be close to your target. 1–2 on d6 chance the enemy gets a free attack.</p><p><b>Crumpled Monster Mask</b> Strikes primitive fear into lesser creatures like goblins, gnoums and children. While worn, they check Morale every round.</p>",
    image: "images/fanged_deserter.png",
  },
  tests: {
    agility: 2,
    presence: 0,
    strength: 0,
    toughness: 0,
    attack: 0,
    defense: 0,
  },
  omens: { current: 4, maximum: 4 },
  description:
    "<p>Your earliest memories are of suckling a wolf in the wilds of Bergen Chrypt.</p><p>You have thirty or so friends who never let you down: YOUR TEETH. Disloyal, deranged or simply uncontrollable, any group that didn’t boot you out you left anyway. But your parliament of teeth — enormous, protruding, thick and sharp — have always been your allies.</p><p>Vindictive and Cruel. Rotting face, wearing mask. You stutter when lying.</p>",
  equipment: [
    "Waterskin and 2 day's worth of food",
    {
      name: "Warhammer",
      damageDie: "1d6",
      type: "weapon",
      subType: "melee",
      equipped: true,
      broken: false,
    },
    {
      name: "Scale armor",
      type: "armor",
      tier: { current: 2, maximum: 2 },
      equipped: true,
      effect: {
        description: "DR +2 on Agility tests including defence",
        tests: { agility: 2, defense: 2 },
      },
    },
    "Sack for 10 normal-sized items",
    "Manacles",
    "Mirror, worth 15s",
    { name: "Shield", type: "shield", equipped: true, broken: false },
  ],
  powers: null,
  _id: "UTetg6vHrvwG2o19",
};

const Character = writable<CharacterType>(defaultCharacter);

export default Character;

export function update(fn: (arg1: CharacterType) => CharacterType): void {
  Character.update(fn);
}
