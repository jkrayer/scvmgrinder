<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CharacterStore, { update } from "./store";
  import { incrementHp } from "./lib";

  let modifier: number = 0;
  const current: number = $CharacterStore.hitpoints.current;
  const dispatch = createEventDispatcher();

  $: next = modifier + current;

  const increment = () => (modifier += 1);
  const decrement = () => (modifier -= 1);

  const save = () => {
    if (next !== 0) {
      update(incrementHp(modifier));
      modifier = 0; // side effect
      dispatch("saved");
    }
  };
</script>

<div class="grid">
  <h2 class="label box">Hit Points</h2>
  <div
    class="flex-center hp {modifier > 0
      ? 'healing'
      : modifier < 0
      ? 'damage'
      : ''}"
  >
    {modifier}
  </div>
  <div class="col">
    <button
      type="button"
      class="btn heal"
      on:click={increment}
      disabled={next >= $CharacterStore.hitpoints.maximum}>+</button
    >
    <button type="button" class="btn harm" on:click={decrement}>-</button>
  </div>
  <div class="flex-center hp">{next}/{$CharacterStore.hitpoints.maximum}</div>
  <div class="box">
    <button
      type="button"
      class="btn save {modifier > 0 ? 'healing' : modifier < 0 ? 'damage' : ''}"
      on:click={save}
      disabled={modifier === 0}>Save</button
    >
  </div>
</div>

<style>
  .grid {
    grid-template-columns: 2fr 1fr 2fr;
    grid-template-rows: 0.75fr 2fr 0.5fr;
  }
  .col {
    display: grid;
    grid-template-columns: 1fr;
  }
  .box {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  .damage {
    color: red;
  }
  .healing {
    color: green;
  }

  .label {
    margin: 0;
    text-align: center;
  }

  .btn {
    border: none;
    border-radius: 0.25em;
    color: #fff;
    appearance: none;
  }

  .save {
    width: 100%;
    padding: 0.25em;
    margin: 0 1em;
  }

  .save:disabled {
    background-color: #cdcdcd;
  }

  .save.healing,
  .heal {
    background-color: green;
  }

  .save.damage,
  .harm {
    background-color: red;
  }

  .hp {
    font-weight: 700;
    font-size: 2rem;
    letter-spacing: 0.2em;
  }
</style>
