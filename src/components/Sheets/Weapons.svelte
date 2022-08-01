<script type="ts">
  import { createEventDispatcher } from "svelte";
  import type { Weapon } from "../../global";

  export let weapons: Weapon[] = [];

  const dispatch = createEventDispatcher();
</script>

<div class="weapons">
  {#each weapons as weapon}
    <div class="weapon" class:broken={weapon.broken}>
      <div class="weapon-type">
        <div>
          Weapon <span class="weapon-subtype">({weapon.subType})</span>:
        </div>
      </div>
      <div class="weapon-data">
        <div>
          <span class="weapon-name">{weapon.name}</span>
          {#if weapon.broken}
            (broken)
          {/if}
        </div>
        <div>
          <span>{weapon.damageDie}</span>
        </div>
        <div>
          <button
            type="button"
            class="weapon-attack-button"
            disabled={weapon.broken}
            on:click={() => dispatch("attack", weapon)}>Attack!</button
          >
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .weapons {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .weapon {
    position: relative;
    margin: 0.25rem;
    line-height: 1;
  }

  .weapon.broken {
    opacity: 0.7;
  }

  .weapon-type {
    border: 1px solid #ccc;
    border-bottom: none;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #fff;
  }

  .weapon-type > div {
    display: inline-block;
    position: absolute;
    top: -0.625rem;
    left: 0.25rem;
    padding: 0.25rem;
    background-color: #fff;
  }

  .weapon-subtype {
    font-weight: normal;
    text-transform: none;
  }

  .weapon-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-top: none;
  }

  .weapon-data > div {
    padding: 0.75rem;
  }

  .weapon-attack-button {
    padding: 0;
    margin: 0;
  }
</style>
