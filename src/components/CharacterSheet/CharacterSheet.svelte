<script>
    import { isEmpty } from 'ramda';
	import character from '../../stores/Character';
    import Scores from './Scores.svelte';
    import Defense from '../Defense.svelte';
    import Miseries from './Miseries.svelte';
    import Omens from '../Omens.svelte';
    import Powers from '../Powers.svelte';
    import ArmorWorn from '../ArmorWorn.svelte';
    import WeaponsCarried from '../WeaponsCarried.svelte';
    import Equipment from '../Equipment.svelte';
    import Header from './Header.svelte';
    import { roll } from '../../lib';
    import SlideIn from '../SlideIn.svelte';

    $: showOmens = false;
    $: console.log(17, showOmens)
</script>

{#if !isEmpty($character)}
<article>
    <Miseries />
    <Header />
    <Scores />
    <!-- <Defense /> -->
    <!-- <HitPoints /> -->
    <div class="row-padded">
        <div>
            <button
                type="button"
                class="b"
                disabled={$character?.omens?.current === 0}
                on:click={() => showOmens = !showOmens}
            >
                Omens ({$character?.omens?.current})
            </button>
        </div>
        <div>
            <button type="button" class="b">Powers</button>
        </div>
        <div>
            <button type="button" disabled class="b">Rest</button>
        </div>
        <div>
            <button type="button" disabled class="b">Get Better</button>
        </div>
        
    </div>
    <!--  -->
    <ArmorWorn />
    <WeaponsCarried />
    <!--
    <Powers /> -->
    <div>Silver: {$character.silver}</div>
    <Equipment />
    <Omens show={showOmens} onClose={() => showOmens = false} />
</article>   
{/if}

<style>
    .b {
        width: 100%;
    }
</style>