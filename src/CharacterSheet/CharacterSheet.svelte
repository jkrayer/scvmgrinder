<script lang="ts">
  import CharacterStore, {
    update,
    EquippedWeapons,
    EquippedArmor,
  } from "./store";
  import { incrementHp, useOmen, incrementSilver } from "./lib";
  import Powers from "./Powers.svelte";
  import HitPoints from "./HitPoints.svelte";
  import AbilityScores from "./AbilityScores.svelte";
  import Omens from "./Omens.svelte";
  import Weapons from "./Weapons.svelte";
  import Armor from "./Armor.svelte";
  import Equipment from "./Equipment.svelte";
  import Silver from "./Silver.svelte";
  import MorkBorgLogo from "../components/MorkBorgLogo.svelte";
  import equipment from "../data/equipment";

  // HP
  const incremenet = () => update(incrementHp(1));
  const decrement = () => update(incrementHp(-1));
  const useomen = () => update(useOmen());
  const updateSilver = ({ detail }: CustomEvent<number>) =>
    update(incrementSilver(detail));
</script>

<article id="character-sheet">
  <!-- <MorkBorgLogo /> -->
  <div class="character-sheet-col">
    <header>
      <div class="character-sheet-field character-sheet-ko">
        <div
          id="name-label"
          class="character-sheet-field-label character-sheet-ko"
        >
          Name:&nbsp;
        </div>
        <h1
          class="character-sheet-title character-sheet-ko"
          aria-labelledby="name-label"
        >
          {$CharacterStore.name}
        </h1>
      </div>
    </header>
    <div class="character-sheet-field">
      <h2 class="character-sheet-field-label">Description:</h2>
      <div class="character-sheet-copy">
        {@html $CharacterStore.description}
      </div>
    </div>
    <div class="character-sheet-field">
      <div id="name-class" class="character-sheet-field-label">Class:</div>
      <h2 class="character-sheet-title" aria-labelledby="class-label">
        {$CharacterStore.class.name}
      </h2>
      <div class="character-sheet-copy" aria-labelledby="class-label">
        {@html $CharacterStore.class.abilities}
      </div>
    </div>
    <Powers scrolls={[]} powers={$CharacterStore.powers} />
  </div>
  <div class="character-sheet-col1">
    <HitPoints
      {...$CharacterStore.hitpoints}
      on:increment={incremenet}
      on:decrement={decrement}
    />
    <AbilityScores abilityScores={$CharacterStore.abilities} />
    <Omens {...$CharacterStore.omens} on:use:omen={useomen} />
  </div>
  <div class="character-sheet-col">
    <Weapons weapons={$EquippedWeapons} />
    <Armor {...$EquippedArmor} />
    <Equipment equipment={$CharacterStore.equipment} />
    <Silver silver={$CharacterStore.silver} on:setSilver={updateSilver} />
  </div>
</article>
