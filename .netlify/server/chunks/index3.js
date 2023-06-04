import { pathOr, add, subtract, multiply } from "ramda";
import "./dice.js";
const LOCAL_MATH = Object.freeze({
  "+": add,
  "-": subtract,
  x: multiply
});
pathOr("", ["target", "value"]);
const toDiceString = (dice) => dice.join("");
const minRoll = ([number = 0, , , symbol = "+", modifier = 0]) => LOCAL_MATH[symbol](number, modifier);
const maxRoll = ([number = 0, , dice = 0, symbol = "+", modifier = 0]) => LOCAL_MATH[symbol](number * dice, modifier);
export {
  maxRoll as a,
  minRoll as m,
  toDiceString as t
};
