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

    let showOmens = false;
    let showPowers = false;
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
                on:click={() => showOmens = true}
            >
                Omens ({$character?.omens?.current})
            </button>
        </div>
        <div>
            <button
                type="button"
                class="b"
                disabled={$character?.powers === 0}
                on:click={() => showPowers = true}
            >
                Powers ({$character?.powers || 0})
            </button>
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
    <div>Silver: {$character.silver}</div>
    <Equipment />
    <Omens show={showOmens} onClose={() => showOmens = false} />
    <Powers show={showPowers} onClose={() => showPowers = false } />
</article>   

{/if}

<style>
    .b {
        width: 100%;
    }
</style>