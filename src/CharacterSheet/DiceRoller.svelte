<script type="ts">
  import { sum } from "ramda";
  import { Button, Group, NumberInput } from "@svelteuidev/core";
  import { Minus, Plus } from "radix-icons-svelte";
  import { addMessage } from "../Messages/state/MessageStore";
  import { diceMessage } from "../Messages/lib";
  import { DICE_MAP } from "../lib/dice";

  export let name: string = "";

  let modifier: number = 0;
  let die: string = "";
  let dice: number = 1;
  let symbol: "" | "+" | "-" = "";
  $: diceString = die.replace(/^\d*/, String(dice));

  //
  const handleClick = (d: string) => () => {
    if (die === "") {
      die = d;
    } else {
      dice = dice + 1;
    }
  };

  const handleSubmit = () => {
    const mod: number = parseInt(`${symbol}${modifier}`, 10);
    const formula: string =
      diceString + (mod !== 0 ? `${symbol}${modifier}` : "");
    const rolls: number[] = [];

    for (let i = 0; i < dice; i++) {
      rolls.push(DICE_MAP[die]());
    }

    if (mod !== 0) {
      rolls.push(mod);
    }

    addMessage(diceMessage(name, formula, sum(rolls), rolls.join()));

    modifier = 0;
    die = "";
    dice = 1;
    symbol = "";
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <Group position="center" spacing="xs">
    <Button
      type="button"
      disabled={!!die && die !== "1d2"}
      on:click={handleClick("1d2")}>1d2</Button
    >
    <Button
      type="button"
      disabled={!!die && die !== "1d4"}
      on:click={handleClick("1d4")}>1d4</Button
    >
    <Button
      type="button"
      disabled={!!die && die !== "1d6"}
      on:click={handleClick("1d6")}>1d6</Button
    >
    <Button
      type="button"
      disabled={!!die && die !== "1d8"}
      on:click={handleClick("1d8")}>1d8</Button
    >
    <Button
      type="button"
      disabled={!!die && die !== "1d10"}
      on:click={handleClick("1d10")}>1d10</Button
    >
    <Button
      type="button"
      disabled={!!die && die !== "1d12"}
      on:click={handleClick("1d12")}>1d12</Button
    >
    <Button
      type="button"
      disabled={!!die && die !== "1d20"}
      on:click={handleClick("1d20")}>1d20</Button
    >
  </Group>
  <Group position="center" spacing="xs">
    {#if !!die}
      {diceString}
    {/if}
    <Button
      type="button"
      on:click={() => (symbol = "+")}
      variant={symbol === "+" ? "filled" : "outline"}><Plus /></Button
    >
    <Button
      type="button"
      on:click={() => (symbol = "-")}
      variant={symbol === "-" ? "filled" : "outline"}><Minus /></Button
    >
    <NumberInput bind:value={modifier} min={0} override={{ width: "75px" }} />
    <Button disabled={die === ""}>Roll!</Button>
  </Group>
</form>
