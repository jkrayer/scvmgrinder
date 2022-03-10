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
    export let onRadioChange = () => {}
</script>

<fieldset>
    <legend>{title}</legend>
    <RollButton
        diceString={diceString}
        onRoll={handleTableRoll(name, matches)}
        disabled={disable === 0}
    />
    <RadioGroup
        options={options}
        name={name}
        disable={disable}
        onChange={onRadioChange}
    />
</fieldset>