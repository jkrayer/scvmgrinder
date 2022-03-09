<script>
    import { identity } from 'ramda';
    import RollButton from '../Buttons/RollButton.svelte';
    import RadioGroup from '../Form/RadioGroup.svelte';
    import { handleTableRoll } from '../../lib/dom';

    export let title = "";
    export let diceString = "";
    export let name = "";
    export let matches = {};
    export let options = [];
    
</script>

<fieldset>
    <legend>{title}</legend>
    <RollButton
        diceString={diceString}
        onRoll={handleTableRoll(name, matches)}
    />
    <RadioGroup
        options={options}
        name={name}
        getValue={identity}
        getLabel={identity}
    />
</fieldset>