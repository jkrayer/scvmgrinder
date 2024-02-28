import { b as getCharacter } from "../../../../chunks/db.js";
async function load({
  params: { id }
}) {
  return { character: await getCharacter(parseInt(id, 10)) };
}
export {
  load
};
