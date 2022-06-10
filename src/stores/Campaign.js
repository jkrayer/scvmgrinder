import client from "./Socket";
import { writable } from "svelte/store";

const DATA = {
  _id: "",
  description: "",
  miseries: ["", "", "", "", "", "", ""],
  name: "",
  system: "",
};

const CampaignStore = writable({
  data: { ...DATA },
  loading: true,
  error: null,
});

console.log(18, CampaignStore);

const main = async () => {
  try {
    const campaign = await client.service("campaigns").get("e9lQv3ZyOxnPKyrK");
    CampaignStore.set({
      data: campaign,
      loading: false,
      error: null,
    });
  } catch (e) {
    CampaignStore.set({
      data: { ...DATA },
      loading: false,
      error: e,
    });
  }

  // Add any newly created message to the list in real-time
  // app.service("messages").on("created", addMessage);
};

main();

export default {
  subscribe: CampaignStore.subscribe,
};
