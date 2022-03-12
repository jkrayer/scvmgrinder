<script>
    import character from '../../stores/Character';
    import RollButton from '../Buttons/RollButton.svelte';
    import { symbol } from '../../lib';

    const SCORES = ['strength', 'agility', 'presence', 'toughness'];

    const { tests, abilities } = $character

    const alertRoll = (dr, score) => (roll) => {
        const total = roll + score;
        const hit = total >= dr ? 'Hits' : 'Misses';

        alert(`D20 ${roll} + ${score} = ${total}; ${hit} DR${dr}`);
    }
</script>

<div class="row-padded">
    {#each SCORES as score }
    <div class="score-wrapper">
        <div class="score-name">
            {score}
        </div>
        <div class="score">
            {symbol(abilities[score])}
        </div>
        <RollButton
            diceString="1d20"
            onRoll={alertRoll(tests[score], abilities[score])}
        >
            test {tests[score]}
        </RollButton>
        {#if score === "strength"}
        <RollButton
            diceString="1d20"
            onRoll={alertRoll(tests.melee, abilities[score])}
        >
            melee {tests.melee}
        </RollButton>
        {:else if score === "agility"}
        <RollButton
            diceString="1d20"
            onRoll={alertRoll(tests.defence, abilities[score])}
        >
            defense {tests.defence}
        </RollButton>
        {:else if score === "presence"}
        <RollButton
            diceString="1d20"
            onRoll={alertRoll(tests.ranged, abilities[score])}
        >
            ranged {tests.ranged}
        </RollButton>
        {/if}
    </div>
    {/each}
</div>

<style>
    .score-wrapper {
        display: flex;
        flex-direction: column;
        margin: 0.5em 0 0;
        text-align: center;
    }
</style>
