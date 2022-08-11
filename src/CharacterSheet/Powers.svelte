<script type="ts">
  import type { Scroll } from "./type";
  export let powers: null | number = null;
  // Array of scrolls
  export let scrolls: Scroll[] = [];

  const isDisabled = powers === null;
</script>

<div class:disabled={isDisabled}>
  <div class="character-sheet-field">
    <h2 id="power-class" class="character-sheet-field-label">Powers:</h2>
    <div class="character-sheet-copy">
      {#if isDisabled}
        <p>You are not able to use powers.</p>
      {:else}
        {#each scrolls as scroll}
          <p>{scroll.name}</p>
          <p>{scroll.description}</p>
          <!-- Roll Presence Check -->
          <!-- Handle Success and Failure -->
          <button type="button">Use</button>
        {/each}
      {/if}
    </div>
  </div>
  <p class="character-sheet-copy">
    Presence DR12, or -d2 HP and no Powers for 1 hr.
  </p>
</div>

<style>
  .disabled {
    opacity: 0.8;
  }
</style>
