<script type="ts">
  export let name: string;
  export let className: string = null;
</script>

<div class="sheet-header theme-black">
  <div>
    <slot name="portrait" />
    <header>
      <h1 class="h1">{name}</h1>
      {#if className !== null}
        <h2 class="h2">{className}</h2>
      {/if}
    </header>
  </div>
  <div>
    <slot />
  </div>
</div>

<style>
  .sheet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--small-padding);
  }

  .sheet-header > div:first-of-type {
    display: flex;
    align-items: center;
  }

  .h1 {
    margin: 0 0 0.15em;
    font-size: 1.5rem;
    line-height: 1;
    white-space: nowrap;
  }
  .h2 {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1;
  }
</style>
