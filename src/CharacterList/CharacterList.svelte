<script lang="ts">
  import { navigate } from "svelte-routing";
  import { openModal } from "svelte-modals";
  import { deleteCharacter } from "../lib/db";
  import { deleteCharacter as delC } from "../Stores/CharactersStore";
  import ListItem from "./ListItem.svelte";
  import Button from "../components/Button.svelte";
  import CreateCharacterForm from "../CharacterCreationFrom/CreateCharacterForm.svelte";

  export let characters: CharacterType[];

  // HANDLERS
  const play = (path: string) => () => navigate(path);

  const handleDelete = (character: CharacterType) => () =>
    confirm(`Delete ${character.name}`)
      ? deleteCharacter(character).then(delC)
      : null;

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
      <!-- TODO: Do the button todo and then use link(s) from router -->
      <Button buttonColor="yellow" on:click={play(`/morkborg/${character._id}`)}
        >Play</Button
      >
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
