<script lang="ts">
  import { openModal } from "svelte-modals";
  import { deleteCharacter } from "../lib/db";
  import ListItem from "./ListItem.svelte";
  import CreateCharacterForm from "../CharacterCreationFrom/CreateCharacterForm.svelte";
  import { update } from "../CharacterSheet/store";
  import Button from "../components/Button.svelte";

  export let characters: CharacterType[];

  // HANDLERS
  const play = (character: CharacterType) => () => update(() => character);
  const handleDelete = (character: CharacterType) => () =>
    confirm(`Delete ${character.name}`) ? deleteCharacter(character) : null;

  const newCharacter = () => openModal(CreateCharacterForm, {});
</script>

<ul id="character-list" class="list-clear flex">
  <ListItem name="Name" klass="class">
    <Button buttonColor="yellow" on:click={newCharacter}>Add</Button>
  </ListItem>
  {#each characters as character}
    <ListItem name={character.name} klass={character.class.name}>
      <Button buttonColor="magenta" on:click={handleDelete(character)}
        >Delete</Button
      >
      <Button buttonColor="yellow" on:click={play(character)}>Play</Button>
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
