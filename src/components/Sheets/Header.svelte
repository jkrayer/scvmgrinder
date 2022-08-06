<script type="ts">
  export let name: string;
  export let className: string = null;
</script>

<div class="sheet-header">
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
    width: 100%;
    padding: var(--small-padding);
    color: #fff;
    background-color: #222;
  }

  .sheet-header > div:first-of-type {
    display: flex;
    align-items: center;
  }

  .h1 {
    margin: 0 0 0.15em;
    font-size: 2rem;
    line-height: 1;
    white-space: nowrap;
    font-family: var(--serif);
  }
  .h2 {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1;
  }
</style>
