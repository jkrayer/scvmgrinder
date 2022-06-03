<script>
  import SlideIn from "./SlideIn.svelte";
  import character, { decrementOmens } from "../stores/Character";

  export let show = false;
  export let onClose = () => {};

  const handleUse = () => {
    decrementOmens();
    onClose();
  };
</script>

<SlideIn {show} {onClose}>
  <div>
    Omens: ({$character?.omens?.die}/day); current ({$character?.omens
      ?.current || 0})
    <p>Use omens to</p>
    <ul>
      <li>deal maximum damage with one attack</li>
      <li>reroll, your dice or someone else's</li>
      <li>lower damage dealt to you by 1d6</li>
      <li>neutralize a crit or a fumble</li>
      <li>lower one test by DR -4</li>
    </ul>
    <button type="button" on:click={handleUse}>Use</button>
    <button type="button" on:click={onClose}>Cancel</button>
  </div>
</SlideIn>
