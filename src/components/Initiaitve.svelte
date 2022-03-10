<script>
    import character from '../stores/Character'
    import RollButton from './Buttons/RollButton.svelte';
    import Input from './Form/Input.svelte'
    import { toInt } from '../lib'

    const { abilities } = $character;

    // Handlers
    const handleRoll = (roll) => $character.initiative = roll + abilities.agility;

    const handleChange = (e) => $character.initiative = toInt(e.target.value);
</script>

<div>
    <RollButton
      diceString={"1d6"}
      onRoll={handleRoll}
    >Initiative 1d6 + Agility</RollButton>
    <Input
      label="Initiative"
      type="number"
      name="initiative"
      value={$character.initiative}
      onChange={handleChange}
    />
</div>
