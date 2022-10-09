<script type="ts">
  export let legend: string = "";
</script>

<fieldset>
  {#if !!legend}
    <legend>{legend}</legend>
  {/if}
  <slot />
</fieldset>
