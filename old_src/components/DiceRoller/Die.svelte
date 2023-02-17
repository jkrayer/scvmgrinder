<script type="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../Button.svelte";
  import Tag from "../Tag.svelte";

  const dispatch = createEventDispatcher();

  export let die: string;
  export let disabled: boolean = false;
  export let number: number = 0;

  const title = `${number > 0 ? number : ""}${die}`;
</script>

<span class="die-button">
  <Button
    stretch
    {disabled}
    on:click={() => dispatch("click", { die })}
    {title}
  >
    {#if number > 0}
      <span class="tag-wrapper">
        <Tag tagColor="magenta">{number}</Tag>
      </span>
    {/if}
    {die}
  </Button>
</span>

<style>
  .die-button {
    position: relative;
  }

  .die-button .tag-wrapper {
    position: absolute;
    top: -0.5em;
    right: -1em;
  }
</style>
