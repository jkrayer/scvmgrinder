<script>
    import { isEmpty } from 'ramda';
    import characters from '../data/characters';
    import { writable } from "svelte/store";
    import { propSatisfies, test } from "ramda";
    import { addCharacter } from '../stores/Characters';
    import ScoreInput from "./Form/ScoreInput.svelte";
    import HitPointInput from "./Form/HitPointInput.svelte";
    import Input from './Form/Input.svelte';
    import RollButton from './Buttons/RollButton.svelte';
    import ExceptionTable from './Tables/ExceptionTable.svelte';
    import RollTable from "./Tables/RollTable.svelte";
    import StringTable from './Tables/StringTable.svelte';
    import { formatCharacterData } from '../lib/formatCharacterData';
    import { handleFieldRoll } from "../lib/dom";

    import {
        STARTING_EQUIPMENT_ONE,
        STARTING_EQUIPMENT_TWO,
        STARTING_EQUIPMENT_THREE,
        STARTING_WEAPONS,
        STARTING_ARMOR,
    } from '../data/tables';

    const selected = writable({});

    $: console.log(27, $selected)

    $: WEAPON_TABLE = { ...STARTING_WEAPONS, ...$selected.weaponsTable };
    $: ARMOR_TABLE = { ...STARTING_ARMOR, ...$selected.armorTable };

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
    let toughness;

    // Helpers
    const containsScroll = test(/scroll/);

    // Handlers
    const onSelectCharacter = (character) => () => selected.update(() => character)

    const onSubmit = (e) => {
        const { name:className, omens } = $selected;
        addCharacter(
            formatCharacterData({
                ...getFormData(),
                className,
                omens
            })
        );
    };

    const handleFieldChanges = (e)=> {
        const formData = getFormData();
        const nextHasScroll = propSatisfies(containsScroll, 'equipmentTwo', formData) || propSatisfies(containsScroll, 'equipmentThree', formData);

        if (hasScroll !== nextHasScroll) {
            document.getElementsByName('weapon').forEach(el => el.checked = false);
            document.getElementsByName('armor').forEach(el => el.checked = false);
        }

        hasScroll = nextHasScroll;
    }
</script>

<form
    id="new-character-form"
    novalidate
    on:submit|preventDefault={onSubmit}
    on:change={handleFieldChanges}
>
    <!--  -->

    <fieldset class="fieldset">
        <legend>Character Class</legend>
            {#each characters as c}
                <div><button type="button" on:click={onSelectCharacter(c)}>{c.name}</button><button type="button">Info</button></div>
            {/each}
    </fieldset>
    
    <!--  -->
    {#if !isEmpty($selected)}
        {#if $selected.classTables.length > 0}
        <fieldset class="fieldset">
            {#each $selected.classTables as table}
                {#if table.name === 'background'}
                    <StringTable {...table} />
                {/if}
            {/each}
        </fieldset>
        {/if}
    <fieldset class="fieldset">
        <legend>First, you are what you own</legend>
        <p>Silver and food</p>
        <div>
                <Input type="number"
                    label="Silver"
                    name="silver"
                >
                    <RollButton diceString={$selected.silver} onRoll={handleFieldRoll('silver')} />
                </Input>
        </div>
                <Input type="number"
                    label="A waterskin and d4 days worth of food"
                    name="provisions"
                >
                    <RollButton diceString="1d4" onRoll={handleFieldRoll('provisions')} />
                </Input>
    </fieldset>

    <fieldset class="fieldset">
        <legend>To begin with, you are what you own</legend>
        <RollTable {...STARTING_EQUIPMENT_ONE} name="equipmentOne" />
        <RollTable {...STARTING_EQUIPMENT_TWO} name="equipmentTwo" />
        <RollTable {...STARTING_EQUIPMENT_THREE} name="equipmentThree" />
    </fieldset>
    <ExceptionTable {...WEAPON_TABLE} {hasScroll} name="weapons" />
    <ExceptionTable {...ARMOR_TABLE} {hasScroll} name="armor" />
    <fieldset class="fieldset">
        <legend>Abilities</legend>
            <ScoreInput label="Agility" name="agility" diceString={$selected.agility} />
            <ScoreInput label="Presence" name="presence" diceString={$selected.presence} />
            <ScoreInput label="Strength" name="strength" diceString={$selected.strength} />
            <ScoreInput label="Toughness" name="toughness" onChange={(x) => toughness = x} diceString={$selected.toughness} />
            <HitPointInput diceString={$selected.hitpoints} toughness={toughness} />
    </fieldset>
    <fieldset class="fieldset">
            <label for="name">Name your character</label>
            <input type="text" name="name" id="name">
            <label for="name">, it won't save you</label>
    </fieldset>
    
    <button type="submit">Submit</button>        
        
    {/if}
</form>
