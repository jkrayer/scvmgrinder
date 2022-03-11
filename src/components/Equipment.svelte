<script>
    import { partial } from 'ramda';
    import Equipable from './EquipmentTypes/Equipable.svelte';
    import Equipment from './EquipmentTypes/Equipment.svelte';
	import character, { dropEquipment } from '../stores/Character';

    const encumbrance = 8 + $character.abilities.strength;
</script>

<h2>Equipment</h2>
<!-- TODO: Add Tooltip -->
<p>Strength + 8 items or DR+2 on Agility/Strength tests</p>

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

<style>
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
