<script lang="ts">
  export let name: string;
  export let klass: string;
</script>

<li class="li">
  <article class="grid list-article">
    <header>
      <h1 class="character-sheet-field-label">{name}</h1>
      <h2 class="h2">{klass}</h2>
    </header>
    <div class="flex-center-right">
      <slot />
    </div>
  </article>
</li>

<style>
  .li {
    min-width: 300px;
    max-width: 33%;
  }
  .list-article {
    grid-template-columns: 1fr 1fr;
  }
  .h2 {
    margin: var(--tiny-padding) 0;
    font-family: var(--fixed);
    font-size: 1rem;
    font-weight: 400;
  }
</style>
