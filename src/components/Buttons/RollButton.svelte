<script>
    import { rollString } from '../../lib';

    export let diceString = "";
    export let onRoll = (roll) => {};
    
    const handleClick = () => onRoll(rollString(diceString));
</script>

<button type="button" on:click={handleClick}>{diceString}</button>
