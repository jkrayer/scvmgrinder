<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CharacterStore, { update } from "./store";
  import { useOmen, setOmens } from "./lib";
  import { DICE_MAP } from "../lib/dice";
  import Modal from "../components/Modal.svelte";

  const dispatch = createEventDispatcher();

  const handleUseOmen = () => {
    update(useOmen());
    dispatch("use:omen");
  };

  const handleRollOmens = () => {
    update(setOmens(DICE_MAP[`1d${$CharacterStore.omens.maximum}`]()));
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
    <button type="button" on:click={handleRollOmens}
      >roll 1d{$CharacterStore.omens.maximum}</button
    >
  </div>
  <p class="character-sheet-copy">
    Maximum damage, Reroll, –d6 damage, DR –4, No Crit/Fumble
  </p>
</Modal>
