<script>
  import Character from "../../stores/CharacterSocket";
  import Header from "./Header.svelte";
  import HitPoints from "../HitPoints.svelte";
  import Scores from "./Scores.svelte";
  import Weapons from "../WeaponsCarried.svelte";
  import Armor from "../ArmorWorn.svelte";
  import Powers from "../Powers.svelte";
  import Omens from "../Omens.svelte";
  import {
    getWeapons,
    getArmor,
    getScrolls,
    // hasScrolls,
    hasPowers,
  } from "../../lib";

  let character = {};
  let loading = true;
  let weapons = [];
  let armor = {};
  let scrolls = [];
  // let canUsePowers = false;

  Character.subscribe((data) => {
    loading = data.loading;
    character = data.data;
    weapons = getWeapons(data.data);
    armor = getArmor(data.data);
    scrolls = getScrolls(data.data);
    // canUsePowers = hasScrolls(data.data);
  });
</script>

<!-- 24vw -->
{#if !loading}
  <article style="width:460px;">
    <Header name={character.name} className={character.class.name}>
      <HitPoints {...character.hitpoints} onSet={Character.updateHp} />
    </Header>
    <Scores scores={character.abilities} tests={character.tests} />
    <Weapons abilities={character.abilities} {weapons} />
    <Armor {...armor} agility={character.abilities.agility} />
    <div>
      {#if hasPowers(character)}
        <Powers
          {scrolls}
          {...character.powers}
          presence={character.abilities.presence}
        />
      {/if}
      <Omens {...character.omens} onSet={Character.setOmens} />
    </div>
    <h2>Equipment</h2>
    <ul>
      {#each character.equipment as e}
        <li>{e.name || e}</li>
      {/each}
      <li>Silver: {character.silver}</li>
    </ul>
    <div>
      <h2>Class Abilities</h2>
      {@html character.class.abilities}
    </div>
    <div>
      <h2>Description</h2>
      {@html character.description}
    </div>
  </article>
{/if}
