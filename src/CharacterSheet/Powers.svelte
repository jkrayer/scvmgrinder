<script type="ts">
  export let powers: null | number = null;
  // Array of scrolls
  export let scrolls: any[] = [];

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
          <p>Scroll Name</p>
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
