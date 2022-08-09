<script type="ts">
  import { createEventDispatcher } from "svelte";
  import type { Weapon } from "./type";

  export let weapons: Weapon[] = [];

  const dispatch = createEventDispatcher();
</script>

{#each weapons as weapon}
  <div class="character-sheet-field" class:broken={weapon.broken}>
    <h2 class="character-sheet-field-label">Weapon:</h2>
    <p class="character-sheet-title" aria-labelledby="name-label">
      {weapon.name}({weapon.subType})
    </p>
    <button
      title={weapon.damageDie}
      type="button"
      class="weapon-attack-button"
      disabled={weapon.broken}
      on:click={() => dispatch("damage", weapon)}
    >
      Damage!
    </button>
    <button
      title="d20+/-n"
      type="button"
      class="weapon-attack-button"
      disabled={weapon.broken}
      on:click={() => dispatch("attack", weapon)}
    >
      Attack!
    </button>
  </div>
{/each}

<style>
  .broken {
    opacity: 0.7;
  }

  .weapon-attack-button {
    padding: 0;
    margin: 0;
  }
</style>
