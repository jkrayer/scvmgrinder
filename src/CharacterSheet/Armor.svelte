<script type="ts">
  import { createEventDispatcher } from "svelte";
  import type { Armor, Shield } from "./type";
  import { ARMOR_TIERS } from "./enums";

  export let armor: Armor | null = null;
  export let shield: Shield | null = null;

  const dispatch = createEventDispatcher();
</script>

<div class="character-sheet-field">
  <h2 class="character-sheet-field-label">Armor:</h2>
  {#if armor !== null}
    <p class="character-sheet-title" aria-labelledby="name-label">
      {armor.name}
      {#if shield !== null}
        + {shield.name}
      {/if}
    </p>
    <button
      type="button"
      on:click={() =>
        dispatch("tier", { tier: armor.tier.current, shield: !!shield })}
      >{ARMOR_TIERS[armor.tier.current]}
      {#if shield !== null}
        + 1
      {/if}
    </button>
  {:else if shield !== null}
    <p class="character-sheet-title" aria-labelledby="name-label">
      {shield.name}
    </p>
  {/if}
</div>
{#if armor !== null}
  <div class="tier-bar">
    <button
      class="button-tier"
      class:active={armor.tier.current === 1}
      disabled={1 > armor.tier.maximum}
      on:click={() => dispatch("change:tier", { newTier: 1, armor })}
      type="button">1</button
    >
    <button
      class="button-tier"
      class:active={armor.tier.current === 2}
      disabled={2 > armor.tier.maximum}
      on:click={() => dispatch("change:tier", { newTier: 2, armor })}
      type="button">2</button
    >
    <button
      class="button-tier"
      class:active={armor.tier.current === 3}
      disabled={3 > armor.tier.maximum}
      on:click={() => dispatch("change:tier", { newTier: 3, armor })}
      type="button">3</button
    >
  </div>
{/if}

<style>
  .tier-bar {
    text-align: right;
  }
  .button-tier {
    width: 30px;
    height: 30px;
    padding: 3px;
    border: 2px solid var(--white);
    border-radius: 50%;
    margin-left: var(--padding-tiny);
    font-size: 0.75em;
    font-weight: 700;
    color: var(--white);
    background-color: transparent;
  }
  .active {
    border-color: magenta;
    color: magenta;
  }
  .button-tier:disabled {
    border-color: #555;
    color: #555;
  }
</style>
