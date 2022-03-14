<script>
    import character, { incrementHp, decrementHp } from '../stores/Character'
    import Incrementer from './CharacterSheet/Incrementer.svelte';
</script>

<Incrementer
  title='<abbr title="Hit Points">HP</abbr>'
  value={$character.hitpoints.current}
  maxValue={$character.hitpoints.maximum}
  increment={incrementHp}
  decrement={decrementHp}
  set={false}
/>
