<script type="ts">
  import { has, ifElse } from "ramda";
  import CharacterStore, {
    update,
    EquippedWeapons,
    EquippedArmor,
  } from "./store";
  import type { Equipment } from "./type";
  import { equipmentQuantity, equipmentToggle, equipmentDrop } from "./lib";

  // TODO: Need state mechanism to handle the effect of being encumbered and max items carried
  // This culd be in the derived equipment store since it will update on a change.
  // Or perhaps deriving status from state is better elsewhere

  const equippable = has("equipped");

  // HANDLERS
  const toggleEquipment = (eq: Equipment) => () => update(equipmentToggle(eq));

  const dropEquipment = (eq: Equipment) => () => update(equipmentDrop(eq));

  const incrementEq = (x: number, equip: Equipment) => () =>
    update(equipmentQuantity(equip, x));
</script>

<div class="grid">
  <div class="character-sheet-field character-sheet-ko">
    <div class="title-row">
      <h2 class="character-sheet-field-label character-sheet-ko">Equipment</h2>
      <p class="character-sheet-copy">
        Strength + 8 items or DR+2 on Agility/Strength tests
      </p>
    </div>
    <ul id="equipment-list">
      {#each $CharacterStore.equipment as eq, index}
        <li class="character-sheet-field">
          <div class:broken={eq.broken}>
            {eq.name}
            {#if eq.quantity}
              {#if eq.ammunitionName}
                and {eq.quantity.current}
                {eq.ammunitionName}
              {:else}
                {eq.quantity.current}/{eq.quantity.maximum}
              {/if}
            {/if}
            {#if eq.broken}
              (broken)
            {/if}
          </div>
          <div class="button-row">
            <div class="count-col">
              {#if eq.quantity}
                {@const quantity = eq.quantity}
                <button
                  type="button"
                  on:click={incrementEq(-1, eq)}
                  disabled={quantity.current === 0}>-</button
                ><!--
              --><button
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
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  #equipment-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  #equipment-list > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .broken {
    opacity: 0.7;
  }
  /*  */
  .button-row {
    display: flex;
  }
  .title-row {
    display: flex;
    align-items: center;
  }
  .trash-col {
    width: 25px;
  }
  .equip-col {
    width: 25px;
  }
  .count-col {
  }
</style>
