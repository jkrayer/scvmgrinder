import { g as getCharacters } from "../../chunks/db.js";
async function load() {
  return { characters: await getCharacters() };
}
export {
  load
};
