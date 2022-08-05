<script type="ts">
  import type { TTrackerItem, TrackerMonster } from "../../global";
  import Modal from "../Modal.svelte";
  import MonsterSheet from "../Sheets/MonsterSheet/MonsterSheet.svelte";

  export let item: TTrackerItem;
  export let onItemClick: (item: TTrackerItem) => void;
  export let targeting: boolean = false;

  let selectedMonster: TrackerMonster = null;

  const defaultImage =
    "https://dsgchicago.com/dsgchicago/wp-content/uploads/2019/11/person-placeholder.jpg"; // item?.portrait
  const healthBarWidth = Math.floor(
    (item.hitpoints.current / item.hitpoints.maximum) * 100
  );

  // Handlers
  const showSheet = (monster: TrackerMonster) => () =>
    (selectedMonster = monster);
  const closeSheet = () => (selectedMonster = null);
</script>

<li class="tracker-item-wrapper" on:click={() => onItemClick(item)}>
  <Modal visible={!!selectedMonster} onClose={closeSheet}>
    <MonsterSheet monster={selectedMonster} />
  </Modal>
  <div class="tracker-item" class:targeting>
    <img
      src={defaultImage}
      class="tracker-item-portrait"
      alt={item.name}
      width="48"
      height="48"
    />
    <div class="health-bar" style={`width:${healthBarWidth}%;`}>
      <div class="health-bar_currant" />
    </div>
  </div>
  <div class="tracker-item-functions">
    <slot />
    <!-- <button type="button" on:click={showSheet(item)}>Open</button> -->
  </div>
</li>

<style>
  .targeting {
    cursor: crosshair;
  }
</style>
