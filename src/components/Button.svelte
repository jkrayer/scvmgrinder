<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let title: string = "";
  export let disabled: boolean = false;
  export let buttonColor: "clear" | "magenta" | "yellow" = "clear";
  export let stretch: boolean = false;

  const iconClass: string =
    !!$$slots.iconRight || !!$$slots.iconLeft ? "icon" : "";

  const classes: string = `button ${buttonColor} ${iconClass}`;
</script>

<!-- TODO:
     Tags: A or BUTTON
     Better (less manual) event binding
     deal with $$props so we're not expoing non-html props
 -->
<button
  {type}
  {disabled}
  {title}
  aria-disabled={disabled}
  on:click
  class={classes}
  class:stretch
  {...$$props}
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
    /* overflow: hidden; */
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

  .magenta:disabled,
  .magenta:disabled:hover {
    /* background-color: rgb(255, 0, 200); */
    background-color: magenta;
  }

  .yellow,
  .yellow:hover {
    color: #000;
    background-color: yellow;
  }

  .yellow:hover {
    background-color: gold;
  }

  .yellow:disabled,
  .yellow:disabled:hover {
    background-color: yellow;
    color: black;
  }

  .stretch {
    width: 100%;
  }
</style>
