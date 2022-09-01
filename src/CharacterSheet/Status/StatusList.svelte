<script lang="ts">
  import { slide } from "svelte/transition";
  import { isEmpty } from "ramda";
  import Stat from "./Status.svelte";

  export let status: { [keys: string]: Status } = {};
</script>

{#if !isEmpty(status)}
  <div class="wrapper" transition:slide>
    <h2 class="character-sheet-field-label header">Status:</h2>
    <p class="effects">
      {#each Object.values(status) as stat, index (stat.name)}
        {index > 0 ? ", " : ""}<Stat status={stat} /><!--
      -->{/each}
    </p>
  </div>
{/if}

<style>
  .wrapper {
    margin: var(--small-padding) 0;
  }
  .header,
  .effects {
    display: inline-block;
    margin: 0;
  }
  .effects {
    text-indent: var(--small-padding);
    font-family: var(--fixed);
    letter-spacing: 0.01em;
  }
</style>
