<script>
    import { partial } from 'ramda';
    import characters, { addCharacter, deleteCharacter } from '../stores/Characters';
    import { setSelected } from '../stores/Character';

    $: characterArray = $characters.map((characterId) => {
        // This can break when, if this list and the items in storage fall out of sync
        const { id, name} = JSON.parse(localStorage.getItem(`character:${characterId}`) || '{}')

        return { id, name }
    })

    // Handlers 
    const onDeleteCharacter = (id, name) => confirm(`Delete ${name}?`) ? deleteCharacter(id) : null

</script>

<aside>
    <ul class="list-clear">
        {#each characterArray as {id, name} }
            <li key={id}>
                <button type="button" on:click={partial(setSelected, [id])}>
                    {name}
                </button>
                <button type="button" on:click={partial(onDeleteCharacter, [id])}>Delete</button>
            </li>
        {/each}
    </ul>
    <button type="button" on:click={addCharacter}>Add New</button>
</aside>
