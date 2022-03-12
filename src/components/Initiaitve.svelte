<script>
    import character from '../stores/Character'
    import { rollFormula } from '../lib'

    const { abilities } = $character;

    // Handlers
    const handleRoll = () => $character.initiative = rollFormula([1, 'd', 6, '+', abilities.agility])
</script>

<div class="initiative row" on:click={handleRoll}>
    <div>
        <div class="score-name">
            <abbr title="Initiative">Init</abbr>
        </div>
        <div
            class="score"
        >
          {$character.initiative || 0}
        </div>
    </div>
</div>

<style>
.initiative {
    text-align: center;
    padding: var(--small-padding);
}
</style>
