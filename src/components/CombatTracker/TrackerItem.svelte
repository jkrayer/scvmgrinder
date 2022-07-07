<script type="ts">
  import type { TTrackerItem } from "../../global";

  export let item: TTrackerItem;
  export let onItemClick: (item: TTrackerItem) => void;
  export let targeting: boolean = false;

  const defaultImage =
    "https://dsgchicago.com/dsgchicago/wp-content/uploads/2019/11/person-placeholder.jpg"; // item?.portrait
  const healthBarWidth = Math.floor(
    (item.hitpoints.current / item.hitpoints.maximum) * 100
  );
</script>

<li on:click={() => onItemClick(item)}>
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
</li>

<style>
  .targeting {
    cursor: crosshair;
  }
</style>
