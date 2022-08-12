import client from "../stores/Socket";
// import { TCharacter } from "../global";
import Character from "../stores/Character";
export const MESSAGE_SERVICE = "messages";

// client.service("characters").update(characterId, {})

// MONAD
const IO = (run) => ({
  run,
  map: (f) => IO(() => f(run())),
  insert: (f) => IO(() => run(f())),
  chain: (f) => IO(() => f(run()).run()),
  concat: (other) => IO(() => run().concat(other.run())),
});
IO.of = (x) => IO(() => x);

const ioupdate = IO((someval) => {
  console.log("ioupdate", someval);
  return someval;
});

const iomessage = IO((someval) => {
  console.log("iomessage", someval);
  return someval;
});

const logSomeval = (somval) => {
  ioupdate
    .insert(() => somval)
    .chain(iomessage)
    .run();
};

/*
const IOUpdate = IO((character: TCharacter) => {
  const { _id, ...data } = character;

  client.service("characters").update(_id, data);

  return character;
});

export function updateCharacter(character: TCharacter) {
  IOUpdate.insert(() => character).run();
}

export function subscibe(setter: (arg1: TCharacter) => void) {
  client.service("character").on("update", setter);
}

const updateHp = (character) => (adjustby) => ({ ...character, newHp });

// updateHp;

// MESSAGES WHEN DATA CHANGES
const IOMessage = IO((message: any) => {
  client.service("messages").create(message);
});

//
function fff(character) => {
 return IOMessage.insert(character)
}

*/
