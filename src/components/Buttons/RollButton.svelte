<script>
    import { rollString } from '../../lib';

    export let diceString = "";
    export let onRoll = (roll) => {};
    export let disabled = false;

    const handleClick = () => onRoll(rollString(diceString));
</script>

<button type="button" class="roll-button" on:click={handleClick} disabled={disabled}><slot>{diceString}</slot></button>

<style>
    .roll-button {
        margin: 0;
    }
</style>