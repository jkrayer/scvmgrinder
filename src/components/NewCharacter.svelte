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
    import { handleFieldRoll, getFormData, findForm } from "../lib/dom";
    import TableofTables from './Tables/TableofTables.svelte';

    import {
        STARTING_EQUIPMENT_ONE,
        STARTING_EQUIPMENT_TWO,
        STARTING_EQUIPMENT_THREE,
        STARTING_WEAPONS,
        STARTING_ARMOR,
        SACRED_SCROLLS,
        UNCLEAN_SCROLLS
    } from '../data/tables';

    const selected = writable({});

    $: WEAPON_TABLE = { ...STARTING_WEAPONS, ...$selected.weaponsTable };
    $: ARMOR_TABLE = { ...STARTING_ARMOR, ...$selected.armorTable };

    // fields
    let hasScroll = false;
    let toughness;

    // Helpers
    const containsScroll = test(/scroll/i);

    // Handlers
    const onSelectCharacter = (character) => () => selected.update(() => character)

    const onSubmit = (e) => {
        const { name:className, omens, classSpecial } = $selected;
        const formData = getFormData(e.target);

        addCharacter(
            formatCharacterData({
                ...formData,
                className,
                omens,
                classSpecial
            })
        );
    };

    const handleFieldChanges = (e)=> {
        const formData = getFormData(findForm(e.path));
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

    <fieldset class="fieldset">
        <legend>Character Class</legend>
            {#each characters as c}
                <div><button type="reset" on:click={onSelectCharacter(c)}>{c.name}</button><button type="button">Info</button></div>
            {/each}
    </fieldset>

    {#if !isEmpty($selected)}

        {#if $selected.classTables.length > 0}
        <fieldset class="fieldset">
            {#each $selected.classTables as table}
                {#if table.name === 'background'}
                    <StringTable {...table} />
                {:else}
                    <RollTable {...table} />
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
            <RollTable {...STARTING_EQUIPMENT_ONE} />
            <TableofTables tables={[STARTING_EQUIPMENT_TWO, UNCLEAN_SCROLLS]} />
            <TableofTables tables={[STARTING_EQUIPMENT_THREE, SACRED_SCROLLS]} />
        </fieldset>
    
        <ExceptionTable {...WEAPON_TABLE} {hasScroll}  />
    
        <ExceptionTable {...ARMOR_TABLE} {hasScroll}  />
    
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
            <button type="submit">Submit</button>
        </fieldset>

    {/if}
</form>
