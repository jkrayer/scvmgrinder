<script type="ts">
  import { openModal } from "svelte-modals";
  import { Pencil1 } from "radix-icons-svelte";
  import { formatListDescription } from "./lib";
  import Manager from "./EquipmentManager.svelte";
  import CharacterStore from "../store";

  let encumbrance: number = 8;
  let encumbranceIndex: number = 7;
  let isEncumbered: boolean = false;

  $: {
    encumbrance = 8 + $CharacterStore.abilities.strength;
    encumbranceIndex = encumbrance - 1;
    isEncumbered = $CharacterStore.equipment.length > encumbrance;
  }

  let show = () => openModal(Manager);
</script>

<div class="grid grid-limit">
  <div class="flex-center-row">
    <button type="button" class="button flex-center-row" on:click={show}>
      <h2 class="character-sheet-field-label accented">Equipment</h2>
      <span class="edit"><Pencil1 size={16} /></span>
    </button>

    <p class="note" class:error={isEncumbered}>
      Strength + 8 items or DR+2 on Agility/Strength tests
    </p>
  </div>
  <ol id="equipment-list">
    {#each $CharacterStore.equipment as eq, index}
      <li
        class="list-item"
        class:broken={eq.broken}
        class:error={index > encumbranceIndex}
      >
        <div class:broken={eq.broken}>
          <span class="equipment-title">{eq.name}</span>
          {formatListDescription(eq)}
        </div>
      </li>
    {/each}
  </ol>
  <div class="silver">
    <span class="equipment-title">Silver</span>
    {$CharacterStore.silver}
  </div>
</div>

<style>
  .note {
    margin: 0;
    font: 0.75rem/1.33333 var(--fixed);
    text-align: right;
  }

  .edit {
    margin-left: var(--small-padding);
  }

  #equipment-list {
    margin: 0;
    padding-left: 28px;
  }

  .list-item,
  .silver {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    font-family: var(--fixed);
    line-height: 1.33333;
  }
  .list-item:last-of-type {
    margin-bottom: 0;
  }
  .silver {
    margin-top: var(--tiny-padding);
    padding-left: 28px;
  }

  .equipment-title {
    font-weight: 700;
  }

  .broken {
    text-decoration: line-through;
  }
  .error {
    color: magenta;
  }
</style>
