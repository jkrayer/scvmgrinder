<script type="ts">
  import type { TTrackerData, Campaign, TrackerMonster } from "../../global";
  import CharactersStore from "../../stores/Characters";
  import CampaignStore from "../../stores/Campaign";
  import TrackerItem from "./TrackerItem.svelte";

  const sides = {
    players: "monsters",
    monsters: "players",
  };

  let trackerItems: TTrackerData = {
    firstSide: "players",
    players: [],
    monsters: [],
  };

  CharactersStore.subscribe((data) => {
    trackerItems.players = data.players;
  });

  CampaignStore.subscribe(({ campaign }) => {
    console.log(23, "tracker", campaign);
    if (campaign !== null) {
      trackerItems.monsters = campaign.trackerData.monsters || [];
      trackerItems.firstSide = campaign.trackerData.firstSide || "players";
    }
  });

  $: firstSide = trackerItems.firstSide;
  $: secondSide = sides[firstSide];
  $: console.log(31, trackerItems);
</script>

<div id="tracker">
  <button type="button">Init</button>
  <ul class="trackerlist">
    {#each trackerItems[firstSide] as item (item)}
      {#key item._id}
        <TrackerItem {item} />
      {/key}
    {/each}
  </ul>
  <ul class="trackerlist second-list">
    {#each trackerItems[secondSide] as item (item)}
      {#key item._id}
        <TrackerItem {item} />
      {/key}
    {/each}
  </ul>
</div>

<style>
  .trackerlist {
    padding: 0;
    margin: 0;
    list-style: none;
  }
</style>
