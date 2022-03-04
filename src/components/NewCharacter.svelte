<script>
    // import { onMount } from 'svelte';
    import { writable } from "svelte/store";
    import { propSatisfies, test } from "ramda";
    import ScoreInput from "./Form/ScoreInput.svelte";
    import RollButton from './Buttons/RollButton.svelte'
    import RadioGroup from './Form/RadioGroup.svelte';
    import Input from './Form/Input.svelte';
    import {
        STARTING_EQUIPMENT_ONE,
        STARTING_EQUIPMENT_TWO,
        STARTING_EQUIPMENT_THREE,
        STARTING_WEAPONS,
        STARTING_ARMOR } from '../lib/tables';

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
    const classes = ['Fanged Deserter', 'Gutterborn Scum'] // and more

    // 
    const getFormData = () => {
        const form = document.getElementById('new-character-form');
        const formData = new FormData(form);

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        return data;
    }

    // fields
    let hasScroll = false;
    let silver;
    let provisions;

    // Helpers
    const containsScroll = test(/scroll/);

    // Handlers
    const onSubmit = (e) => {
        console.log('sub', getFormData())
    }

    const handleFieldChanges = (e)=> {
        const formData = getFormData();
        const nextHasScroll = propSatisfies(containsScroll, 'equipment-two', formData) || propSatisfies(containsScroll, 'equipment-three', formData);

        if (hasScroll !== nextHasScroll) {
            document.getElementsByName('weapon').forEach(el => el.checked = false);
            document.getElementsByName('armor').forEach(el => el.checked = false);
        }

        hasScroll = nextHasScroll;
    }

    const handleTableRoll = (name) => (roll) => {
        const radios = document.getElementsByName(name);
        let key = name === "equipment-one" ? roll - 2 : roll - 1;
        key = key < 0 ? 0 : key;

        radios[key].dispatchEvent(new MouseEvent('click'))
    }
</script>

{#if $classData.loading}
    <p>loading...</p>
{:else if $classData.error}
    <p>{$classData.errorMessage}</p>
{:else}
<form id="new-character-form" novalidate on:submit|preventDefault={onSubmit} on:change={handleFieldChanges}>
    <!--  -->
    <fieldset>
        <legend>Character Class</legend>
            <button type="button">No Class</button>
            {#each classes as c}
                <div><button type="button">{c}</button><button type="button">Info</button></div>
            {/each}
            <p>Click on a selection merges the template data and sets the rest of the process</p>
    </fieldset>
    <!--  -->
    <fieldset>
        <legend>First, you are what you own</legend>
        <p>Silver and food</p>
        <div>
                <Input type="number"
                    label="Silver"
                    name="silver"
                    value={silver}
                >
                    <RollButton diceString={$classData.baseTpl.silver} onRoll={(x) => silver = x} />
                </Input>
        </div>
                <Input type="number"
                    label="A waterskin and d4 days worth of food"
                    name="provisions"
                    value={provisions}
                >
                    <RollButton diceString="1d4" onRoll={(x) => provisions = x} />
                </Input>
    </fieldset>

    <fieldset>
        <legend>To begin with, you are what you own</legend>
        <fieldset>
            <legend>d6</legend>
            <RollButton diceString="1d6" onRoll={handleTableRoll('equipment-one')} />
            <RadioGroup
                options={STARTING_EQUIPMENT_ONE}
                name="equipment-one"
            />
        </fieldset>
        <fieldset>
            <legend>d12</legend>
            <RollButton diceString="1d12" onRoll={handleTableRoll('equipment-two')} />
            <RadioGroup
                options={STARTING_EQUIPMENT_TWO}
                name="equipment-two"
            />
        </fieldset>
        <fieldset>
            <legend>d12</legend>
            <RollButton diceString="1d12" onRoll={handleTableRoll('equipment-three')} />
            <RadioGroup
                options={STARTING_EQUIPMENT_THREE}
                name="equipment-three"
            />

        </fieldset>
    </fieldset>
    <fieldset>
        <legend>Weapons d10 (d6 if you have a sroll)</legend>
        <RollButton diceString={hasScroll ? "1d6" : "1d10"} onRoll={handleTableRoll('weapon')} />
        <RadioGroup options={STARTING_WEAPONS} name="weapon" disable={hasScroll ? 6 : -1} />
    </fieldset>
    <fieldset>
        <legend>Armor d4 (d2 if you begin with a scroll)</legend>
        <RollButton diceString={hasScroll ? "1d2" : "1d4"} onRoll={handleTableRoll('armor')} />
        <RadioGroup options={STARTING_ARMOR} name="armor" disable{hasScroll ? 2 : -1} />
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
            <input type="text" name="name" id="name">
            <label for="name">, it won't save you</label>
    </fieldset>
    <button type="submit">Submit</button>
</form>
{/if}
