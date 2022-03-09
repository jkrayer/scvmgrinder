<script>
    import { prop } from 'ramda';

    export let options = [{ value: -1, label: 'Select One' }];
    export let getValue = prop('value');
    export let getLabel = prop('label');
    export let disable = -1;
    export let name;
</script>

{#each options as o, index}
    <label key={index}>
        <input
            type="radio"
            {name}
            value={getValue(o)}
            disabled={disable > -1 && index >= disable}
        > {getLabel(o)}
    </label>
{/each}
