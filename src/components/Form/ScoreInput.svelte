<script>
    import Input from './Input.svelte';
    import { toInt, getAbilityScore } from '../../lib/';
    import RollButton from '../Buttons/RollButton.svelte';

    export let label;
    export let name;
    export let diceString;

    let roll;
    let score;

    // HANDLERS
    const handleRoll = (num) => {
        roll = num;
        score = getAbilityScore(num);
    }

    const handleChange = (e) => score = getAbilityScore(toInt(e.target.value));
    // 
</script>

<div class="row">
    <div>
    <Input
        type="number"
        label={`${label} Roll`}
        name={`${name}-roll`}
        value={roll}
        onChange={handleChange}
    />
    </div>
    <RollButton
        diceString={diceString}
        onRoll={handleRoll}
    />
    <div>
    <Input
        type="number"
        label={`${label} Score`}
        name={name}
        value={score}
        readonly    
    />
    </div>
</div>

<style>
    .row {
        justify-content: left;
        align-items: end;
    }
    .row > div:first-of-type {
        margin-right: .5rem;
    }
    .row > div:last-of-type {
        margin-left: .5rem;
    }
</style>