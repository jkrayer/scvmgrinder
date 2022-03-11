<script>
    import character, { decrementOmens, incrementOmens } from '../stores/Character'
    import RollButton from './Buttons/RollButton.svelte';

    const handleRoll = (num) => $character.omens.current = num
</script>
<!--  Maximum damage, Reroll, –d6 damage, DR –4, No Crit/Fumble -->
<div>
    Omens: ({$character?.omens?.die }/day); current ({$character?.omens?.current || 0})
    <button type="button" on:click={decrementOmens}>-</button>
    <button type="button" on:click={incrementOmens}>+</button>
    <RollButton diceString={$character?.omens?.die} onRoll={handleRoll}>Roll {$character?.omens?.die}</RollButton>
    <p>use omens to</p>
    <ul>
        <li>deal maximum damage with one attack</li>
        <li>reroll, your dice or someone else's</li>
        <li>lower damage deal to you by 1d6</li>
        <li>neutralize a crit or a fumble</li>
        <li>lower one tests by DR -4</li>
    </ul>
</div>