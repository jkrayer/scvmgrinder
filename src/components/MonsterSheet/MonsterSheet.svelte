<script lang="ts">
  import type { TrackerMonster } from "../../global";
  import Header from "../Sheets/Header.svelte";
  import HitPoints from "../HitPoints.svelte";
  import ArmorWorn from "../ArmorWorn.svelte";
  import WeaponsCarried from "../WeaponsCarried.svelte";

  export let monster: TrackerMonster;
</script>

<article class="monster-sheet">
  <Header name={monster.name}>
    <HitPoints {...monster.hitpoints} onSet={() => {}} />
  </Header>
  <ArmorWorn armor={monster.armor} />
  <WeaponsCarried weapons={monster.weapons} />
  <div>
    <h2>Description</h2>
    {@html monster.description}
  </div>
</article>
