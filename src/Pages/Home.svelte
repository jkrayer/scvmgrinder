<script lang="ts">
  import { onMount } from "svelte";
  import { isEmpty } from "ramda";
  import CharactersStore, { addCharacters } from "../Stores/CharactersStore";
  import { getCharacters } from "../lib/db";
  import CharacterList from "../CharacterList/CharacterList.svelte";

  onMount(() => {
    getCharacters().then((characters) => addCharacters(characters));
  });
</script>

{#if isEmpty($CharactersStore)}
  <h1>Loading...</h1>
{:else}
  <CharacterList characters={$CharactersStore} />
{/if}
