<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let silver: number = 0;

  let x: number = 0;

  const dispatch = createEventDispatcher();

  const handleSubmit = () => {
    dispatch("setSilver", x);
    x = 0;
  };
</script>

<div class="character-sheet-field">
  <h2 class="character-sheet-field-label">Silver:</h2>
  <form on:submit|preventDefault={handleSubmit} class="character-sheet-title">
    {silver}
    <input type="number" bind:value={x} size="5" />
    <button type="submit">set</button>
  </form>
</div>
