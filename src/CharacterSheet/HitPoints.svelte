<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let current: number = 0;
  export let maximum: number = 0;

  const dispatch = createEventDispatcher();
</script>

<div class="field">
  <div class="field-label">Hit Points:</div>
  <span>{current}/{maximum}</span>
  <button type="button" on:click={() => dispatch("decrement")}>-</button>
  <button type="button" on:click={() => dispatch("increment")}>+</button>
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
