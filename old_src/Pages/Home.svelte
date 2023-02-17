<script lang="ts">
  import { onMount } from "svelte";
  import { isEmpty } from "ramda";
  import CharactersStore, {
    replaceCharacters,
  } from "../Stores/CharactersStore";
  import { getCharacters } from "../lib/db";
  import CharacterList from "../CharacterList/CharacterList.svelte";

  onMount(() => {
    getCharacters().then((characters) => replaceCharacters(characters));
  });
</script>

<CharacterList characters={$CharactersStore} />
