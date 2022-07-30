<script type="ts">
  import type { Weapon } from "../../global";
  import { info } from "../Toasts/ToastStore";

  export let weapons: Weapon[] = [];

  // Handlers
  const handleAttack = () => {
    // TODO: The Entire Attack Process
    info({
      text: "Select a target in the tracker",
      expireIn: 2000,
    });
  };
</script>

<div class="weapons">
  {#each weapons as weapon}
    <div class="weapon">
      <div class="weapon-type">
        <div>
          Weapon <span class="weapon-subtype">({weapon.subType})</span>:
        </div>
      </div>
      <div class="weapon-data">
        <div>
          <span class="weapon-name">{weapon.name}</span>
        </div>
        <div>
          <span>{weapon.damageDie}</span>
        </div>
        <div>
          <button
            type="button"
            class="weapon-attack-button"
            on:click={handleAttack}>Attack!</button
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
