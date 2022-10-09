<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let title: string = "";
  export let disabled: boolean = false;
  export let buttonColor: "clear" | "magenta" | "yellow" = "clear";

  const iconClass: string =
    !!$$slots.iconRight || !!$$slots.iconLeft ? "icon" : "";

  const classes: string = `button ${buttonColor} ${iconClass}`;
</script>

<!-- TODO:
     Tags: A or BUTTON
     Better (less manual) event binding
 -->
<button
  {type}
  {disabled}
  {title}
  aria-disabled={disabled}
  on:click
  class={classes}
>
  {#if $$slots.iconLeft}
    <span class="icon-left">
      <slot name="iconLeft" />
    </span>
  {/if}
  <span class="copy">
    <slot />
  </span>
  {#if $$slots.iconRight}
    <span class="icon-right">
      <slot name="iconRight" />
    </span>
  {/if}
</button>

<style>
  .button {
    padding: var(--tiny-padding) 0.125rem;
    border: none;
    margin: 0;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
    appearance: none;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: initial;
    color: inherit;
    background-color: transparent;
  }

  .icon {
    display: flex;
  }

  .icon > .copy {
    font-size: 0.875rem;
  }

  .icon-right {
    margin-left: var(--small-padding);
  }
  .icon-left {
    margin-right: var(--small-padding);
  }

  .clear {
    background-color: transparent;
  }

  .magenta,
  .yellow {
    padding: var(--small-padding);
    border: none;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.875rem;
    line-height: 1;
  }

  .magenta,
  .magenta:hover {
    color: #fff;
    background-color: magenta;
  }

  .magenta:hover {
    background-color: darkmagenta;
  }

  .yellow,
  .yellow:hover {
    color: #000;
    background-color: yellow;
  }

  .yellow:hover {
    background-color: gold;
  }
</style>
