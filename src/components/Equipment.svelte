<script>
    import { partial, propIs, propSatisfies } from 'ramda';
    import Equipable from './EquipmentTypes/Equipable.svelte';
    import Equipment from './EquipmentTypes/Equipment.svelte';
    import Countable from './EquipmentTypes/Countable.svelte';
	import character, { dropEquipment } from '../stores/Character';

    const isEquippable = propIs(Boolean, 'equipped');
    const isCountable = propSatisfies((x) => x < 100 && x > 0, 'weight');

    /**
     * because JS is bad at floating point math we're going to use 100 to represent a "full size item"
     * partial sized items will have 100 / number to fill one slot. 
     * Ex: Arrows will have a weight 5 fitting 20 into a single slot
     */
    const encumbranceNumber = 8 + $character.abilities.strength;
    const maxEquipmentRows = encumbranceNumber * 2;
    const calculatedEncumbrance = encumbranceNumber * 100;

    $: equipmentWeight = $character.equipment.reduce((acc, eq) => acc + (!!eq.equipped === false ? eq.weight * eq.quantity : 0) , 0)
    $: isEncumbered = calculatedEncumbrance <= equipmentWeight;
    $: console.log(20, equipmentWeight, isEncumbered)
</script>

<div class="equipment" class:encumbered={isEncumbered}>
    <div class="row r">
        <h2 class="title">Equipment</h2>
        <p class="text">Strength + 8 ({encumbranceNumber}) items or DR+2 on Agility/Strength tests</p>
    </div>

    <ul class="list-clear list">
        {#each $character.equipment as e, i (e._id)}
            <li class="list-item">
                {#if isEquippable(e)}
                    <Equipable item={e} />
                {:else if isCountable(e)}
                    <Countable item={e} />
                {:else}
                    <Equipment item={e} />
                {/if}
                <!-- TODO: Skull Icon -->
                <button type="button" class="mb0" on:click={partial(dropEquipment, [i])}>Delete</button>
            </li>
        {/each}
    </ul>
</div>

<style>
    .equipment {
        padding: var(--small-padding);
    }

    .r {
        padding-bottom: var(--small-padding);
    }
    .title {
        margin: 0;
        font-family: var(--serif);
        font-size: 2em;
    }
    
    .text {
        padding: var(--small-padding);
        margin: 0;
        font-size: .875em;
        line-height: 1;
    }

    .encumbered {
        background-color: rgba(255,0,0, .2)
    }
    .list {
        display: flex;
        flex-direction: column;
        /* flex-wrap: wrap; */
    }
    .list-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: .5em;
        /* flex-basis: 50%; */
    }
</style>
