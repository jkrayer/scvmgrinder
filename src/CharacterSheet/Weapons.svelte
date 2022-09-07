<script type="ts">
  import { createEventDispatcher } from "svelte";
  import type { Weapon } from "./type";

  export let weapons: Weapon[] = [];

  const dispatch = createEventDispatcher();
</script>

{#each weapons as weapon}
  <div class="grid weapon" class:broken={weapon.broken}>
    <div>
      <h2 class="character-sheet-field-label accented">
        {weapon.name[0]}<span class="drop-line">{weapon.name.substring(1)}</span
        >
      </h2>
    </div>
    <span class="weapon-type">
      ({weapon.subType})
    </span>
    <button
      title={weapon.damageDie}
      type="button"
      disabled={weapon.broken}
      on:click={() => dispatch("damage", weapon)}
    >
      Damage!
    </button>
    <button
      title="d20+/-n"
      type="button"
      disabled={weapon.broken}
      on:click={() => dispatch("attack", weapon)}
    >
      Attack!
    </button>
  </div>
{/each}

<style>
  .weapon {
    position: relative;
    grid-template-columns: 2fr 1fr 1fr;
    margin: var(--tiny-padding) 0;
  }
  .broken {
    opacity: 0.7;
  }
  .character-sheet-field-label {
    font-size: 2.25rem;
  }
  .drop-line {
    position: relative;
    top: -10px;
    left: 2px;
    font-size: 0.625em;
  }
  .weapon-type {
    position: absolute;
    top: 25px;
    left: 25px;
    font-family: var(--fixed);
    font-size: 0.75rem;
    font-weight: 500;
    color: magenta;
    letter-spacing: 0.05em;
  }
  /* .weapon-attack-button {
    padding: 0;
    margin: 0;
  } */
</style>
