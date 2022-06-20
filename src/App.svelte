<script lang="ts">
  import { onMount } from "svelte";
  import CharacterSheet from "./components/CharacterSheet/CharacterSheet.svelte";
  import MessageComponent from "./components/MessageService/MessageComponent.svelte";
  import game from "./stores/Campaign";

  let campaignData = {};

  onMount(() => {
    game.subscribe((data) => {
      console.log("getting data", data);
      campaignData = data;
    });
  });
</script>

<main id="app">
  <header id="global-header" class="theme-magenta row row-polar">
    <h1>SCVUMGRINDER</h1>
  </header>
  <div id="stage">
    <div class="stage-column">
      <CharacterSheet />
    </div>
    <div class="stage-column stage-column_campaign" />
    <MessageComponent />
  </div>
  <footer id="global-footer" class="theme-black">
    <p>
      Scvmgrinder is an independent production by James Krayer and is not
      affiliated with Ockult Örtmästare Games or Stockholm Kartell. It is
      published under the MÖRK BORG Third Party License.
    </p>
    <p>MÖRK BORG is copyright Ockult Örtmästare Games and Stockholm Kartell.</p>
    <p>
      <a href="https://github.com/jkrayer/scvmgrinder">GitHub</a> |
      <a href="https://morkborg.com/">MÖRK BORG</a>
    </p>
  </footer>
</main>

<style>
  #stage {
    box-sizing: border-box;
  }
</style>
