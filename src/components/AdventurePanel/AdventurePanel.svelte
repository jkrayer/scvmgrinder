<script type="ts">
  import type { Adventure } from "../../global";
  import Game from "../../stores/Campaign";

  let adventure: Adventure | null = null;

  Game.subscribe((data) => {
    adventure = data.adventure;
  });

  $: console.log("ADVPAN", adventure);
</script>

{#if adventure !== null}
  <div
    id="adventure-panel"
    style={`background-image: url(${adventure.poster})`}
  />
{/if}

<style>
  #adventure-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
