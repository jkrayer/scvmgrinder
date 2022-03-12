<script>
    import { partial } from 'ramda';
    import Equipable from './EquipmentTypes/Equipable.svelte';
    import Equipment from './EquipmentTypes/Equipment.svelte';
	import character, { dropEquipment } from '../stores/Character';

    const encumbrance = 8 + $character.abilities.strength;
</script>

<div class="equipment">
    <div class="row r">
        <h2 class="title">Equipment</h2>
        <p class="text">Strength + 8 items or DR+2 on Agility/Strength tests</p>
    </div>

    <ul class="list-clear list">
        {#each $character.equipment as e, i }
            <li class={ i >= encumbrance ? 'list-item empty' : 'list-item'} key={e._id}>
                {#if e.type === 'armor'}
                    <Equipable item={e} />
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

    .empty {
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

    .mb0 {
        margin-bottom: 0;
    }
</style>
