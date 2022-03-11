<script>
    import character, { decrementPowers, incrementPowers } from '../stores/Character'
    import RollButton from './Buttons/RollButton.svelte';

    const handleRoll = (num) => $character.powers = num
</script>

<div>
    Powers: (1d4/day); current ({$character?.powers || 0})
    <button type="button" on:click={decrementPowers}>-</button>
    <button type="button" on:click={incrementPowers}>+</button>
    <RollButton diceString="1d4" onRoll={handleRoll}>Roll 1d4</RollButton>
    Presence Test DR12. Success, the power is activated. Failure, take d2 points of damage and you are dizzy for the next hour. Powers can not be used during this time.
</div>