<script type="ts">
  import CharacterStore, { POWERS as Powers } from "./store";
  import { POWERS } from "../lib/game_constants";
  import { powers } from "../lib/character/powers";

  // Handlers
  const handleClick = () => powers($CharacterStore);
</script>

<div class="powers-wrapper flex-center-row">
  <button
    type="button"
    class="button button-header"
    on:click={handleClick}
    disabled={$Powers.message !== null}
  >
    <h2 class="powers-title character-sheet-field-label">
      Powers
      {#if $Powers.powers !== null}
        <span class="powers-count">&nbsp;&nbsp;({$Powers.powers})</span>
      {/if}
    </h2>
  </button>
  <p class="note">
    {#if $Powers.message !== null}
      {$Powers.message}
    {:else}
      {POWERS.text}
    {/if}
  </p>
</div>

<style>
  .powers-wrapper {
    margin: var(--small-padding) 0;
    justify-content: space-between;
  }
  .powers-title {
    display: flex;
    align-items: baseline;
  }
  .powers-count {
    font-size: 0.625em;
    position: relative;
    left: -7px;
  }
  .note {
    margin: 0;
    font: 0.75rem/1.33333 var(--fixed);
    text-align: right;
  }
</style>
