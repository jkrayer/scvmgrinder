<script type="ts">
  export let miseries = [];

  $: firstFalse = miseries.indexOf(false);
</script>

<div class="character-sheet-field">
  <h2 class="character-sheet-field-label">Miseries:</h2>
  {#each miseries as misery, index}
    <input
      type="checkbox"
      bind:checked={misery}
      disabled={index !== firstFalse}
    />
  {/each}
</div>
