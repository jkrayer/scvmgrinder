<script lang="ts">
  import { getCharacters } from "../lib/db";
  import CharacterList from "../CharacterList/CharacterList.svelte";

  let charactersPromise = getCharacters();
</script>

{#await charactersPromise}
  <h1>Loading...</h1>
{:then characters}
  <CharacterList {characters} />
{/await}
