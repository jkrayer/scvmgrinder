import Dexie from "dexie";
import { compose } from "ramda";
const desc = ({ description, ...rest }) => ({ ...rest, description: [description] });
const className = ({ class: classObj, description, ...rest }) => ({
  ...rest,
  description: description.concat(classObj.abilities),
  className: classObj.name
});
const miseries = ({ miseries: miseries2, ...rest }) => ({
  ...rest,
  miseries: miseries2.map((x) => [x, ""])
});
const convert = compose(miseries, className, desc);
class ScvmgrinderDB extends Dexie {
  characters;
  constructor() {
    super("scvmgrinder");
    this.version(2).stores({
      characters: "++_id, name"
      // Primary key and indexed props
    }).upgrade((trans) => {
      trans.table("characters").toCollection().modify(convert);
    });
  }
}
const DB = new ScvmgrinderDB();
async function deleteCharacter(character) {
  try {
    await DB.characters.delete(character._id);
    return character;
  } catch (error) {
    console.error(`DB: Error deleting character: ${error}`);
    return {};
  }
}
async function updateCharacter(character) {
  try {
    const id = await DB.characters.put(character);
  } catch (error) {
    console.error(`DB: Error updating character" ${error}`);
  }
}
async function getCharacter(id) {
  try {
    const character = await DB.characters.get(id);
    console.log(62, character);
    return character || {};
  } catch (error) {
    console.error(`DB: Error finding character" ${error}`);
    return {};
  }
}
async function getCharacters() {
  try {
    const characters = await DB.characters.toArray();
    return characters;
  } catch (error) {
    console.error(`DB: Error finding character" ${error}`);
    return [];
  }
}
async function addCharacter(character) {
  try {
    const id = await DB.characters.add(character);
    return getCharacter(id);
  } catch (error) {
    console.error(`DB: Error adding character: ${error}`);
    return {};
  }
}
export {
  addCharacter as a,
  getCharacter as b,
  deleteCharacter as d,
  getCharacters as g,
  updateCharacter as u
};
