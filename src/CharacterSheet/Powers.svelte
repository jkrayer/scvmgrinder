<script type="ts">
  import CharacterStore, { update, EqScrolls } from "./store";
  import { equipmentDrop } from "./lib";
  import type { Scroll } from "./type";
  import { addMessage } from "../Messages/state/MessageStore";
  import { usePowerMessage } from "../Messages/lib";
  import { rollD20 } from "../lib/dice";
  import { POWERS } from "../lib/gameConstants";
  import Modal from "../components/Modal.svelte";

  let isDisabled: boolean = false;
  let scrollNames: string = "";

  $: {
    // isDizzy
    isDisabled =
      $EqScrolls.length === 0 || // no scrolls
      $CharacterStore.powers === 0 || // powers used
      $CharacterStore.powers === null; // no powers

    scrollNames = $EqScrolls.map(({ name }) => name).join(", ");
  }

  let showPowers: boolean = false;

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
      showPowers = true;
    }
  };

  const handleUseScroll = (scroll: Scroll) => () => {
    update(equipmentDrop(scroll));
    showPowers = false;
    // add Effect
    // emit use
  };
</script>

<button
  type="button"
  disabled={isDisabled}
  class="power-button"
  on:click={canIUsePower}
>
  {#if $CharacterStore.powers === null}
    You are not able to use powers.
  {:else}
    Powers({$CharacterStore.powers}): {scrollNames}
  {/if}
</button>

<Modal visible={showPowers} onClose={() => (showPowers = false)}>
  <h2 id="power-class" class="character-sheet-field-label">Powers:</h2>
  {#each $EqScrolls as scroll}
    <p>{scroll.name}</p>
    <p>{scroll.description}</p>
    <button type="button" on:click={handleUseScroll(scroll)}>Use</button>
  {/each}
</Modal>

<style>
  .power-button {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .power-button:disabled {
    opacity: 0.7;
  }
</style>
