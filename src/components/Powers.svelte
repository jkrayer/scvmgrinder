<script>
  import SlideIn from "./SlideIn.svelte";
  import character, {
    decrementPowers,
    incrementPowers,
  } from "../stores/Character";
  import RollButton from "./Buttons/RollButton.svelte";

  export let show = false;
  export let onClose = () => {};

  const scrolls = $character.equipment.filter((eq) => eq.type === "scroll");
</script>

<SlideIn {show} {onClose}>
  <div>
    <p>Powers: (1d4/day); current ({$character?.powers || 0})</p>
    <p>
      Presence Test DR12. Success, the power is activated. Failure, take d2
      points of damage and you are dizzy for the next hour. Powers can not be
      used during this time.
    </p>
    <p>Available Powers {scrolls.length === 0 ? ": none" : ":"}</p>
    {#if scrolls.length > 0}
      <ul>
        {#each scrolls as scroll}
          <li><b>{scroll.name}</b> {scroll.description}</li>
        {/each}
      </ul>
    {/if}
    <button
      >Roll Prsence test, if successful onlock scrolls and enable thir effects,
      oin fail closse and take damage.</button
    >
    <!-- <button type="button" on:click={handleUse}>Use</button> -->
    <button type="button" on:click={onClose}>Cancel</button>
  </div>
</SlideIn>
