import { compose, equals, has, propSatisfies } from "ramda";
import { insertQuantity } from "../../Equipment/lib";

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
