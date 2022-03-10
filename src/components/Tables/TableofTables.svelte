<script>
    import RollTable from './RollTable.svelte';

    export let tables = [];

    $: show = false

    // Handlers
    const toggleTable = (e) => {
        if (e.target.value.startsWith('table:')) {
            show = true;
            return;
        }
        show = false;
    }
</script>

{#each tables as table, index}
    <RollTable {...table} disable={index === 0 || show ? -1 : 0} onRadioChange={toggleTable} />
{/each}