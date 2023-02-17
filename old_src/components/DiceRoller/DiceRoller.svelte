<script type="ts">
  import { createEventDispatcher } from "svelte";
  import { sum } from "ramda";
  import { Cross1, Update } from "radix-icons-svelte";
  import Die from "./Die.svelte";
  import ModEntry from "./ModEntry.svelte";
  import Button from "../Button.svelte";
  import { rollString } from "../../lib";

  export let disabled: boolean = false;
  export let layout: "vertical" = "vertical";

  const dispatch = createEventDispatcher();

  const dice: string[] = ["d2", "d4", "d6", "d8", "d10", "d12", "d20"];
  let hasDice: boolean = false;
  let modifier: number;
  const selectedDice: { [key: string]: number } = {
    d2: 0,
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
  };

  // handlers
  const increment = ({ detail: { die } }: CustomEvent<{ die: string }>) => {
    selectedDice[die] = selectedDice[die] + 1;
    hasDice = true;
  };

  const onReset = () => {
    Object.keys(selectedDice).forEach((key) => {
      selectedDice[key] = 0;
    });
    hasDice = false;
    modifier = undefined;
  };

  const onSubmit = () => {
    const dice: string[] = Object.entries(selectedDice)
      .filter(([, number]) => number > 0)
      .map(([die, number]) => `${number}${die}`);

    if (dice.length === 0) {
      return;
    }

    const rolls: number[] = dice.map(rollString);
    let formula: string = dice.join("+");

    if (modifier !== undefined && modifier !== 0) {
      rolls.push(modifier);
      formula += modifier < 0 ? modifier : `+${modifier}`;
    }

    dispatch("roll", {
      dice,
      rolls,
      sum: sum(rolls),
      formula,
    });
    onReset();
  };
</script>

<form on:submit|preventDefault={onSubmit} on:reset={onReset} class={layout}>
  {#each dice as die}
    <Die {die} number={selectedDice[die]} on:click={increment} {disabled} />
  {/each}
  <ModEntry bind:mod={modifier} {disabled} />
  <Button type="submit" disabled={disabled || !hasDice} title="ROll!"
    ><Update /></Button
  >
  <Button type="reset" disabled={disabled || !hasDice} title="Cancel"
    ><Cross1 /></Button
  >
</form>

<style>
  .vertical {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
  }
</style>
