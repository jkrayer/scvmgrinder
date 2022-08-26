<script type="ts">
  import { closeModal } from "svelte-modals";
  import { equipmentDrop } from "../lib";
  import { update, EqScrolls } from "../store";
  import type { Scroll } from "../type";
  import Modal from "../../components/Modal.svelte";

  const handleUseScroll = (scroll: Scroll) => () => {
    update(equipmentDrop(scroll));
    closeModal();
    // add Effect
    // emit use
  };
</script>

<Modal>
  <h2 id="power-class" class="character-sheet-field-label">Powers:</h2>
  {#each $EqScrolls as scroll}
    <p>{scroll.name}</p>
    <p>{scroll.description}</p>
    <button type="button" on:click={handleUseScroll(scroll)}>Use</button>
  {/each}
</Modal>
