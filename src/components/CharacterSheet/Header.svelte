<script>
  export let name;
  export let className;
  export let image = {
    width: 50,
    height: 50,
    src: "",
    alt: "",
  };
</script>

<div id="character-header" class="theme-black">
  <div>
    <figure id="figure"><img alt="" {...image} /></figure>
    <header>
      <h1 class="h1">{name}</h1>
      <h2 class="h2">{className}</h2>
    </header>
  </div>
  <div>
    <slot />
  </div>
</div>

<style>
  #figure {
    margin: 0 1em 0 0;
  }

  #character-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--small-padding);
  }

  #character-header > div:first-of-type {
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
