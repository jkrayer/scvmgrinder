<script type="ts">
  import type { TrackerItem } from "../../global";

  export let item: TrackerItem;

  const defaultImage = ""; // item?.portrait
  const healthBarWidth = Math.floor(
    (item.hitpoints.current / item.hitpoints.maximum) * 100
  );
</script>

<li>
  <div class="tracker-item">
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
