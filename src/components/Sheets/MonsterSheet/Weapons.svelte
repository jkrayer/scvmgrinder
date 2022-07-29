<script type="ts">
  import type { Weapon } from "../../../global";
  import RollButton from "../../Buttons/RollButton.svelte";

  export let weapons: Weapon[] = [];

  console.log("monster weapons", weapons);
</script>

<div class="weapon-list-wrapper">
  <h2 class="monster-sheet-header">Weapons</h2>
  <ul class="list-clear weapon-list">
    {#each weapons as weapon}
      <li>
        <p>
          <span class="weapon-name">{weapon.name}</span>
          <!--
            TODO: I think I will make a damage roll button that knows how to send the message
          -->
          <RollButton diceString={weapon.damageDie} onRoll={() => {}} />
        </p>
        {#if weapon.special}
          <!--
            TODO: This needs to become some sort of effect draggable
          -->
          <p>{weapon.special}</p>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  .weapon-list-wrapper {
    padding: 0.25em;
  }
  .weapon-list {
    font-size: 0.75rem;
  }
  .weapon-list p {
    margin: 0;
  }
  .weapon-name {
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #333;
    text-transform: uppercase;
  }
</style>
