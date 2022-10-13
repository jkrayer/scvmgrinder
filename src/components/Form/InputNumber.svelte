<script type="ts">
  import { createEventDispatcher } from "svelte";
  import Label from "./Label.svelte";

  export let label: string;
  export let value: number;
  export let min: number = -Infinity;
  export let max: number = Infinity;
  export let step: number = 1;
  export let disabled: boolean = false;
  export let ref: any = null;
  export let readonly: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<Label {label}>
  <input
    type="number"
    class="input"
    bind:value
    {disabled}
    bind:this={ref}
    {min}
    {max}
    {step}
    {readonly}
    tabindex={readonly ? -1 : 0}
    on:input={(e) => dispatch("input", e)}
    on:blur={(e) => dispatch("blur", e)}
  />
</Label>

<style>
  .input {
    margin-bottom: 0;
    width: 100%;
    border-radius: var(--tiny-padding);
    font-size: 0.875rem;
  }
  .input:read-only,
  .input:read-only:focus {
    appearance: textfield;
    outline: 0;
  }
</style>
