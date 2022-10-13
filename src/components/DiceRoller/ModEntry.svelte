<script type="ts">
  import Button from "../Button.svelte";
  import InputNumber from "../Form/InputNumber.svelte";

  export let mod: number;
  export let disabled: boolean = false;

  $: show = mod === undefined ? false : true;
</script>

<Button type="button" on:click={() => (show = !show)} {disabled}>&#177;</Button>
<div class="mod-entry">
  <div class={show ? "input-wrapper show" : "input-wrapper hide"}>
    <InputNumber label="" bind:value={mod} min={-10} max={10} {disabled} />
  </div>
</div>

<style>
  .mod-entry {
    position: relative;
  }

  .input-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    width: 6ex;
    transform: translate3d(60px, -38px, 0);
  }

  .hide {
    display: none;
  }
</style>
