<script lang="ts">
  import CharacterStore, {
    update,
    EquippedWeapons,
    EquippedArmor,
  } from "./store";
  import { addMessage } from "../Messages/state/MessageStore";
  import { incrementSilver, equipmentTier, getAbilityScore } from "./lib";
  import { attackMessage, damageMessage, armorMessage } from "../Messages/lib";
  import type { CharacterType, Weapon, Armor as ArmorType } from "./type";
  import Header from "./Header.svelte";
  import { Violence } from "./enums";
  import Powers from "./Powers.svelte";
  import AbilityScores from "./AbilityScores.svelte";
  import Weapons from "./Weapons.svelte";
  import Armor from "./Armor.svelte";
  import Equipment from "./Equipment.svelte";
  import Silver from "./Silver.svelte";
  import Miseries from "./Miseries.svelte";
  import MorkBorgLogo from "../components/MorkBorgLogo.svelte";
  import DiceRoller from "./DiceRoller.svelte";

  // HANDLERS

  const updateSilver = ({ detail }: CustomEvent<number>): void =>
    update(incrementSilver(detail));

  const handleChangeTier = ({
    detail,
  }: CustomEvent<{ newTier: number; armor: ArmorType }>): void => {
    const { newTier, armor } = detail;
    update(equipmentTier(armor, newTier));
  };

  const handleAttack = ({ detail }: CustomEvent<Weapon>): void =>
    addMessage(
      attackMessage(
        detail,
        $CharacterStore.name,
        getAbilityScore(
          $CharacterStore as CharacterType,
          Violence[detail.subType]
        )
      )
    );

  const handleDamage = ({ detail }: CustomEvent<Weapon>): void =>
    addMessage(damageMessage(detail, $CharacterStore.name));

  const handleArmorTier = ({
    detail,
  }: CustomEvent<{ tier: number; shield: boolean }>): void =>
    addMessage(armorMessage({ ...detail, name: $CharacterStore.name }));
</script>

<article>
  <Header />
  <AbilityScores />
  <!-- Violence -->
  <div class="grid">
    <Weapons
      weapons={$EquippedWeapons}
      on:attack={handleAttack}
      on:damage={handleDamage}
    />
    <Armor
      {...$EquippedArmor}
      on:tier={handleArmorTier}
      on:change:tier={handleChangeTier}
    />
    <Powers />
  </div>
  <Equipment />
  <div class="grid">
    <!-- <Silver silver={$CharacterStore.silver} on:setSilver={updateSilver} /> -->
    <Miseries bind:miseries={$CharacterStore.miseries} />
  </div>
</article>

<DiceRoller name={$CharacterStore.name} />
