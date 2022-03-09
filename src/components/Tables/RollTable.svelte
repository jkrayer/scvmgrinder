<script>
    import RollButton from '../Buttons/RollButton.svelte';
    import RadioGroup from '../Form/RadioGroup.svelte';
    import { handleTableRoll } from '../../lib/dom';

    export let title = "";
    export let diceString = "";
    export let name = "";
    export let matches = {};
    export let options = [];
    export let disable = -1;
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
        disable={disable}
    />
</fieldset>