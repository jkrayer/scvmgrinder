import { writable, get } from "svelte/store";
import client from "../stores/Socket";
import type { TCharacter } from "../global";

type TCharactersStore = {
  players: TCharacter[];
};

// A store that contains the other characters
const CharactersStore = writable<TCharactersStore>({
  players: [],
});

const main = async () => {
  try {
    const { data }: { data: TCharacter[] } = await client
      .service("characters")
      .find({
        query: {
          campaignId: "e9lQv3ZyOxnPKyrK",
          // _id: {
          //   $nin: ["F7bATPIJ558NwzOu"],
          // },
        },
      });

    CharactersStore.set({
      players: data,
    });
  } catch (e) {
    console.error("Error getting tracker items", e.toString());
  }

  // Add any newly created message to the list in real-time
  client.service("characters").on("updated", (character: TCharacter) => {
    const store = get(CharactersStore);

    const players = store.players.map((item) =>
      item._id === character._id ? character : item
    );

    CharactersStore.set({
      players,
    });
  });
};

main();

export default CharactersStore;

// NEXT: Get Monsters From campaing and add to tracker
// export function addMonsters(monsters: TrackerMonster[]) {
//   client.service("campaigns").patch("e9lQv3ZyOxnPKyrK", {
//     trackerData: {
//       monsters,
//     },
//   });
// }
