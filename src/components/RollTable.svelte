<script>
    import RollButton from './Buttons/RollButton.svelte';
    import RadioGroup from './Form/RadioGroup.svelte';
    import { handleTableRoll } from '../lib/dom';

    export let title = "";
    export let diceString = "";
    export let name = "";
    export let options = [];    

    
</script>

<legend>{title}</legend>
<fieldset>
<RollButton
    diceString={diceString}
    onRoll={handleTableRoll(name)}
/>
<RadioGroup
    options={options}
    name={name}
/>
</fieldset>