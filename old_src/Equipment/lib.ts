import { compose, filter, fromPairs, toPairs } from "ramda";
import { AMMUNITION_TYPES, SCROLL_TYPES, WEAPON_TYPES } from "./formdata";
import type { FormData } from "./type";
import { trace } from "../CharacterSheet/lib";

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

export const hassubTypes = (x: string): boolean =>
  ["ammunition", "weapon", "scroll"].includes(x);

export const getsubTypes = (x: string) => {
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
    subType: null,
    tier: null,
    ammoType: null,
    damageDie: null,
    equipped: null,
  };

  let data: Partial<FormData> = {};

  switch (type) {
    case "weapon":
      data = {
        subType: "melee",
        ammoType: "arrow",
        damageDie: "1d2",
        equipped: false,
      };
      break;
    case "ammunition":
      data = { subType: "arrow" };
      break;
    case "armor":
      data = { tier: 1, equipped: false };
      break;
    case "shield":
      data = { equipped: false };
      break;
    case "scroll":
      data = { subType: "sacred" };
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

  return maxTable[x] || 0;
};

const quantity = ({ quantity, ...rest }: Partial<FormData>) => {
  const maximum = equipmentMax(rest.ammoType || rest.subType || rest.type);

  return maximum === 0
    ? rest
    : {
        ...rest,
        quantity: {
          current: quantity || 1,
          maximum,
        },
      };
};

const tier = ({ tier, ...rest }: { tier: null | number }) =>
  tier === undefined
    ? rest
    : { ...rest, tier: { current: tier, maximum: tier } };

const ammo = ({ ammoType, ...rest }: { ammoType: string }) =>
  // @ts-ignore
  ammoType === undefined || rest.subType === "melee"
    ? rest
    : {
        ...rest,
        ammunitionType: ammoType,
        ammunitionName: ammoType === "arrow" ? "Arrow(s)" : "Bolt(s)",
      };

const addId = ({ name, ...rest }: { name: string }) => ({
  _id: `${name}_${Date.now()}`,
  name,
  ...rest,
});

const stripNullVals = compose(
  fromPairs,
  filter(([, val]) => val !== null),
  toPairs
) as (arg1: FormData) => Partial<FormData>;

// @ts-ignore
export const format = compose(
  trace("addIdres"),
  addId,
  trace("ammo res"),
  ammo,
  trace("tier res"),
  tier,
  trace("quantity res"),
  quantity,
  trace("stripnulsres"),
  stripNullVals
) as (data: FormData) => Equipment;
