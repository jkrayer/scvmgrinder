<script type="ts">
  import type { Adventure } from "../../global";
  import Game from "../../stores/Campaign";

  let adventure: Adventure | null = null;

  Game.subscribe((data) => {
    adventure = data.adventure;
  });
</script>

{#if adventure !== null}
  <div
    id="adventure-panel"
    style={`background-image: url(${adventure.poster})`}
  />
{/if}

<style>
  #adventure-panel {
    /* position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; */
    flex-grow: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>
