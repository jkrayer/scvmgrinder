<script>
  import CharacterSocket from "../stores/CharacterSocket";
  // import character, { incrementHp, decrementHp } from "../stores/Character";
  import Incrementer from "./CharacterSheet/Incrementer.svelte";

  let hp = {};

  CharacterSocket.subscribe(({ data }) => (hp = data.hitpoints));

  const incrementHp = () => {
    hp.current = (hp.current || 0) + 1;
  };
  const decrementHp = () => {
    hp.current = (hp.current || 0) - 1;
  };
  const set = () => CharacterSocket.setHp(hp.current);
</script>

<!-- <abbr title="Hit Points">HP</abbr> -->
<Incrementer
  title="HP"
  value={hp.current}
  maxValue={hp.maximum}
  increment={incrementHp}
  decrement={decrementHp}
  set={false}
/>
<button type="button" on:click={set}>SET</button>
