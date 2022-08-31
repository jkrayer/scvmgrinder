<script lang="ts">
  import { slide } from "svelte/transition";
  import { isEmpty } from "ramda";
  import Stat from "./Status.svelte";

  export let status: { [keys: string]: Status } = {};
</script>

{#if !isEmpty(status)}
  <div transition:slide>
    <h2>Status:</h2>
    <p>
      {#each Object.values(status) as stat (stat.name)}
        <Stat status={stat} />
      {/each}
    </p>
  </div>
{/if}
