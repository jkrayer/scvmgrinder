<script>
  import {
    always,
    compose,
    either,
    filter,
    head,
    identity,
    ifElse,
    isNil,
    prop,
    propEq,
    sortBy,
  } from "ramda";
  import SlideIn from "../SlideIn.svelte";
  import character, {
    subtractEquipment,
    addHealth,
  } from "../../stores/Character";
  import { rollString } from "../../lib";

  export let show = false;
  export let onClose = () => {};

  // Helpers
  const emptyQ = ifElse(isNil, always({ quantity: 0 }), identity);

  const getWater = compose(emptyQ, head, filter(propEq("name", "Waterskin")));

  const getFood = compose(
    emptyQ,
    head,
    sortBy(prop("quantity")),
    filter(either(propEq("name", "Dried food"), propEq("name", "Lard")))
  );

  // Handlers
  const onRestClick = ({ _id }) => {
    subtractEquipment(_id);
    const heal = rollString("1d4");
    alert(`Healing ${heal} points`);
    addHealth(heal);
    onClose();
  };

  const onSleepClick = ({ _id }) => {
    subtractEquipment(_id);
    const heal = rollString("1d6");
    alert(`Healing ${heal} points`);
    addHealth(heal);
    onClose();
  };

  $: isInfected = !!$character.infected;
  $: water = getWater($character.equipment);
  $: food = getFood($character.equipment);
</script>

<SlideIn {show} {onClose}>
  <div class:s={isInfected || water.quantity === 0}>
    <p>
      Catch your breath,
      <button
        type="button"
        class="mb0"
        disabled={isInfected || water.quantity === 0}
        on:click={onRestClick(water)}
      >
        have a drink
      </button>. Restore d4 HP.
    </p>
  </div>
  <div class:s={isInfected || food.quantity === 0}>
    <p>
      A
      <button
        type="button"
        class="mb0"
        disabled={isInfected || food.quantity === 0}
        on:click={onSleepClick(food)}
      >
        full night’s sleep
      </button>
      restores d6 HP.
    </p>
  </div>
  <button type="button" on:click={onClose}>Cancel</button>
</SlideIn>

<style>
  .s {
    text-decoration: line-through;
  }
</style>
