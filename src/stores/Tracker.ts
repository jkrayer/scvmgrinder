import { derived, Readable } from "svelte/store";
import { getTrackerMonsters, getTrackerSide } from "../lib/campaign";
import CharactersStore from "./Characters";
import CampaignStore, { setSide } from "./Campaign";
import { send } from "../Messages/state/MessageStore";
import type { TTrackerData } from "../global";

const INITIAL_STATE: TTrackerData = Object.freeze({
  firstSide: "players",
  players: [],
  monsters: [],
});

const TrackerStore: Readable<TTrackerData> = derived(
  [CharactersStore, CampaignStore],
  ([{ players }, { campaign }], set) => {
    const monsters = getTrackerMonsters(campaign);
    const firstSide = getTrackerSide(campaign);

    set({
      firstSide,
      players,
      monsters,
    } as TTrackerData);
  },
  INITIAL_STATE
);

export default TrackerStore;

// TODO: check players and monsters for init effect
export const rollInitiative = (inititive: number, monsterInit: number = 3) => {
  let target: string = "";

  if (inititive <= monsterInit) {
    setSide("monsters");
    target = "Monsters Go First!";
  } else {
    setSide("players");
    target = "Players Go First!";
  }

  // TODO: Add TEST Number Here
  send({
    name: "Initiative",
    rollType: "Test",
    roll: inititive,
    rollFormula: "1d6",
    target,
  });
};
