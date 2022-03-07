<script>
    import { partial } from 'ramda';
    import characters, { deleteCharacter } from '../stores/Characters';
    import { setSelected } from '../stores/Character';
    import settings, { setNewCharacter } from '../stores/Settings';

    $: characterArray = $characters.map((characterId) => {
        // This can break when, if this list and the items in storage fall out of sync
        const { id, name} = JSON.parse(localStorage.getItem(`character:${characterId}`) || '{}');

        return { id, name };
    });

    // Handlers 
    const onDeleteCharacter = (id, name) => confirm(`Delete ${name}?`) ? deleteCharacter(id) : null;

    // 
    let selectedId = 0;
    const handleButtonClick = (id) => () => {
        selectedId = id;
        setSelected(id);
    }
</script>

<aside id="sidebar">
    <ul class="list-clear">
        {#each characterArray as {id, name} }
            <li key={id}>
                <button
                    type="button"
                    class={id === selectedId ? 'sidebar-button active' : 'sidebar-button'}
                    on:click={handleButtonClick(id)}
                    on:contextmenu|preventDefault={partial(onDeleteCharacter, [id])}>
                    {name}
                </button>
            </li>
        {/each}
    </ul>
    <button type="button" class="sidebar-button" class:active={$settings.newCharacter} on:click={setNewCharacter}>Add New</button>
</aside>
