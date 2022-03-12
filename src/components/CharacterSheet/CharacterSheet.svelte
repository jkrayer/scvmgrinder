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

    console.log('character', $character)
</script>

{#if !isEmpty($character)}
<article>
    <Miseries />
    <Header />
    <Scores />
    <!-- <Defense /> -->
    <!-- <HitPoints /> -->
    <div class="right">
        <button class="b">Omens</button>
        <button class="b">Powers</button>
        <button>Rest</button>
        <button>Get Better</button>
    </div>
    <!--  -->
    <ArmorWorn />
    <WeaponsCarried />
    <!-- <Omens />
    <Powers /> -->
    <div>Silver: {$character.silver}</div>
    <Equipment />
</article>   
{/if}
