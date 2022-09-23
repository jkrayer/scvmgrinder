<script lang="ts">
  import CharacterStore, {
    update,
    EquippedWeapons,
    EquippedArmor,
  } from "./store";
  import { addMessage } from "../Messages/state/MessageStore";
  import { equipmentTier } from "./lib";
  import { damageMessage, armorMessage } from "../Messages/lib";
  import type { Weapon, Armor as ArmorType } from "./type";
  import Header from "./Header.svelte";
  import Powers from "./Powers.svelte";
  import AbilityScores from "./AbilityScores.svelte";
  import Weapons from "./Weapons.svelte";
  import Armor from "./Armor.svelte";
  import Equipment from "./Equipment/Equipment.svelte";
  import Miseries from "./Miseries.svelte";
  import MorkBorgLogo from "../components/MorkBorgLogo.svelte";
  import DiceRoller from "./DiceRoller.svelte";
  import StatusList from "./Status/StatusList.svelte";
  import { attack, defense } from "../lib/character";

  // HANDLERS
  const handleAttack = ({ detail }: CustomEvent<Weapon>): void =>
    // @ts-ignore
    attack($CharacterStore, detail);

  const handleDamage = ({ detail }: CustomEvent<Weapon>): void =>
    // @ts-ignore
    addMessage(damageMessage(detail, $CharacterStore.name));

  const handleDefense = ({ detail }: CustomEvent<Armor>) =>
    // @ts-ignore
    defense($CharacterStore, detail);

  const handleArmorTier = ({
    detail,
  }: CustomEvent<{ tier: number; shield: boolean }>): void =>
    addMessage(armorMessage({ ...detail, name: $CharacterStore.name }));

  const handleChangeTier = ({
    detail,
  }: CustomEvent<{ newTier: number; armor: ArmorType }>): void => {
    const { newTier, armor } = detail;
    // @ts-ignore
    update(equipmentTier(armor, newTier));
  };
</script>

<article>
  <Header />
  <AbilityScores />
  <!-- Violence -->
  <div class="grid grid-limit">
    <Weapons
      weapons={$EquippedWeapons}
      on:attack={handleAttack}
      on:damage={handleDamage}
    />
    <Armor
      {...$EquippedArmor}
      on:defense={handleDefense}
      on:resist={handleArmorTier}
      on:change:tier={handleChangeTier}
    />
    <Powers />
    <StatusList status={$CharacterStore.status} />
  </div>
  <Equipment />
  <div class="grid grid-limit">
    <Miseries bind:miseries={$CharacterStore.miseries} />
  </div>
</article>

<DiceRoller name={$CharacterStore.name} />
