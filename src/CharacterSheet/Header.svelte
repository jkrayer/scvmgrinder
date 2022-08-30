<script type="ts">
  import { openModal } from "svelte-modals";
  import CharacterStore from "./store";
  import HitPoints from "./HitPoints.svelte";
  import Omens from "./Omens.svelte";
  import Description from "./Description.svelte";

  type ModalKeys = "description" | "classDescription" | "hitpoints" | "omens";

  const modals: { [key in ModalKeys]: () => void } = {
    description: () =>
      openModal(Description, {
        title: `You Are ${$CharacterStore.name}`,
        body: $CharacterStore.description,
      }),
    classDescription: () =>
      openModal(Description, {
        title: $CharacterStore.class.name,
        body: $CharacterStore.class.abilities,
      }),
    hitpoints: () => openModal(HitPoints),
    omens: () => openModal(Omens),
  };

  const show = (key: ModalKeys) => () => modals[key]();
</script>

<header class="character-sheet-header">
  <div class="grid grid-limit">
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
