<script>
  import { Tabs, Text, Title, TypographyProvider } from "@svelteuidev/core";
  import Character, { updateHp } from "../../../stores/Character";
  import Header from "../Header.svelte";
  import Portrait from "../Portrait.svelte";
  import Scores from "./Scores.svelte";
  import Equipment from "./Equipment.svelte";
  import HitPoints from "../HitPoints.svelte";
  import Weapons from "../Weapons.svelte";
  import Armor from "../ArmorWorn.svelte";
  import Powers from "../Powers.svelte";
  import Omens from "../Omens.svelte";
  import {
    getWeapons,
    getArmor,
    getScrolls,
    // hasScrolls,
    hasPowers,
  } from "../../../lib";
  import { setAttacker, setDamager } from "../../../Combat/Attack";

  let character = {};
  let loading = true;
  let weapons = [];
  let armor = {};
  let scrolls = [];
  // let canUsePowers = false;

  Character.subscribe((data) => {
    loading = data.loading;
    character = data.character;
    weapons = getWeapons(data.character);
    armor = getArmor(data.character);
    scrolls = getScrolls(data.character);
    // canUsePowers = hasScrolls(data.data);
  });

  //
  const handleAttack = ({ detail }) => setAttacker(character, detail);
  const handleDamage = ({ detail }) => setDamager(character, detail);
</script>

<!-- 24vw -->
{#if !loading}
  <article id="character-sheet">
    <Header name={character.name} className={character.class.name}>
      <Portrait
        alt={character.name}
        src={character.class.image}
        slot="portrait"
      />
      <!-- <HitPoints {...character.hitpoints} onSet={updateHp} /> -->
    </Header>
    <Tabs>
      <Tabs.Tab label="Main">
        <div>
          <Scores scores={character.abilities} tests={character.tests} />
          <Weapons
            {weapons}
            on:attack={handleAttack}
            on:damage={handleDamage}
          />
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
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Equipment">
        <Equipment equipment={character.equipment} silver={character.silver} />
      </Tabs.Tab>
      <Tabs.Tab label="Class">
        <div class="character-sheet-tab-wrapper">
          <h2 class="character-sheet-heading">Class Abilities</h2>
          {@html character.class.abilities}
          <h2 class="character-sheet-heading">Description</h2>
          {@html character.description}
        </div>
      </Tabs.Tab>
    </Tabs>
  </article>
{/if}

<style>
  #character-sheet {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    border: 1px solid #222;
    box-shadow: 0.5rem 0.5rem 1rem 0 rgba(100, 100, 100, 0.2);
  }
</style>
