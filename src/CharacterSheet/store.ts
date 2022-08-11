import { writable, derived, type Readable } from "svelte/store";
import { getEquippedWeapons, getEquippedArmor, getScrolls } from "./lib";
import type { CharacterType, Weapon, ArmorAndShield, Scroll } from "./type";

const defaultCharacter: CharacterType = {
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
    { type: "equipment", name: "Waterskin and 1 day's worth of food" },
    {
      name: "Femur",
      damageDie: "d4",
      type: "weapon",
      subType: "melee",
      weight: 100,
      equipped: true,
    },
    {
      name: "Bow",
      damageDie: "d6",
      type: "weapon",
      subType: "ranged",
      weight: 100,
      equipped: true,
      ammunitionType: "arrow",
      ammunitionName: "Arrow(s)",
      quantity: {
        current: 10,
        maximum: 20,
      },
    },
    {
      name: "Padded cloth armor",
      type: "armor",
      tier: {
        current: 1,
        maximum: 1,
      },
      equipped: true,
      weight: 100,
    },
    { type: "equipment", name: "Bear trap (DR14 to spot, d8 damage)" },
    {
      name: "Lard",
      type: "food",
      subtype: "",
      description: "(may function as 5 meals in a pinch)",
      weight: 20,
      quantity: {
        current: 5,
        maximum: 5,
      },
    },
    {
      name: "Te-le-kin-esis",
      type: "scroll",
      subType: "unclean",
      description: "Move an object up 1d10×10 feet for d6 minutes",
      weight: 100,
    },
    {
      name: "Grace of a Dead Saint",
      type: "scroll",
      subType: "sacred",
      description: "d2 creatures regain d10 HP each.",
      weight: 100,
    },
  ],
  status: [],
  powers: 3,
  _id: "JEx2BC6COHdTEKMC",
};
const Character = writable<CharacterType>(defaultCharacter);

export default Character;

export function update(fn: (arg1: CharacterType) => CharacterType): void {
  Character.update(fn);
}

//   Readable<Weapon[]>, (arg1: CharacterType) => Weapon[]

export const EquippedWeapons: Readable<Weapon[]> = derived(
  Character,
  getEquippedWeapons
);

export const EquippedArmor: Readable<ArmorAndShield> = derived(
  Character,
  getEquippedArmor
);

export const EqScrolls: Readable<Scroll[]> = derived(Character, getScrolls);
