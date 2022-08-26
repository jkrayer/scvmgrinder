<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CharacterStore, { update } from "./store";
  import { useOmen } from "./lib";
  import Modal from "../components/Modal.svelte";

  const dispatch = createEventDispatcher();

  const handleUseOmen = () => {
    update(useOmen());
    dispatch("use:omen");
  };
</script>

<Modal>
  <div class="character-sheet-field">
    <h2 class="character-sheet-field-label">Omens:</h2>
    <div>(d{$CharacterStore.omens.maximum}/day)</div>
    <button
      type="button"
      on:click={handleUseOmen}
      disabled={$CharacterStore.omens.current === 0}
      >use ({$CharacterStore.omens.current})</button
    >
  </div>
  <p class="character-sheet-copy">
    Maximum damage, Reroll, –d6 damage, DR –4, No Crit/Fumble
  </p>
</Modal>

<style>
  .disabled {
    opacity: 0.8;
  }
</style>
