<script>
	import character from '../stores/Character';
    import ArmorWorn from './ArmorWorn.svelte';
    import WeaponsCarried from './WeaponsCarried.svelte';
    import Equipment from './Equipment.svelte';
    import Scores from './Scores.svelte';
    import Initiative from './Initiaitve.svelte'
    import HitPoints from './HitPoints.svelte';
    import {roll} from '../lib'
</script>

<article>
    <header>
        <h1 class="h1">{$character.name}</h1>
        <h2 class="h2">{$character.class.name}</h2>
    </header>
    

    

    <div class="row">
        <div class="col">
            <Scores />
        </div>
        <div class="col">
            Defense: <button type="button" title="Defense" on:click={() => alert(roll(20) + $character.abilities.agility)}>d20 + Agility</button>
            <HitPoints />
        </div>
    </div>
    <Initiative />
    <ArmorWorn />
    <WeaponsCarried />
    <!--  Maximum damage, Reroll, –d6 damage, DR –4, No Crit/Fumble -->
    <div>Omens: ({$character.omens.current})</div>
    <section>
        <h2>Powers</h2>
        <!-- <p>Presence DR12, or -d2 HP and no Powers for 1</p> -->
        {#each $character.class.powers as power}
            <p>{power}</p>            
        {/each}
    </section>
    <div>Silver: {$character.silver}</div>
    <Equipment />

    <div>Miseries:
        <button type="button" title="Misery 1">1</button>
        <button type="button" title="Misery 2">2</button>
        <button type="button" title="Misery 3">3</button>
        <button type="button" title="Misery 4">4</button>
        <button type="button" title="Misery 5">5</button>
        <button type="button" title="Misery 6">6</button>
        <button type="button" title="Misery 7">7</button>
    </div>
    <section>
        <h2>Description</h2>
        {@html $character.description}
    </section>
</article>

<style>
    .h1 {
        margin-top: .5em;
        margin-bottom: 0;
        text-align: center;
        font-family: Athelas, Cambria, serif;
        font-size: 2rem;
    }
    .h2 {
        margin-top: 0;
        text-align: center;
        font-family: Athelas, Cambria, serif;
        font-size: 1rem;
    }
    .row {
        display: flex;
    }
    .col {
        flex-basis: 50%;
    }
</style>