<script>
    import { writable } from "svelte/store";
    import { setContext } from 'svelte';
    import NewCharacter from '../stores/NewCharacter';
    import RadioGroup from './Form/RadioGroup.svelte'
    import { STARTING_EQUIPMENT_ONE, STARTING_EQUIPMENT_TWO, STARTING_EQUIPMENT_THREE, STARTING_WEAPONS, STARTING_ARMOR } from '../lib/tables';
    import { rollFormula } from '../lib';
    import Input from './Form/Input.svelte'
    import ScoreInput from "./Form/ScoreInput.svelte";
    import RollButton from './Buttons/RollButton.svelte'

    const setInDom = (id) => (num) => {
        const el = document.getElementById(id);

        if (el !== null) el.value = num
    }

    const values = writable({})
    setContext('form', { values });
    $: console.log($values)

    const classData = writable({
        loading: false,
        error: false,
        errorMessage: null,
        baseTpl: {},
    });

    // getter
    const fetchJSON = async (path) => {
        classData.update((oldState) => ({ ...oldState, loading: true, error: false, errorMessage: null }));

        try {
            const result = await fetch(path).then(res => res.json());
            classData.update(
                (oldState) => ({
                    ...oldState,
                    loading: false,
                    baseTpl: result                    
                })
            );
        } catch (error) {
            classData.update(
                (oldState) => ({
                    ...oldState,
                    loading: false,
                    error: true,
                    errorMessage: error
                })
            );
        }
    }

    // setup
    fetchJSON('/json/PlayerCharacter.json')

    // 
    const rollProp = (key, dice) => () => {
        const result = rollFormula(dice);
        NewCharacter.update((oldState) => ({ ...oldState, [key]: result }));
    }

    const rollP = (key, dice) => () => {
        const result = rollFormula(dice);
        values.update((oldState) => ({ ...oldState, [key]: result }));
    }

    //
    const updateProp = (prop) => (e) => {
        NewCharacter.update((oldState) => ({ ...oldState, [prop]: e.target.value }));
    }

    const classes = ['Fanged Deserter', 'Gutterborn Scum'] // and more

    const onSubmit = (e) => {
        const formData = new FormData(e.target);
        
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        console.log('sub', data)
    }
</script>

{#if $classData.loading}
    <p>loading...</p>
{:else if $classData.error}
    <p>{$classData.errorMessage}</p>
{:else}
<form novalidate on:submit|preventDefault={onSubmit}>

    <fieldset>
        <legend>Character Class</legend>
            <button type="button">No Class</button>

            {#each classes as c}
                <div><button type="button">{c}</button><button type="button">Info</button></div>
            {/each}
            <p>Click on a selection merges the template data and sets the rest of the process</p>
    </fieldset>

    <fieldset>
        <legend>First, you are what you own</legend>
        <p>Silver and food</p>
        <div>
            <label for="silver">Silver ({$classData.baseTpl.silver.join('')})</label>
            <input type="number" name="silver" id="silver" bind:value={$NewCharacter.silver}>
            <button type="button" on:click={rollProp("silver", $classData.baseTpl.silver)}>Roll</button>
        </div>
        <div>
            <label for="provisions">A waterskin and d4 days worth of food</label>
            <input type="number" name="provisions" id="provisions" bind:value={$NewCharacter.food}>
            <button type="button" on:click={rollProp('food', [1, 'd', 4])}>Roll</button>
        </div>
    </fieldset>

    <fieldset>
        <legend>To begin with, you are what you own</legend>

        <fieldset>
            <legend>d6</legend>
            <RadioGroup
                options={STARTING_EQUIPMENT_ONE}
                name="equipment-one"
            />
        </fieldset>
        <fieldset>
            <legend>d12</legend>
            <RadioGroup
                options={STARTING_EQUIPMENT_TWO}
                name="equipment-two"
            />
        </fieldset>
        <fieldset>
            <legend>d12</legend>
            <RadioGroup
                options={STARTING_EQUIPMENT_THREE}
                name="equipment-three"
            />

        </fieldset>
    </fieldset>
    <fieldset>
        <legend>Weapons d10 (d6 if you have a sroll)</legend> 
        <RadioGroup options={STARTING_WEAPONS} name="weapon" />
    </fieldset>
    <fieldset>
        <legend>Armor d4 (d2 if you begin with a scroll)</legend>
        <RadioGroup options={STARTING_ARMOR} name="armor" />
    </fieldset>    
    <fieldset>
        class tables
    </fieldset>
    <fieldset>
        <legend>Abilities</legend>
            <ScoreInput label="Agility" name="agility" diceString={$classData.baseTpl.agility} />
            <ScoreInput label="Presence" name="presence" diceString={$classData.baseTpl.presence} />
            <ScoreInput label="Strength" name="strength" diceString={$classData.baseTpl.strength} />
            <ScoreInput label="Toughness" name="toughness" diceString={$classData.baseTpl.toughness} />
    </fieldset>
    <fieldset>
            <label for="name">Name your character</label>
            <input type="text" name="name" id="name" bind:value={$NewCharacter.name}>
            <label for="name">, it won't save you</label>
    </fieldset>
    <button type="submit">Submit</button>
</form>
{/if}
