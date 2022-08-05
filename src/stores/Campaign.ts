import { writable, get } from "svelte/store";
import client from "./Socket";
import type {
  Campaign,
  Adventure,
  TrackerMonster,
  TrackerSides,
} from "../global";
import shadowKing from "../data/the-shadow-kings-lost-heir";

const SERVICE: string = "campaigns";

const CampaignStore = writable<{
  adventure?: Adventure;
  campaign?: Campaign;
  loading: boolean;
  error?: string;
}>({
  adventure: null,
  campaign: null,
  loading: true,
  error: null,
});

const main = async () => {
  try {
    const campaign = await client.service(SERVICE).get("e9lQv3ZyOxnPKyrK");

    CampaignStore.set({
      adventure: shadowKing,
      campaign,
      loading: false,
      error: null,
    });
  } catch (e) {
    CampaignStore.set({
      adventure: null,
      campaign: null,
      loading: false,
      error: e.toString(),
    });
  }

  // Probably going to have the same problem as sheet if some other campaign is updated
  // May need this on updated and patched
  client.service(SERVICE).on("patched", (campaign: Campaign) => {
    const store = get(CampaignStore);

    console.log(40, "update", campaign);

    CampaignStore.set({
      ...store,
      campaign,
    });
  });
};

main();

export default CampaignStore;

export function addMonsters(monsters: TrackerMonster[]) {
  const { campaign } = get(CampaignStore);

  client.service("campaigns").patch("e9lQv3ZyOxnPKyrK", {
    trackerData: {
      ...campaign.trackerData,
      monsters,
    },
  });
}

export function setSide(firstSide: TrackerSides) {
  const { campaign } = get(CampaignStore);

  client.service("campaigns").patch("e9lQv3ZyOxnPKyrK", {
    trackerData: {
      ...campaign.trackerData,
      firstSide,
    },
  });
}

export function damageMonster(monster: TrackerMonster, hp: number) {
  const { campaign } = get(CampaignStore);
  const monsters = campaign.trackerData.monsters.map((x) =>
    x._id === monster._id
      ? {
          ...x,
          hitpoints: {
            maximum: x.hitpoints.maximum,
            current: x.hitpoints.current + hp,
          },
        }
      : x
  );

  client.service("campaigns").patch("e9lQv3ZyOxnPKyrK", {
    trackerData: {
      ...campaign.trackerData,
      monsters,
    },
  });
}
