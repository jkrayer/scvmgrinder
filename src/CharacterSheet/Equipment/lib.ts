import { compose, equals, has, propSatisfies } from "ramda";
import type { Equipment } from "../type";

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

export const formatManagertDescription = (eq: Equipment): string => {
  let str = "";

  if (eq.type === "food") {
    str = insertQuantity(eq);
  } else if (eq.type === "weapon" && eq.subType === "ranged") {
    str = ` and ${eq.quantity.current} ${eq.ammunitionName}`;
  } else if (isCountable(eq)) {
    str = `${eq.quantity.current} / ${eq.quantity.maximum}`;
  }

  return str;
};

export const isEquippable = has("equipped");

export const isCountable = has("quantity");

export const isEquipped = propSatisfies(equals(true), "equipped");
