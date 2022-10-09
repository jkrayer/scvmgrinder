<script type="ts">
  import { sum } from "ramda";
  import { Minus, Plus } from "radix-icons-svelte";
  import { addMessage } from "../Messages/state/MessageStore";
  import { diceMessage } from "../Messages/lib";
  import { DICE_MAP } from "../lib/dice";
  import Button from "../components/Button.svelte";
  import InputNumber from "../components/Form/InputNumber.svelte";

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
  <!--  position="center" spacing="xs" -->
  <div>
    <Button
      buttonColor="yellow"
      disabled={!!die && die !== "1d2"}
      on:click={handleClick("1d2")}>1d2</Button
    >
    <Button
      buttonColor="yellow"
      disabled={!!die && die !== "1d4"}
      on:click={handleClick("1d4")}>1d4</Button
    >
    <Button
      buttonColor="yellow"
      disabled={!!die && die !== "1d6"}
      on:click={handleClick("1d6")}>1d6</Button
    >
    <Button
      buttonColor="yellow"
      disabled={!!die && die !== "1d8"}
      on:click={handleClick("1d8")}>1d8</Button
    >
    <Button
      buttonColor="yellow"
      disabled={!!die && die !== "1d10"}
      on:click={handleClick("1d10")}>1d10</Button
    >
    <Button
      buttonColor="yellow"
      disabled={!!die && die !== "1d12"}
      on:click={handleClick("1d12")}>1d12</Button
    >
    <Button
      buttonColor="yellow"
      disabled={!!die && die !== "1d20"}
      on:click={handleClick("1d20")}>1d20</Button
    >
  </div>
  <!-- position="center" spacing="xs" -->
  <div>
    {#if !!die}
      {diceString}
    {/if}
    <!-- variant={symbol === "+" ? "filled" : "outline"} -->
    <Button buttonColor="yellow" on:click={() => (symbol = "+")}
      ><Plus /></Button
    >
    <!-- variant={symbol === "-" ? "filled" : "outline"} -->
    <Button buttonColor="yellow" on:click={() => (symbol = "-")}
      ><Minus /></Button
    >
    <!-- override={{ width: "75px" }} -->
    <InputNumber label="LABEL!" bind:value={modifier} min={0} />
    <Button disabled={die === ""}>Roll!</Button>
  </div>
</form>
