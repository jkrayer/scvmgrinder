<script>
  import Character from "../../stores/Character";
  import Header from "./Header.svelte";
  import Scores from "./Scores.svelte";
  import Equipment from "./Equipment.svelte";
  import HitPoints from "../HitPoints.svelte";
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
    console.log(27, data);
    loading = data.loading;
    character = data.character;
    weapons = getWeapons(data.character);
    armor = getArmor(data.character);
    scrolls = getScrolls(data.character);
    // canUsePowers = hasScrolls(data.data);
  });
</script>

<!-- 24vw -->
{#if !loading}
  <article>
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
          current={character.powers}
          presence={character.abilities.presence}
        />
      {/if}
      <Omens {...character.omens} onSet={Character.setOmens} />
    </div>
    {#if character.status.length > 0}
      <h2>Status</h2>
      <ul>
        {#each character.status as status}
          <li><b>{status.name}</b> {status.description}</li>
        {/each}
      </ul>
    {/if}
    <Equipment equipment={character.equipment} silver={character.silver} />
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
