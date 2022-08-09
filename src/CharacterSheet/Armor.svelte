<script type="ts">
  import type { Armor, Shield } from "./type";

  export let armor: Armor | null = null;
  export let shield: Shield | null = null;
</script>

<div class="character-sheet-field">
  <h2 class="character-sheet-field-label">Armor:</h2>
  {#if armor !== null}
    <p class="character-sheet-title" aria-labelledby="name-label">
      {armor.name}
    </p>
    <button type="button" disabled={armor.tier.current !== 1}>1</button>
    <button type="button" disabled={armor.tier.current !== 2}>2</button>
    <button type="button" disabled={armor.tier.current !== 3}>3</button>
  {/if}
  {#if shield !== null}
    <h2 class="character-sheet-field-label">Shield:</h2>
    <p class="character-sheet-title" aria-labelledby="name-label">-1 Damage</p>
  {/if}
</div>
