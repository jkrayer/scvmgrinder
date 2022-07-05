<script type="ts">
  import type { TTrackerData } from "../../global";
  import CharactersStore from "../../stores/Characters";
  import CampaignStore, { setSide } from "../../stores/Campaign";
  import { send } from "../../stores/MessageStore";
  import { roll } from "../../lib";
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
    if (campaign !== null) {
      trackerItems.monsters = campaign.trackerData.monsters || [];
      trackerItems.firstSide = campaign.trackerData.firstSide || "players";
    }
  });

  $: firstSide = trackerItems.firstSide;
  $: secondSide = sides[firstSide];

  // HANDLERS
  const handleRollInitiative = () => {
    const result: number = roll(6);
    let target: string = "";

    if (result < 4) {
      setSide("monsters");
      target = "Monsters Go First!";
    } else {
      setSide("players");
      target = "Players Go First!";
    }

    send({
      name: "Initiative",
      rollType: "Test",
      roll: result,
      rollFormula: "1d6",
      target,
    });

    // TODO: check players and monsters for init effect
  };
</script>

<div id="tracker">
  <button type="button" on:click={handleRollInitiative}>Init</button>
  <ul class="trackerlist">
    {#each trackerItems[firstSide] as item (item)}
      {#key item._id}
        <TrackerItem {item} />
      {/key}
    {/each}
  </ul>
  <hr class="tracker-divider" />
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

  .tracker-divider {
    width: 100%;
    border-width: 2px;
    margin-top: 0;
    margin-bottom: var(--small-padding);
  }
</style>
