<script lang="ts">
  import type { TrackerMonster } from "../../../global";
  import Header from "../Header.svelte";
  import HitPoints from "../HitPoints.svelte";
  import Armor from "./Armor.svelte";
  import Weapons from "../Weapons.svelte";
  import Description from "../Description.svelte";
  import { setAttacker, setDamager } from "../../../Combat/Attack";

  export let monster: TrackerMonster;

  //
  const handleAttack = ({ detail }) => setAttacker(monster, detail);
  const handleDamage = ({ detail }) => setDamager(monster, detail);
</script>

<article class="monster-sheet">
  <Header name={monster.name}>
    <HitPoints {...monster.hitpoints} onSet={() => {}} />
  </Header>
  <div class="monster-sheet_body">
    {#if monster.armor}
      <Armor armor={monster.armor} />
    {/if}
    <Weapons
      weapons={monster.weapons}
      on:attack={handleAttack}
      on:damage={handleDamage}
    />
    {#if monster.description}
      <Description description={monster.description} />
    {/if}
  </div>
</article>

<style>
  .monster-sheet {
    background-color: #fff;
    /* box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1); */
  }
  .monster-sheet_body {
    padding: 0.25rem;
    border: 1px solif #333;
    border-top: none;
  }
</style>
