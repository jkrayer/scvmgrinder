<script type="ts">
  import { has } from "ramda";
  import type { Equipment } from "./type";

  // TODO: Need state mechanism to handle the effect of being encumbered and max items carried
  export let equipment: Equipment[] = [];

  const equippable = has("equipped");
</script>

<div class="character-sheet-field character-sheet-ko">
  <div class="title-row">
    <h2 class="character-sheet-field-label character-sheet-ko">Equipment</h2>
    <p class="character-sheet-copy">
      Strength + 8 items or DR+2 on Agility/Strength tests
    </p>
  </div>
  <ul id="equipment-list">
    {#each equipment as eq, index}
      <li class="character-sheet-field">
        <div class:broken={eq.broken}>
          {eq.name}
          {#if eq.broken}
            (broken)
          {/if}
        </div>
        <div>
          {#if equippable(eq)}
            <button type="button" on:click={() => alert("equip")}
              >{eq.equipped ? "U " : "E"}</button
            >
          {/if}

          <button type="button" on:click={() => alert("trashEquipment(index)")}
            >T</button
          >
        </div>
      </li>
    {/each}
  </ul>
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
  .title-row {
    display: flex;
    align-items: center;
  }
</style>
