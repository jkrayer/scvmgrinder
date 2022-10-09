<script type="ts">
  import { formatListDescription } from "./lib";

  export let equipment: Equipment[];
  export let isEncumbered: (arg1: number) => boolean = () => false;
</script>

<ol id="equipment-list">
  {#each equipment as eq, index}
    <li
      class="list-item"
      class:broken={eq.broken}
      class:error={isEncumbered(index)}
    >
      <div class:broken={eq.broken}>
        <span class="equipment-title">{eq.name}</span>
        {formatListDescription(eq)}
      </div>
    </li>
  {/each}
</ol>

<style>
  #equipment-list {
    margin: 0;
    padding-left: 28px;
  }

  .list-item {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    font-family: var(--fixed);
    line-height: 1.33333;
  }
  .list-item:last-of-type {
    margin-bottom: 0;
  }

  .equipment-title {
    font-weight: 700;
  }

  .broken {
    text-decoration: line-through;
  }
  .error {
    color: magenta;
  }
</style>
