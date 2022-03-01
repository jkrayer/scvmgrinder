<script>
	import character from '../stores/Character'
    import ArmorWorn from './ArmorWorn.svelte'
    import WeaponsCarried from './WeaponsCarried.svelte';
    import Equipment from './Equipment.svelte'
    import Scores from './Scores.svelte'
</script>

<article>
    <header>
        <h1>{$character.name}</h1>
        <h2>{$character.class.name}</h2>
    </header>
    <section>
        <h2>Powers</h2>
        {#each $character.class.powers as power}
            <p>{power}</p>            
        {/each}
    </section>

    <div>Hit Points: {$character.hitpoints.current} / {$character.hitpoints.maximum}</div>
    <Scores />
    <div>Omens: ({$character.omens.current}) Maximum damage, Reroll, –d6 damage, DR –4, No Crit/Fumble</div>
    <WeaponsCarried />
    <ArmorWorn />
    <Equipment />
    <div>Silver: {$character.silver}</div>
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
