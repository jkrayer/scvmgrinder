<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let maximum: number = 0;
  export let current: number = 0;

  const dispatch = createEventDispatcher();
</script>

<div>
  <div class="field">
    <div id="power-class" class="field-label">Omens:</div>
    <div>(d{maximum}/day)</div>
    <button
      type="button"
      on:click={() => dispatch("use:omen")}
      disabled={current === 0}>use ({current})</button
    >
  </div>
  <p class="small">Maximum damage, Reroll, –d6 damage, DR –4, No Crit/Fumble</p>
</div>

<style>
  .field {
    padding: var(--small-padding);
    margin-bottom: var(--small-padding);
    color: var(--black);
    background-color: var(--white);
  }
  .field-label {
    display: inline;
    font: 400 1.5rem/1 var(--handwriting);
  }
  .h2 {
    display: inline;
    font-family: var(--fixed);
  }
  .small {
    font: 400 0.875rem/1.33333 var(--fixed);
  }
  .disabled {
    opacity: 0.8;
  }
</style>
