<script>
    import { partial } from 'ramda';
    import Armor from './EquipmentTypes/Armor.svelte';
	import character, { dropEquipment } from '../stores/Character';

    const encumbrance = 8 + $character.abilities.strength;
</script>

<h2>Equipment</h2>
<!-- TODO: Add Tooltip -->
<p>Strength + 8 items or DR+2 on Agility/Strength tests</p>

<ul class="list">
    {#each $character.equipment as e, i }
        <li class={ i >= encumbrance ? 'list-item empty' : 'list-item'} key={e._id}>
            {#if e.type === 'armor'}
                <Armor armor={e} />
            {:else}
                {e?.name}
            {/if}
            <!-- TODO: Skull Icon -->
            <button type="button" on:click={partial(dropEquipment, [i])}>Delete</button>
        </li>
    {/each}
</ul>

<style>
    .empty {
        background-color: rgba(255,0,0, .2)
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
        list-style: none;;
    }
    .list-item {
        flex-basis: 50%;
        padding: 0;
        margin: 0;
    }
</style>