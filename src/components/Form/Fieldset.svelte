<script type="ts">
  export let legend: string = "";
</script>

<fieldset class="fieldset">
  {#if !!legend}
    <legend>{legend}</legend>
  {/if}
  <slot />
</fieldset>

<style>
  .fieldset {
    padding: 0;
    border: none;
    margin: 0;
  }
</style>
