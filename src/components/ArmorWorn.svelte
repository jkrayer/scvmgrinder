<script>
  import {
    always,
    compose,
    filter,
    head,
    identity,
    ifElse,
    isEmpty,
    isNil,
  } from "ramda";
  import character, { setArmorTier } from "../stores/Character";
  import { roll } from "../lib";

  const isWornArmor = (equipment) =>
    equipment.type === "armor" && equipment.equipped;
  const getWornArmor = compose(
    ifElse(isNil, always({}), identity),
    head,
    filter(isWornArmor)
  );

  let toggle = true;
  $: armorWorn = getWornArmor($character.equipment);
  $: hasArmor = !isEmpty(armorWorn);

  // Handlers
  const handleToggle = () => (toggle = !toggle);
  // does this need to be reactive? Would I get stale state for armor worn?, armor is
  // stale but it doesn't matter in this case
  const handleTierClick = (tier) => () => setArmorTier(armorWorn._id, tier);
</script>

<div class="row-padded r">
  <div>
    <b>Armor:</b>
    {hasArmor ? armorWorn.name : "None"}
  </div>
  <div>
    {#if hasArmor}
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
          class={armorWorn.currentTier === 1
            ? "current button-tier"
            : "button-tier"}
          title="-d2"
          disabled={armorWorn.currentTier !== 1}
        >
          -d2
        </button>
        <button
          type="button"
          on:click={() => alert(roll(4))}
          class={armorWorn.currentTier === 2
            ? "current button-tier"
            : "button-tier"}
          title="-d4"
          disabled={armorWorn.currentTier !== 2}
        >
          -d4
        </button>
        <button
          type="button"
          on:click={() => alert(roll(6))}
          class={armorWorn.currentTier === 3
            ? "current button-tier"
            : "button-tier"}
          title="-d6"
          disabled={armorWorn.currentTier !== 3}
        >
          -d6
        </button>
      {:else}
        <button
          type="button"
          on:click={handleTierClick(1)}
          class={armorWorn.currentTier === 1
            ? "current button-tier"
            : "button-tier"}
          title="Tier 1, -d2"
        >
          1
        </button>
        <button
          type="button"
          on:click={handleTierClick(2)}
          class={armorWorn.currentTier === 2
            ? "current button-tier"
            : "button-tier"}
          title="Tier 2, -d4"
        >
          2
        </button>
        <button
          type="button"
          on:click={handleTierClick(3)}
          class={armorWorn.currentTier === 3
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
