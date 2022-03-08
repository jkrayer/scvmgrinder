<script>
    import Input from './Input.svelte';
    import { toInt, rollHp } from '../../lib/';
    import RollButton from '../Buttons/RollButton.svelte';

    export let diceString;
    export let toughness;

    let roll;
    let score;

    // HANDLERS
    const handleRoll = (num) => {
        roll = num;
        score = rollHp(num, toughness);
    }

    const handleChange = (e) => score = rollHp(toInt(e.target.value), toughness);
    // 
</script>

<div class="row">
    <div>
    <Input
        type="number"
        label="HP Roll + Toughness"
        value={roll}
        onChange={handleChange}
        disabled={toughness === undefined}
    />
    </div>
    <RollButton
        diceString={diceString}
        onRoll={handleRoll}
        disabled={toughness === undefined}
    />
    <div>
    <Input
        type="number"
        label="Hit Points"
        name="hp"
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