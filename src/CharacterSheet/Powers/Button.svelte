<script type="ts">
  import { openModal } from "svelte-modals";
  import Use from "./Use.svelte";
  import CharacterStore, { EqScrolls } from "../store";
  import { addMessage } from "../../Messages/state/MessageStore";
  import { usePowerMessage } from "../../Messages/lib";
  import { rollD20 } from "../../lib/dice";
  import { POWERS } from "../../lib/gameConstants";

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
      openModal(Use);
    }
  };
</script>

<button
  type="button"
  disabled={isDisabled}
  class="power-button text-overflow"
  on:click={canIUsePower}
>
  {#if $CharacterStore.powers === null}
    You are not able to use powers.
  {:else}
    Powers({$CharacterStore.powers}): {scrollNames}
  {/if}
</button>

<style>
  /* TODO STyles */
  .power-button {
    width: 100%;
  }
  .power-button:disabled {
    opacity: 0.7;
  }
</style>
