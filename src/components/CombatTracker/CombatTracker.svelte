<script type="ts">
  import { head } from "ramda";
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

  type UIData = TTrackerData & { selectedMonster: TrackerMonster };

  let trackerItems: UIData = {
    firstSide: "players",
    players: [],
    monsters: [],
    selectedMonster: null,
  };

  let targeting: boolean = false;

  TrackerStore.subscribe((trackerData: TTrackerData) => {
    const getSelectedMonster = () =>
      trackerItems.selectedMonster === null
        ? [null]
        : trackerData.monsters.filter(
            (m) => m._id === trackerItems.selectedMonster._id
          );

    trackerItems = {
      ...trackerData,
      selectedMonster: head(getSelectedMonster()),
    };
    console.log("tracker subs");
  });

  Attack.subscribe(
    (store) => (targeting = !!store.attacker || !!store.damager)
  );

  // LOCAL STATE
  // let selectedMonster: TrackerMonster = null;

  // HANDLERS
  const handleClick = (item: TTrackerItem) =>
    targeting ? setTarget(item as TrackerMonster) : null;

  const showSheet = (monster: TTrackerItem) => () =>
    (trackerItems.selectedMonster = monster as TrackerMonster);
  const closeSheet = () => (trackerItems.selectedMonster = null);
</script>

<div id="tracker">
  <Modal
    visible={!!trackerItems.selectedMonster}
    onClose={closeSheet}
    showOverlaw={false}
  >
    <MonsterSheet monster={trackerItems.selectedMonster} />
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
