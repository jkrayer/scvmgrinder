<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let maximum: number = 0;
  export let current: number = 0;

  const dispatch = createEventDispatcher();
</script>

<div>
  <div class="character-sheet-field">
    <h2 class="character-sheet-field-label">Omens:</h2>
    <div>(d{maximum}/day)</div>
    <button
      type="button"
      on:click={() => dispatch("use:omen")}
      disabled={current === 0}>use ({current})</button
    >
  </div>
  <p class="character-sheet-copy">
    Maximum damage, Reroll, –d6 damage, DR –4, No Crit/Fumble
  </p>
</div>

<style>
  .disabled {
    opacity: 0.8;
  }
</style>
