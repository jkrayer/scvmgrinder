<script type="ts">
  import Label from "./Label.svelte";

  export let label: string;
  export let value: string;
  export let disabled: boolean = false;
  export let ref: any = null;
</script>

<Label {label}>
  <textarea class="input" bind:value bind:this={ref} {disabled} />
</Label>

<style>
  .input {
    width: 100%;
    border-radius: var(--tiny-padding);
    font-size: 0.875rem;
  }
</style>
