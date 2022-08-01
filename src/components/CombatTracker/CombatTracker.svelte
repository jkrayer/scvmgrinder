<script type="ts">
  import type {
    TTrackerData,
    TTrackerItem,
    TrackerMonster,
  } from "../../global";
  import TrackerStore, { rollInitiative } from "../../stores/Tracker";
  // import { setTarget } from "../../stores/Attack";
  import Attack, { setTarget } from "../../Combat/Attack";

  import { SIDES } from "../../lib/gameConstants";
  import TrackerItem from "./TrackerItem.svelte";
  import RollButton from "../Buttons/RollButton.svelte";
  // import Attack from "../../stores/Attack";
  import Modal from "../Modal.svelte";
  import MonsterSheet from "../Sheets/MonsterSheet/MonsterSheet.svelte";

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
    console.log(31, store);
    targeting = !!store.attacker;
  });

  // LOCAL STATE
  let selectedMonster: TrackerMonster = null;

  // HANDLERS
  const handleClick = (item: TTrackerItem) => {
    console.log("hadlingtclik", targeting);
    targeting ? setTarget(item as TrackerMonster) : null;
  };

  const showSheet = (monster: TTrackerItem) => () =>
    (selectedMonster = monster as TrackerMonster);
  const closeSheet = () => (selectedMonster = null);
</script>

<div id="tracker">
  <Modal visible={!!selectedMonster} onClose={closeSheet} showOverlaw={false}>
    <MonsterSheet monster={selectedMonster} />
  </Modal>
  <RollButton diceString="1d6" onRoll={rollInitiative}>Init</RollButton>
  <ul class="trackerlist">
    {#each trackerItems[trackerItems.firstSide] as item (item)}
      {#key item._id}
        <TrackerItem {item} {targeting} onItemClick={handleClick}>
          {#if trackerItems.firstSide === "monsters"}
            <button type="button" on:click={showSheet(item)}>Open</button>
          {/if}
        </TrackerItem>
      {/key}
    {/each}
  </ul>
  <hr class="tracker-divider" />
  <ul class="trackerlist second-list">
    {#each trackerItems[SIDES[trackerItems.firstSide]] as item (item)}
      {#key item._id}
        <TrackerItem {item} {targeting} onItemClick={handleClick}>
          {#if trackerItems.firstSide !== "monsters"}
            <button type="button" on:click={showSheet(item)}>Open</button>
          {/if}
        </TrackerItem>
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
