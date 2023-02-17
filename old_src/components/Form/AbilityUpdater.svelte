<script type="ts">
  import { createEventDispatcher } from "svelte";
  import Fieldset from "./Fieldset.svelte";
  import InputNumber from "./InputNumber.svelte";
  import { getNextScore } from "../../lib/character";
  import { rollD6 } from "../../lib/dice";

  export let name: string;
  export let score: number;

  const dispatch = createEventDispatcher();

  let roll: number;
  let nextScore: number;

  // HANDLE
  const handleInput = () => {
    nextScore = getNextScore(score, roll);
    dispatch("newScore", nextScore);
  };

  const handleRoll = () => {
    roll = rollD6();
    handleInput();
  };
</script>

<Fieldset legend={name}>
  <div class="grid ability-row">
    <InputNumber label="Current" readonly={true} value={score} />
    <button type="button" on:click={handleRoll}>1d6</button>
    <InputNumber
      label="Roll"
      bind:value={roll}
      min={1}
      max={6}
      on:input={handleInput}
    />
    <InputNumber label="Next" readonly={true} bind:value={nextScore} />
  </div>
</Fieldset>

<style>
  .ability-row {
    grid-template-columns: 2rem 3rem 3rem 2rem;
    align-items: end;
  }
</style>
