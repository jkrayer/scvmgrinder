<script type="ts">
  import type { TTrackerData, TTrackerItem } from "../../global";
  import TrackerStore, { rollInitiative } from "../../stores/Tracker";
  import { setTarget } from "../../stores/Attack";
  import { SIDES } from "../../lib/gameConstants";
  import TrackerItem from "./TrackerItem.svelte";
  import RollButton from "../Buttons/RollButton.svelte";
  import Attack from "../../stores/Attack";

  let trackerItems: TTrackerData = {
    firstSide: "players",
    players: [],
    monsters: [],
  };

  let targeting: boolean = false;

  TrackerStore.subscribe(
    (trackerData: TTrackerData) => (trackerItems = trackerData)
  );

  Attack.subscribe((store) => {
    targeting = !!store.attack;
  });

  const handleClick = (item: TTrackerItem) =>
    targeting ? setTarget(item) : null;
</script>

<div id="tracker">
  <RollButton diceString="1d6" onRoll={rollInitiative}>Init</RollButton>
  <ul class="trackerlist">
    {#each trackerItems[trackerItems.firstSide] as item (item)}
      {#key item._id}
        <TrackerItem {item} {targeting} onItemClick={handleClick} />
      {/key}
    {/each}
  </ul>
  <hr class="tracker-divider" />
  <ul class="trackerlist second-list">
    {#each trackerItems[SIDES[trackerItems.firstSide]] as item (item)}
      {#key item._id}
        <TrackerItem {item} {targeting} onItemClick={handleClick} />
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
