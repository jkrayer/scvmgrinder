<script>
  import Die from './Die.svelte';
  import character from '../stores/Character'
  import { rollFormula } from '../lib'

  const { abilities } = $character;

  let result = null;
  let roll = 1;

  // Handlers
  const handleRoll = () => {
      roll = rollFormula([1, 'd', 6]);
      result = roll + abilities.agility;
      $character.initiative = result;
  }
</script>

<Die
  onClose={() => result = null}
  result={result}
  message={{
    formula: '1d6',
    scoreName: 'Agility',
    score: abilities.agility,
    roll
  }}
>
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
</Die>

<style>
.initiative {
    text-align: center;
    padding: var(--small-padding);
}
</style>
