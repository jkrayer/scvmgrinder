<script type="ts">
  import { closeModal } from "svelte-modals";
  import { toPairs } from "ramda";
  import Modal from "./Modal.svelte";
  import HpUpdater from "./Form/HpUpdater.svelte";
  import AbilityUpdater from "./Form/AbilityUpdater.svelte";
  import CharacterStore, { update } from "../CharacterSheet/store";
  import { getBetter } from "../lib/character/getBetter";

  let hp: number = $CharacterStore.hitpoints.current;
  let abilityScores: AbilityScores = {
    strength: 0,
    agility: 0,
    presence: 0,
    toughness: 0,
  };

  // HANDLERS
  const handleSubmit = () => {
    update(getBetter(hp, abilityScores));
    closeModal();
  };

  const setScore =
    (name: keyof AbilityScores) =>
    ({ detail }: CustomEvent<number>) =>
      (abilityScores[name] = detail);

  const setHp = ({ detail }: CustomEvent<number>) => (hp = detail);
</script>

<Modal>
  <h2>Get Better</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <HpUpdater
      current={$CharacterStore.hitpoints.current}
      on:newScore={setHp}
    />
    <div class="grid score-grid">
      {#each toPairs($CharacterStore.abilities) as [name, score]}
        <AbilityUpdater {name} {score} on:newScore={setScore(name)} />
      {/each}
    </div>
    <button type="submit">Save</button>
  </form>
</Modal>

<style>
  .score-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
</style>
