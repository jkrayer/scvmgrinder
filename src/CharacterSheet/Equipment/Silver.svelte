<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { Check, CircleBackslash } from "radix-icons-svelte";
  import Button from "../../components/Button.svelte";

  export let silver: number = 0;

  let x: number = 0;
  let focused: boolean = false;
  $: total = silver + x;

  const dispatch = createEventDispatcher();

  // HANDLERS
  const handleSubmit = () => {
    dispatch("setSilver", x);
    x = 0;
    focused = false;
  };

  const handleCancel = () => {
    x = 0;
    focused = false;
  };
</script>

<form on:submit|preventDefault={handleSubmit} on:reset={handleCancel}>
  <label on:click={() => (focused = true)}>
    Silver <b>{silver}</b>
    <input
      type="number"
      bind:value={x}
      size="1"
      class="control"
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)}
    />
    {#if focused}
      <span transition:fade>
        = {total}
        <Button type="submit" clear><Check /></Button>
        <Button type="reset" clear><CircleBackslash /></Button>
      </span>
    {/if}
  </label>
</form>

<style>
  .control {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0;
    text-align: center;
    /* appearance: textfield; */
    opacity: 0.5;
  }
  .control:focus {
    opacity: 1;
    outline: transparent;
  }
</style>
