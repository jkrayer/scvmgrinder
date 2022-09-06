<script type="ts">
  import { openModal } from "svelte-modals";
  // import Use from "./Use.svelte";
  import CharacterStore, { POWERS as Powers } from "./store";
  import { addMessage } from "../Messages/state/MessageStore";
  import { usePowerMessage } from "../Messages/lib";
  import { rollD20 } from "../lib/dice";
  import { POWERS } from "../lib/game_constants";

  /**
   * The Flow
   * Press Button
   * Roll Random Die
   * Pass || Fail Send Message to Message System
   * + Fail Roll Damage Apply and Send to Message System
   *        Send assStatus to status system
   */

  /**
   * (dieRoll+getPresence(character < cd ? SendFailMessage : SendSuccessMessage))({dieRoll:, dc, character})
   *
   */

  // Handlers
  const canIUsePower = () => {
    const roll: number = rollD20();
    const total: number = roll + $CharacterStore.abilities.presence;

    addMessage(
      usePowerMessage(
        $CharacterStore.name,
        $CharacterStore.abilities.presence,
        roll,
        POWERS.dc
      )
    );

    if (total < POWERS.dc) {
      // dizzyEffect
    } else {
      // openModal(Use);
    }
  };
</script>

<div class="powers-wrapper flex-center-row">
  <button
    type="button"
    class="button button-header"
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
