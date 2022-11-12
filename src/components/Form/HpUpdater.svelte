<script type="ts">
  import { createEventDispatcher } from "svelte";
  import Fieldset from "./Fieldset.svelte";
  import InputNumber from "./InputNumber.svelte";
  import { rollD6, rollD10, rollNDice } from "../../lib/dice";

  export let current: number;

  const dispatch = createEventDispatcher();

  let nextScore: number = current;
  let rolledTens: number;
  let rolledSix: number;
  $: isDisabled = rolledTens === undefined || rolledTens < current;

  // HANDLE
  const handleRollTens = () => (rolledTens = rollNDice(6, rollD10)[0]);
  const handleRollSix = () => {
    rolledSix = rollD6();
    nextScore = rolledSix + current;
    dispatch("newScore", nextScore);
  };
</script>

<Fieldset legend="Hit Points">
  <div class="grid ability-row">
    <InputNumber label="Current" readonly={true} value={current} />
    <button type="button" on:click={handleRollTens}>6d10</button>
    <InputNumber label="Roll" bind:value={rolledTens} min={6} max={60} />
    <button type="button" on:click={handleRollSix} disabled={isDisabled}
      >1d6</button
    >
    <InputNumber
      label="Roll"
      bind:value={rolledSix}
      min={1}
      max={6}
      disabled={isDisabled}
    />
    <InputNumber
      label="Next"
      bind:value={nextScore}
      on:input={() => dispatch("newScore", nextScore)}
      min={0}
      max={current + 6}
    />
  </div>
</Fieldset>

<style>
  .ability-row {
    grid-template-columns: 2rem 3rem 3rem 3rem 3rem 3rem;
    align-items: end;
  }
</style>
