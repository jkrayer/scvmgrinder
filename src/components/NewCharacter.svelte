<script>
    // import { onMount } from 'svelte';
    import { writable } from "svelte/store";
    import { propSatisfies, test } from "ramda";
    import { addCharacter } from '../stores/Characters';
    import ScoreInput from "./Form/ScoreInput.svelte";
    import RollButton from './Buttons/RollButton.svelte'
    import RadioGroup from './Form/RadioGroup.svelte';
    import Input from './Form/Input.svelte';
    import WeaponTable from './Tables/WeaponTable.svelte'
    import RollTable from "./RollTable.svelte";

    import {
        STARTING_EQUIPMENT_ONE,
        STARTING_EQUIPMENT_TWO,
        STARTING_EQUIPMENT_THREE,
        STARTING_WEAPONS,
        STARTING_ARMOR } from '../lib/tables';
    import { handleTableRoll } from '../lib/dom'

    const classData = writable({
        loading: false,
        error: false,
        errorMessage: null,
        selected: null,
        classes: [],
    });

    const selectedClass = writable({});

    // getter
    const fetchJSON = async (path) => {
        classData.update((oldState) => ({ ...oldState, loading: true, error: false, errorMessage: null }));

        try {
            const result = await fetch(path).then(res => res.json());
            classData.update(
                (oldState) => ({
                    ...oldState,
                    loading: false,
                    classes: result
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
    fetchJSON('/json/Characters.json')

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
    const onSelectCharacter = (selected) => () => classData.update((oldState) => ({...oldState, selected}))

    const onSubmit = (e) => {
        addCharacter(getFormData());
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
            {#each $classData.classes as c}
                <div><button type="button" on:click={onSelectCharacter(c)}>{c.name}</button><button type="button">Info</button></div>
            {/each}
    </fieldset>
    <!--  -->
    {#if $classData.selected !== null}
    <fieldset>
        <legend>First, you are what you own</legend>
        <p>Silver and food</p>
        <div>
                <Input type="number"
                    label="Silver"
                    name="silver"
                    value={silver}
                >
                    <RollButton diceString={$classData.selected.silver} onRoll={(x) => silver = x} />
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
        <RollTable
            title="d6"
            diceString="1d6"
            name="equipment-one"
            options={STARTING_EQUIPMENT_ONE}
        />
        <RollTable
            title="d12"
            diceString="1d12"
            name="equipment-two"
            options={STARTING_EQUIPMENT_TWO}
        />
        <RollTable
            title="d12"
            diceString="1d12"
            name="equipment-three"
            options={STARTING_EQUIPMENT_THREE}
        />
    </fieldset>
    <WeaponTable
        settings={$classData.selected.weaponsTable}
        hasScroll={hasScroll}
    />
    <fieldset>
        <legend>Armor d4 (d2 if you begin with a scroll)</legend>
        <RollButton diceString={hasScroll ? "1d2" : "1d4"} onRoll={handleTableRoll('armor')} />
        <RadioGroup options={STARTING_ARMOR} name="armor" disable={hasScroll ? 2 : -1} />
    </fieldset>    
    <fieldset>
        class tables
    </fieldset>
    <fieldset>
        <legend>Abilities</legend>
            <ScoreInput label="Agility" name="agility" diceString={$classData.selected.agility} />
            <ScoreInput label="Presence" name="presence" diceString={$classData.selected.presence} />
            <ScoreInput label="Strength" name="strength" diceString={$classData.selected.strength} />
            <ScoreInput label="Toughness" name="toughness" diceString={$classData.selected.toughness} />
    </fieldset>
    <fieldset>
            <label for="name">Name your character</label>
            <input type="text" name="name" id="name">
            <label for="name">, it won't save you</label>
    </fieldset>
    <button type="submit">Submit</button>        
    {/if}
</form>
{/if}
