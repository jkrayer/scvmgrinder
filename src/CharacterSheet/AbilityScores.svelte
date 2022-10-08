<script type="ts">
  import { toPairs } from "ramda";
  import CharacterStore from "./store";
  import { addMessage } from "../Messages/state/MessageStore";
  import { testMessage } from "../Messages/lib";
  import Button from "../components/Button.svelte";

  const handleAbilityTest = (score: string, modifier: number) => () =>
    addMessage(testMessage({ score, modifier, name: $CharacterStore.name }));
</script>

<div class="grid  grid-limit">
  {#each toPairs($CharacterStore.abilities) as [key, value]}
    <div class="flex-center">
      <Button on:click={handleAbilityTest(key, value)}>
        <div class="score-title">{key}</div>
        <span class="score">{value}</span>
      </Button>
    </div>
  {/each}
</div>

<style>
  .grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .score-title {
    font: 400 1.5rem/1 var(--handwriting);
  }
  .score {
    font-size: 1.25rem;
  }
</style>
