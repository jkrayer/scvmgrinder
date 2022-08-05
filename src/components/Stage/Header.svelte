<script lang="ts">
  import { pathOr } from "ramda";
  import Game from "../../stores/Campaign";
  import Modal from "../Modal.svelte";
  import EncounterPanel from "../AdventurePanel/Encounter.svelte";
  import type { Handout, Encounter } from "../../global";

  const getHandouts = pathOr([], ["adventure", "handouts"]);
  const getEncounters = pathOr([], ["adventure", "encounters"]);

  let isMenuOpen: boolean = false;
  let handOut: Handout | null = null;
  let encounter: Encounter | null = null;

  const toggleMenu = () => (isMenuOpen = !isMenuOpen);
  const openHandout = (h: Handout) => {
    handOut = h;
    isMenuOpen = false;
  };
  const openEncounter = (e: Encounter) => {
    encounter = e;
    isMenuOpen = false;
  };
</script>

<header id="global-header" class="theme-magenta row row-polar">
  <h1>SCVUMGRINDER</h1>
  <!--
  <button
    type="button"
    id="menu-toggle-button"
    on:click={toggleMenu}
    class:active={isMenuOpen}>{isMenuOpen ? "Close" : "Open"}</button
  >
  {#if isMenuOpen}
    <div id="menu-wrapper">
      <ul class="menu-list">
        <li class="menu-title">
          Hand Outs
          <ul class="menu-list">
            {#each getHandouts($Game) as handout}
              <li class="menu-item">
                <button
                  type="button"
                  class="menu-item_button"
                  on:click={() => openHandout(handout)}
                >
                  {handout.name}
                </button>
              </li>
            {/each}
          </ul>
        </li>
        <li class="menu-title">
          Encounters
          <ul class="menu-list">
            {#each getEncounters($Game) as encounter}
              <li class="menu-item">
                <button
                  type="button"
                  class="menu-item_button"
                  on:click={() => openEncounter(encounter)}
                >
                  {encounter.name}
                </button>
              </li>
            {/each}
          </ul>
        </li>
      </ul>
    </div>
  {/if}

  <Modal visible={handOut !== null} onClose={() => (handOut = null)}>
    <h3>{handOut.name}</h3>
    <img src={handOut.src} alt="" />
  </Modal>
  <Modal visible={encounter !== null} onClose={() => (encounter = null)}>
    <EncounterPanel {encounter} />
  </Modal>
  -->
</header>

<style>
  #menu-toggle-button {
    position: absolute;
    top: 0;
    right: var(--small-padding);
    padding: var(--small-padding);
    border: 0;
    margin: 0;
    color: #fff;
    font-size: 0.8125rem;
    text-transform: uppercase;
    font-weight: 700;
    background-color: magenta;
    cursor: pointer;
  }
  #menu-wrapper,
  #menu-toggle-button.active,
  #menu-toggle-button:hover,
  #menu-toggle-button:active {
    background-color: #8b008b;
  }

  #menu-wrapper {
    position: absolute;
    top: 2rem;
    right: var(--small-padding);
    z-index: 2;
    width: 25ex;
    color: #fff;
    text-align: left;
  }
  .menu-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  /* .menu-list > li > .menu-list {
    padding-left: var(--tiny-padding);
  } */
  .menu-title {
    padding: var(--tiny-padding) var(--tiny-padding) var(--tiny-padding)
      var(--small-padding);
    font-size: 0.8125rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  /* .menu-item {
    padding: var(--tiny-padding);
  } */
  .menu-item_button {
    width: 100%;
    padding: var(--tiny-padding);
    border: none;
    margin: 0;
    color: #fff;
    text-align: left;
    background-color: transparent;
    cursor: pointer;
  }
  .menu-item_button:hover,
  .menu-item_button:active {
    background-color: magenta;
  }
</style>
