<script>
  import RollButton from "./Buttons/RollButton.svelte";
  import { isEmpty, isNil, pathOr, propOr } from "ramda";
  import { sign } from "../lib";

  const name = propOr("None", "name");
  const effDescription = pathOr("", ["effect", "description"]);

  export let armor = {};
  export let shield = {};
  export let agility = 0;
  let toggle = false;

  const handleToggle = () => (toggle = !toggle);
  const handleTierClick = () => {};
  const roll = () => {};
</script>

<h4>Armor Worn</h4>

<div class="row-padded r">
  <div>
    <b>Armor:</b>
    {name(armor)}
    {effDescription(armor)}
  </div>
  <div>
    Defense: <RollButton diceString="1d20{sign(agility)}" />
    {#if !isEmpty(armor) && !isNil(armor)}
      <button
        type="button"
        on:click={handleToggle}
        class="button-tier"
        title={`Show ${toggle ? "Tiers" : "Rolls"}`}
      >
        <img src="/images/switch_sm.png" alt="" />
      </button>
      {#if toggle}
        <button
          type="button"
          on:click={() => alert(roll(2))}
          class={armor.tier.current === 1
            ? "current button-tier"
            : "button-tier"}
          title="-d2"
          disabled={armor.tier.current !== 1}
        >
          -d2
        </button>
        <button
          type="button"
          on:click={() => alert(roll(4))}
          class={armor.tier.current === 2
            ? "current button-tier"
            : "button-tier"}
          title="-d4"
          disabled={armor.tier.current !== 2}
        >
          -d4
        </button>
        <button
          type="button"
          on:click={() => alert(roll(6))}
          class={armor.tier.current === 3
            ? "current button-tier"
            : "button-tier"}
          title="-d6"
          disabled={armor.tier.current !== 3}
        >
          -d6
        </button>
      {:else}
        <button
          type="button"
          on:click={handleTierClick(1)}
          class={armor.tier.current === 1
            ? "current button-tier"
            : "button-tier"}
          title="Tier 1, -d2"
        >
          1
        </button>
        <button
          type="button"
          on:click={handleTierClick(2)}
          class={armor.tier.current === 2
            ? "current button-tier"
            : "button-tier"}
          title="Tier 2, -d4"
        >
          2
        </button>
        <button
          type="button"
          on:click={handleTierClick(3)}
          class={armor.tier.current === 3
            ? "current button-tier"
            : "button-tier"}
          title="Tier 3, -d6"
        >
          3
        </button>
      {/if}
    {/if}
  </div>
</div>

<style>
  .r {
    justify-content: space-between;
    align-items: center;
  }
  .r > div {
    flex-basis: auto;
  }

  .current {
    background-color: yellow;
  }
  button:disabled {
    background-color: gray;
  }

  .button-tier {
    width: 30px;
    height: 30px;
    padding: 3px;
    border-radius: 50%;
    font-size: 0.75em;
  }
  .button-tier > img {
    position: relative;
    top: 1px;
    width: 100%;
  }
</style>
