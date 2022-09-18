import { compose, filter, fromPairs, toPairs } from "ramda";
import { AMMUNITION_TYPES, SCROLL_TYPES, WEAPON_TYPES } from "./formdata";
import type { FormData } from "./type";

export const parens = (desc: string): string =>
  ["(", undefined].includes(desc[0]) ? desc : `(${desc})`;

export const insertQuantity = ({
  description,
  quantity = { current: -1, maximum: -1 },
}: Equipment): string =>
  quantity.current === -1
    ? description
    : description.replace("%", String(quantity.current));

export const formatListDescription = compose(parens, insertQuantity);

export const hasSubtypes = (x: string): boolean =>
  ["ammunition", "weapon", "scroll"].includes(x);

export const getSubtypes = (x: string) => {
  if (x === "ammunition") {
    return { title: "Type of Ammuntion", values: AMMUNITION_TYPES };
  } else if (x === "scroll") {
    return { title: "Type of Scroll", values: SCROLL_TYPES };
  } else if (x === "weapon") {
    return { title: "Type of Weapon", values: WEAPON_TYPES };
  }

  return { title: "", values: [] };
};

export const getFormData = (
  type:
    | "equipment"
    | "food"
    | "potion"
    | "scroll"
    | "shield"
    | "armor"
    | "ammunition"
    | "weapon"
): FormData => {
  const DD: FormData = {
    type: "equipment",
    name: "",
    description: "",
    quantity: 0,
    subtype: null,
    tier: null,
    ammoType: null,
    damageDie: null,
    equipped: null,
  };

  let data: Partial<FormData> = {};

  switch (type) {
    case "weapon":
      data = {
        subtype: "melee",
        ammoType: "arrow",
        damageDie: "1d2",
        equipped: false,
      };
      break;
    case "ammunition":
      data = { subtype: "arrow" };
      break;
    case "armor":
      data = { tier: 1, equipped: false };
      break;
    case "shield":
      data = { equipped: false };
      break;
    case "scroll":
      data = { subtype: "sacred" };
      break;
    default:
      break;
  }

  return { ...DD, ...data, type };
};

export const equipmentMax = (
  x: "arrow" | "bolt" | "food" | "potion" | string
): number => {
  const maxTable = {
    arrow: 20,
    bolt: 20,
    food: 5,
    potion: 4,
  };

  return maxTable[x] || 1;
};

const quantity = ({ quantity, ...rest }: Partial<FormData>) =>
  quantity === 0
    ? rest
    : {
        ...rest,
        quantity: {
          current: quantity,
          maximum: equipmentMax(rest.subtype || rest.type),
        },
      };

const tier = ({ tier, ...rest }: { tier: null | number }) =>
  tier === undefined
    ? rest
    : { ...rest, tier: { current: tier, maximum: tier } };

const ammo = ({ ammoType, ...rest }: { ammoType: string }) =>
  ammoType === undefined
    ? rest
    : {
        ...rest,
        tier: {
          ammunitionType: ammoType,
          ammunitionName: ammoType === "arrow" ? "Arrow(s)" : "Bolt(s)",
        },
      };

const stripNullVals = compose(
  fromPairs,
  filter(([, val]) => val !== null),
  toPairs
) as (arg1: FormData) => Partial<FormData>;

// @ts-ignore
export const format = compose(ammo, tier, quantity, stripNullVals) as (
  data: FormData
) => Equipment;
