<script lang="ts">
  import { openModal } from "svelte-modals";
  import ListItem from "./ListItem.svelte";
  import CreateCharacterForm from "../CharacterCreationFrom/CreateCharacterForm.svelte";
  import { update } from "../CharacterSheet/store";

  export let characters: CharacterType[];

  // HANDLERS
  const play = (character: CharacterType) => () => update(() => character);

  const newCharacter = () => openModal(CreateCharacterForm, {});
</script>

<ul id="character-list" class="list-clear flex">
  <ListItem name="Name" klass="class">
    <button type="button" on:click={newCharacter} class="">Add</button>
  </ListItem>
  {#each characters as character}
    <ListItem name={character.name} klass={character.class.name}>
      <button type="button" class="">Delete</button>
      <button type="button" class="" on:click={play(character)}>Play</button>
    </ListItem>
  {/each}
</ul>

<style>
  #character-list {
    width: 300px;
    margin: 0 auto;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
  }

  @media only screen and (min-width: 602px) {
    #character-list {
      width: 600px;
    }
  }
  @media only screen and (min-width: 903px) {
    #character-list {
      width: 900px;
    }
  }
</style>
