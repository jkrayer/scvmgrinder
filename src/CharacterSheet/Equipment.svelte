<script type="ts">
  import { compose } from "ramda";
  import { Minus, Pencil1, Plus, Trash } from "radix-icons-svelte";
  import CharacterStore, {
    update,
    EquippedWeapons,
    EquippedArmor,
  } from "./store";
  import type { Equipment } from "./type";
  import { equipmentQuantity, equipmentToggle, equipmentDrop } from "./lib";
  import { isEncumbered } from "../lib/gameData";

  // TODO: Need state mechanism to handle the effect of being encumbered and max items carried
  // This culd be in the derived equipment store since it will update on a change.
  // Or perhaps deriving status from state is better elsewhere

  // const equippable = has("equipped");

  // HANDLERS
  // const toggleEquipment = (eq: Equipment) => () => update(equipmentToggle(eq));

  // const dropEquipment = (eq: Equipment) => () => update(equipmentDrop(eq));

  // const incrementEq = (x: number, equip: Equipment) => () =>
  //   update(equipmentQuantity(equip, x));

  const parens = (desc: string): string =>
    ["(", undefined].includes(desc[0]) ? desc : `(${desc})`;

  const insertQuantity = ({
    description,
    quantity = { current: -1, maximum: -1 },
  }: Equipment): string =>
    quantity.current === -1
      ? description
      : description.replace("%", String(quantity.current));

  const formatDescription = compose(parens, insertQuantity);

  let encumbrance: number = 8;
  let encumbranceIndex: number = 7;
  let isEncumbered: boolean = false;

  $: {
    encumbrance = 8 + $CharacterStore.abilities.strength;
    encumbranceIndex = encumbrance - 1;
    isEncumbered = $CharacterStore.equipment.length > encumbrance;
  }
</script>

<div class="grid">
  <div class="title-row">
    <h2 class="character-sheet-field-label accented">Equipment</h2>
    <div class="edit"><Pencil1 size={16} /></div>
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
          {formatDescription(eq)}
          <!-- {#if eq.quantity}
            {#if eq.ammunitionName}
              and {eq.quantity.current}
              {eq.ammunitionName}
            {:else}
              {eq.quantity.current}/{eq.quantity.maximum}
            {/if}
          {/if} -->
          <!-- {#if eq.broken}
            (broken)
          {/if} -->
        </div>
        <!-- <div class="button-row">
            <div class="count-col">
              {#if eq.quantity}
                {@const quantity = eq.quantity}
                <button
                  type="button"
                  on:click={incrementEq(-1, eq)}
                  disabled={quantity.current === 0}>-</button

              <button
                  type="button"
                  on:click={incrementEq(1, eq)}
                  disabled={quantity.current === quantity.maximum}>+</button
                >
              {/if}
            </div>
            <div class="equip-col">
              {#if equippable(eq)}
                <button type="button" on:click={toggleEquipment(eq)}
                  >{eq.equipped ? "U " : "E"}</button
                >
              {/if}
            </div>
            <div class="trash-col">
              <button type="button" on:click={dropEquipment(eq)}>T</button>
            </div>
          </div> -->
      </li>
    {/each}
  </ol>
  <div class="silver">
    <span class="equipment-title">Silver</span>
    {$CharacterStore.silver}
  </div>
</div>

<style>
  .title-row {
    display: flex;
    align-items: center;
    margin-bottom: var(--small-padding);
  }

  .note {
    margin: 0;
    font: 0.75rem/1 var(--fixed);
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
