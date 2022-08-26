<script type="ts">
  import { Circle, CrossCircled, Minus, Plus, Trash } from "radix-icons-svelte";
  import {
    isCountable,
    isEquippable,
    isEquipped,
    formatManagertDescription,
  } from "./lib";
  import Silver from "./Silver.svelte";
  import CharacterStore, { update } from "../store";
  // move?
  import {
    equipmentDrop,
    equipmentToggle,
    equipmentQuantity,
    incrementSilver,
  } from "../lib";
  import type { Equipment } from "../type";

  // import { equipmentQuantity, equipmentToggle, equipmentDrop } from "./lib";
  // import { isEncumbered } from "../lib/gameData";

  // TODO: Need state mechanism to handle the effect of being encumbered and max items carried
  // This culd be in the derived equipment store since it will update on a change.
  // Or perhaps deriving status from state is better elsewhere

  let silver: number = 0;

  // HANDLERS
  const toggleEquipment = (eq: Equipment) => () => update(equipmentToggle(eq));

  const dropEquipment = (eq: Equipment) => () => update(equipmentDrop(eq));

  const incrementEq = (x: number, equip: Equipment) => () =>
    update(equipmentQuantity(equip, x));

  const updateSilver = ({ detail }: CustomEvent<number>): void =>
    update(incrementSilver(detail));
</script>

<h2 class="character-sheet-field-label">Manage Equipment</h2>
<table class="equipment-table">
  <colgroup>
    <col span="1" style="width: 80%;" />
    <col span="1" style="width: 10%;" />
    <col span="1" style="width: 5%;" />
    <col span="1" style="width: 5%;" />
  </colgroup>
  <thead class="equipment-table-head">
    <tr>
      <th>Name</th>
      <th title="Increment">Inc.</th>
      <th>Trash</th>
      <th>Equip.</th>
    </tr>
  </thead>
  <tbody class="equipment-table-body">
    {#each $CharacterStore.equipment as eq}
      {@const quantity = eq.quantity}
      <tr>
        <td class="text-overflow">
          {eq.name}
          {#if isCountable(eq)}
            {formatManagertDescription(eq)}
          {/if}
        </td>
        {#if isCountable(eq)}
          <td>
            <button
              type="button"
              class="button"
              on:click={incrementEq(1, eq)}
              disabled={quantity.current === quantity.maximum}
              title="Add"
            >
              <Plus />
            </button>
            <button
              type="button"
              class="button"
              on:click={incrementEq(-1, eq)}
              disabled={quantity.current === 0}
              title="Subtract"
            >
              <Minus />
            </button>
          </td>
        {:else}
          <td />
        {/if}
        <td>
          <button
            type="button"
            class="button"
            on:click={dropEquipment(eq)}
            title="Drop"><Trash size={20} /></button
          >
        </td>
        <td>
          {#if isEquippable(eq)}
            <button
              type="button"
              class="button"
              on:click={toggleEquipment(eq)}
              title={isEquipped(eq) ? "Equipped" : "Carried"}
            >
              {#if isEquipped(eq)}
                <CrossCircled />
              {:else}
                <Circle />
              {/if}
            </button>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
  <tfoot class="equipment-table-foot">
    <tr>
      <td
        ><Silver
          silver={$CharacterStore.silver}
          on:setSilver={updateSilver}
        /></td
      >
      <td colspan="3">Add Button</td>
    </tr>
  </tfoot>
</table>
<p>Ability to manually additmes, this will be a form so lets do this next</p>

<style>
  .equipment-table {
    width: 100%;
    border-collapse: collapse;
    margin: var(--small-padding) 0;
  }

  .equipment-table th,
  .equipment-table td {
    padding: var(--tiny-padding);
  }

  .equipment-table-head > tr > th {
    border-bottom: 1px solid #ccc;
    font-size: 0.75rem;
  }

  .equipment-table-head > tr > th,
  .equipment-table-body > tr > td {
    text-align: center;
  }

  .equipment-table-head > tr > th:first-of-type,
  .equipment-table-body > tr > td:first-of-type {
    text-align: left;
  }

  .equipment-table-body > tr:nth-child(2n) {
    background-color: lightyellow;
  }

  .equipment-table-foot > tr > td {
    padding-top: 0.75rem;
    border-top: 1px solid #ccc;
  }
</style>
