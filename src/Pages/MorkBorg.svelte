<script lang="ts">
  import { getCharacter } from "../lib/db";
  import { update } from "../CharacterSheet/store";
  import CharacterSheet from "../CharacterSheet/CharacterSheet.svelte";
  import ControlBar from "../components/ControlBar.svelte";
  import Messages from "../Messages/Messages.svelte";

  export let characterid;

  const characterPromise = getCharacter(parseInt(characterid, 10));

  characterPromise.then((x) => update(() => x));
</script>

{#await characterPromise}
  <h1>Loading...</h1>
{:then character}
  <CharacterSheet />
{/await}
<ControlBar />
<Messages />
