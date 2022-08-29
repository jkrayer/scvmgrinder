<script type="ts">
  import type { SimpleValues, ValueObject } from "./types";

  export let group: any;
  export let values: SimpleValues | ValueObject[];
  export let title: string = "";
  export let showLegend: boolean = false;

  const handleSpacebar = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      // @ts-ignore
      e.target.querySelector("input").dispatchEvent(new MouseEvent("click"));
    }
  };
</script>

<fieldset class="radio-group">
  {#if title}
    <legend class:show={showLegend}>{title}</legend>
  {/if}
  {#each values as v}
    {#if typeof v === "string"}
      <label class="radio-input-label" tabindex="0">
        <input
          type="radio"
          class="radio-input"
          bind:group
          value={v}
          tabindex="-1"
        />
        <div class="radio-input-button">{v}</div>
      </label>
    {:else}
      {@const { value, label, disabled = false } = v}
      <label class="radio-input-label" tabindex="0" on:keyup={handleSpacebar}>
        <input
          type="radio"
          class="radio-input"
          bind:group
          {value}
          {disabled}
          tabindex="-1"
        />
        <div class="radio-input-button">{label}</div>
      </label>
    {/if}
  {/each}
</fieldset>

<style>
  .radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 2px 2px;
    padding: 0;
    border: 0;
    margin: var(--small-padding) 0;
  }
  .radio-group > legend {
    position: absolute;
    left: -10000in;
  }
  .radio-group > legend.show {
    position: static;
    padding-bottom: var(--tiny-padding);
    font-size: 0.75rem;
    font-weight: bold;
    text-indent: var(--tiny-padding);
  }

  .radio-input-label {
    flex-basis: 1 1;
    position: relative;
  }
  .radio-input {
    position: absolute;
    z-index: 0;
  }
  .radio-input-button {
    position: relative;
    z-index: 1;
    padding: 0.375rem var(--small-padding);
    color: #fff;
    background-color: magenta;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  .radio-input:disabled + .radio-input-button {
    background-color: #cdcdcd;
    cursor: default;
  }
  .radio-input:checked + .radio-input-button,
  .radio-input-button:hover {
    background-color: darkmagenta;
  }
  .radio-input-label:first-of-type > .radio-input-button {
    border-radius: var(--tiny-padding) 0 0 var(--tiny-padding);
  }
  .radio-input-label:last-of-type > .radio-input-button {
    border-radius: 0 var(--tiny-padding) var(--tiny-padding) 0;
  }
</style>
