<script type="ts">
  import { createEventDispatcher } from "svelte";
  import { ARMOR_TIERS } from "./enums";

  export let armor: Armor = null;
  export let shield: Shield | null = null;

  console.log(armor, shield);

  const dispatch = createEventDispatcher();
</script>

<div>
  <button
    type="button"
    class="button button-header"
    on:click={() => dispatch("defense", armor)}
  >
    <h2 class="character-sheet-field-label">Defense</h2>
  </button>
  <p class="armor">
    ({armor.name}<!--
    -->{#if shield !== null}
      &nbsp;and {shield.name}<!--
    -->{/if})
    <button
      type="button"
      class="button button-header"
      on:click={() =>
        dispatch("resist", { tier: armor.tier.current, shield: !!shield })}
    >
      <span class="character-sheet-field-label inline">
        {ARMOR_TIERS[armor.tier.current]}<!--
      -->{#if shield !== null}
          +1
        {/if}
      </span>
    </button>
  </p>
  {#if armor !== null}
    <div class="tier-bar">
      <button
        class="button-tier"
        class:active={armor.tier.current === 1}
        disabled={1 > armor.tier.maximum || armor.broken}
        on:click={() => dispatch("change:tier", { newTier: 1, armor })}
        type="button">1</button
      >
      <button
        class="button-tier"
        class:active={armor.tier.current === 2}
        disabled={2 > armor.tier.maximum || armor.broken}
        on:click={() => dispatch("change:tier", { newTier: 2, armor })}
        type="button">2</button
      >
      <button
        class="button-tier"
        class:active={armor.tier.current === 3}
        disabled={3 > armor.tier.maximum || armor.broken}
        on:click={() => dispatch("change:tier", { newTier: 3, armor })}
        type="button">3</button
      >
    </div>
  {/if}
</div>

<style>
  .armor {
    display: inline;
    font-family: var(--fixed);
  }
  .inline {
    font-size: 1.75rem;
  }
  .tier-bar {
    display: inline;
    position: relative;
    top: -5px;
    left: 5px;
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
