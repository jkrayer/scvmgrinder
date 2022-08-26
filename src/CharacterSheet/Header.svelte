<script type="ts">
  import CharacterStore from "./store";
  import HitPoints from "./HitPoints.svelte";
  import Omens from "./Omens.svelte";
  import Modal from "../components/Modal.svelte";

  type ModalKeys = "description" | "classDescription" | "hitpoints" | "omens";

  const modals: { [key in ModalKeys]: boolean } = {
    description: false,
    classDescription: false,
    hitpoints: false,
    omens: false,
  };

  const show = (key: ModalKeys) => () => (modals[key] = true);
  const hide = (key: ModalKeys) => () => (modals[key] = false);
</script>

<header class="character-sheet-header">
  <div class="grid">
    <div>
      <button type="button" class="button" on:click={show("description")}>
        <span class="title">Name</span>
        {$CharacterStore.name}
      </button>
    </div>
    <div>
      <button type="button" class="button" on:click={show("classDescription")}>
        <span class="title">Class</span>
        {$CharacterStore.class.name}
      </button>
    </div>
    <div>
      <button type="button" class="button" on:click={show("hitpoints")}>
        <span class="title">HP</span>
        {$CharacterStore.hitpoints.current}/{$CharacterStore.hitpoints.maximum}
      </button>
    </div>
    <div>
      <button
        type="button"
        class="button"
        on:click={show("omens")}
        disabled={$CharacterStore.omens.current === 0}
      >
        <span class="title">Omens</span>
        {$CharacterStore.omens.current}/{$CharacterStore.omens.maximum}
      </button>
    </div>
  </div>
</header>

<Modal visible={modals.description} onClose={hide("description")}>
  <h2>You Are {$CharacterStore.name}</h2>
  {@html $CharacterStore.description}
</Modal>

<Modal visible={modals.classDescription} onClose={hide("classDescription")}>
  <h2>{$CharacterStore.class.name}</h2>
  {@html $CharacterStore.class.abilities}
</Modal>

<Modal visible={modals.hitpoints} onClose={hide("hitpoints")}>
  <HitPoints on:saved={hide("hitpoints")} />
</Modal>

<Modal visible={modals.omens} onClose={hide("omens")}>
  <Omens on:use:omen={hide("omens")} />
</Modal>

<style>
  .grid {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 600px) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  .title {
    font-weight: 700;
  }
</style>
