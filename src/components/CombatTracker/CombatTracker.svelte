<script type="ts">
  import type { TTrackerData } from "../../global";
  import TrackerStore, { rollInitiative } from "../../stores/Tracker";
  import { SIDES } from "../../lib/gameConstants";
  import TrackerItem from "./TrackerItem.svelte";
  import RollButton from "../Buttons/RollButton.svelte";

  let trackerItems: TTrackerData = {
    firstSide: "players",
    players: [],
    monsters: [],
  };

  TrackerStore.subscribe(
    (trackerData: TTrackerData) => (trackerItems = trackerData)
  );
</script>

<div id="tracker">
  <RollButton diceString="1d6" onRoll={rollInitiative}>Init</RollButton>
  <ul class="trackerlist">
    {#each trackerItems[trackerItems.firstSide] as item (item)}
      {#key item._id}
        <TrackerItem {item} targeting={true} />
      {/key}
    {/each}
  </ul>
  <hr class="tracker-divider" />
  <ul class="trackerlist second-list">
    {#each trackerItems[SIDES[trackerItems.firstSide]] as item (item)}
      {#key item._id}
        <TrackerItem {item} targeting={false} />
      {/key}
    {/each}
  </ul>
</div>

<style>
  #tracker .tracker-item {
    cursor: crosshair;
  }
  .trackerlist {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .trackerlist:first-of-type {
    margin-top: var(--small-padding);
  }

  .tracker-divider {
    width: 100%;
    border-width: 2px;
    margin-top: 0;
    margin-bottom: var(--small-padding);
  }
</style>
