<script type="ts">
  import type { AbilityScores } from "./type";

  export let abilityScores: AbilityScores = {
    agility: 0,
    presence: 0,
    strength: 0,
    toughness: 0,
  };

  $: scores = Object.entries(abilityScores);
</script>

{#each scores as [key, value]}
  <div class="field">
    <div class="field-label">{key}</div>
    <div><button>Test</button></div>
    <span>{value}</span>
  </div>
{/each}

<style>
  .field {
    padding: var(--small-padding);
    margin-bottom: var(--small-padding);
    color: var(--black);
    background-color: var(--white);
  }
  .field-label {
    display: inline;
    font: 400 1.5rem/1 var(--handwriting);
  }
  .h2 {
    display: inline;
    font-family: var(--fixed);
  }
</style>
