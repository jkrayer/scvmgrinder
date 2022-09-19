import { writable, derived, type Readable } from "svelte/store";
import { updateCharacter } from "../lib/db";
import { getScrolls } from "./lib";
import {
  getEquippedArmor,
  isEquippedMediumOrHeavyArmor,
  getEquippedWeapons,
  isEquippedZweihander,
} from "../lib/character/equipment";

const Character = writable<CharacterType>();

export default Character;

Character.subscribe((c: CharacterType) => {
  if (c !== undefined) updateCharacter(c);
});

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

type TPowers = {
  powers: null | number;
  scrolls: Scroll[];
  message: null | string;
};

export const POWERS: Readable<TPowers> = derived(
  [Character, EquippedArmor, EquippedWeapons],
  ([character, armorAndShield, weapons], set) => {
    const { powers } = character;
    const scrolls = getScrolls(character);

    const P: TPowers = {
      powers,
      scrolls,
      message: null,
    };

    // TODO: (or not) replace logic with Either monad
    if (powers === null) {
      P.message = `${character.class.name} can't use powers.`;
    } else if (powers === 0) {
      P.message = `${character.name} has no more powers today.`;
    } else if (scrolls.length === 0) {
      P.message = `${character.name} needs more scrolls.`;
    } else if (isEquippedMediumOrHeavyArmor(armorAndShield)) {
      P.message = `${character.name} can't use scrolls while wearing ${armorAndShield.armor.name}.`;
    } else if (isEquippedZweihander(weapons)) {
      P.message = `${character.name} can't use scrolls while wielding a zweihander.`;
    }

    set(P);
  }
);
