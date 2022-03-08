<script>
    import { rollString } from '../../lib';

    export let diceString = "";
    export let onRoll = (roll) => {};
    export let disabled = false;

    const handleClick = () => onRoll(rollString(diceString));
</script>

<button type="button" on:click={handleClick} disabled={disabled}>{diceString}</button>
