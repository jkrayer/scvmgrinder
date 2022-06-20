import { writable, get } from "svelte/store";
import client from "./Socket";
import type { Campaign, Adventure } from "../global";
import shadowKing from "../data/the-shadow-kings-lost-heir";

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
    const campaign = await client.service("campaigns").get("e9lQv3ZyOxnPKyrK");
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
};

main();

export default {
  subscribe: CampaignStore.subscribe,
};
