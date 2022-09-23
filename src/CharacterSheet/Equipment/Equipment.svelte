<script type="ts">
  import { openModal } from "svelte-modals";
  import { Pencil1 } from "radix-icons-svelte";
  import Manager from "./EquipmentManager.svelte";
  import CharacterStore from "../store";
  import EquipmentList from "../../Equipment/EquipmentList.svelte";
  import Button from "../../components/Button.svelte";

  let encumbrance: number = 8;
  let encumbranceIndex: number = 7;
  let isEncumbered: boolean = false;

  $: {
    encumbrance = 8 + $CharacterStore.abilities.strength;
    encumbranceIndex = encumbrance - 1;
    isEncumbered = $CharacterStore.equipment.length > encumbrance;
  }

  const show = () => openModal(Manager);

  const setEncumbered = (index: number) => index > encumbranceIndex;
</script>

<div class="grid grid-limit">
  <div class="flex-center-row">
    <Button clear on:click={show}>
      <h2 class="character-sheet-field-label">Equipment</h2>
      <Pencil1 size={16} slot="iconRight" />
    </Button>

    <p class="note" class:error={isEncumbered}>
      Strength + 8 items or DR+2 on Agility/Strength tests
    </p>
  </div>
  <EquipmentList
    equipment={$CharacterStore.equipment}
    isEncumbered={setEncumbered}
  />
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

  .silver {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    font-family: var(--fixed);
    line-height: 1.33333;
  }
  .silver {
    margin-top: var(--tiny-padding);
    padding-left: 28px;
  }

  .equipment-title {
    font-weight: 700;
  }

  .error {
    color: magenta;
  }
</style>
