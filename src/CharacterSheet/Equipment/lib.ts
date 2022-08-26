import { compose } from "ramda";
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

export const formatDescription = compose(parens, insertQuantity);
