<script>
    import RollTable from './RollTable.svelte';
    import { getDie } from '../../lib'

    export let title = "";
    export let matches = {};
    export let options = [];
    export let diceString = '';
    export let exception =  false;
    export let exceptionDiceString = "";

    export let name = "";
    export let hasScroll = false;

    $: rollDie = getDie(diceString);
    $: exceptionDie = !!exception ? getDie(exceptionDiceString) : -1;
    $: currentDiceString = !!exception && hasScroll ? exceptionDiceString : diceString;
    $: disable = !!exception && hasScroll ? exceptionDie : rollDie;
    $: composedTitle = `${title} d${rollDie} ${exceptionDie > -1 ? `(d${exceptionDie} if you have a scroll)` : ''}`
</script>

<RollTable
    title={composedTitle}
    diceString={currentDiceString}
    {name}
    {matches}
    {options}
    {disable}
/>
