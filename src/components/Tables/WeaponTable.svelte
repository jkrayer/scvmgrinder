<script>
    import RollButton from '../Buttons/RollButton.svelte';
    import RadioGroup from '../Form/RadioGroup.svelte';
    import { handleTableRoll } from '../../lib/dom';
    import { getDie } from '../../lib'

    export let title = '';
    export let hasScroll = false;
    export let options = [];
    export let settings = {
      roll: "1d10",
      exception: "1d6"
    };

    const name = title.toLowerCase();

    $: rollDie = getDie(settings.roll);
    $: exceptionDie = !settings.exception ? -1 : getDie(settings.exception);
    $: diceString = !settings.exception ? settings.roll : hasScroll ? settings.exception : settings.roll;
    $: disable = exceptionDie > -1 && hasScroll ? exceptionDie : rollDie;
</script>

<fieldset>
    <legend>
        {title} d{rollDie} {exceptionDie > -1 ? `(d${exceptionDie} if you have a scroll)` : ''}
    </legend>
    <RollButton
        diceString={diceString}
        onRoll={handleTableRoll(name)}
    />
    <RadioGroup
        name={name}
        options={options}
        disable={disable}
    />
</fieldset>
