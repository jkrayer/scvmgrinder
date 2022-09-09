<script type="ts">
  export let label: string;
  export let value: string;
  export let disabled: boolean = false;
  export let ref: any = null;
</script>

<label class="input-wrapper">
  <span class="input-label">{label}</span>

  <textarea class="input" bind:value bind:this={ref} {disabled} />
</label>

<style>
  .input-wrapper {
    display: block;
    margin: var(--small-padding) 0;
  }
  .input-label {
    display: block;
    padding-bottom: var(--tiny-padding);
    font-size: 0.75rem;
    font-weight: bold;
    text-indent: var(--tiny-padding);
  }
  .input {
    width: 100%;
    border-radius: var(--tiny-padding);
    font-size: 0.875rem;
  }
</style>
