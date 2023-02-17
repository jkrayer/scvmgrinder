<script lang="ts">
  export let title: string = "";
  export let tagColor: "magenta" | "yellow" = "yellow";
  export let shape: "circle" | "pill" = "circle";

  const classes: string = `tag tag-${tagColor} tag-${shape}`;
</script>

<span {title} class={classes}>
  <span>
    <slot />
  </span>
</span>

<style>
  .tag {
    height: 1.625em;
  }

  .tag-magenta {
    color: #fff;
    background-color: magenta;
  }

  .tag-yellow {
    color: #000;
    background-color: yellow;
  }

  .tag-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.625em;
    border-radius: 50%;
  }

  .tag-pill {
    border-radius: var(--tiny-padding);
    padding-right: 0.8125em;
    padding-left: 0.8125em;
  }
</style>
