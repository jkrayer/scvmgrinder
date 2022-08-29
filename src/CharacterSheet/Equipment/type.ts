import type { Equipment } from "../type";

export type FormData = {
  type:
    | "equipment"
    | "food"
    | "potion"
    | "scroll"
    | "shield"
    | "armor"
    | "ammunition"
    | "weapon";
  name: string;
  description: string;
  quantity: number;
  subtype: null | string;
  tier: null | 1 | 2 | 3;
  ammoType: null | "arrow" | "bolt";
  damageDie: null | "1d2" | "1d4" | "1d6" | "1d8" | "1d10";
  equipped: null | false;
};
