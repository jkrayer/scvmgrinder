<script>
    import Armor from './EquipmentTypes/Armor.svelte';
	import character from '../stores/Character';
    const encumbrance = 8 + $character.abilities.strength;
    
    $: equipment = Object.entries($character.equipment);
    
</script>

<h2>Equipment</h2>
<p>Strength + 8 items or DR+2 on Agility/Strength tests</p>

<ul class="list">
    {#each equipment as [slotId,e], i }
        <li class={ i >= encumbrance ? 'list-item empty' : 'list-item'} key={slotId}>
            {#if e.type === 'armor'}
                <Armor armor={e} slotId={slotId} />
            {:else}
                {e?.name}
            {/if}
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