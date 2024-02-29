<script type="ts">
  export let label: string;
  export let htmlFor: string = "";
</script>

<label class="input-wrapper" for={htmlFor}>
  <span class="input-label">{label}</span>
  <slot />
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
</style>
