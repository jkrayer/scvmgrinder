<script lang="ts">
  import { isPlayer } from "./State/User";
  import Toast from "./components/Toasts/Toast.svelte";
  import Header from "./components/Stage/Header.svelte";
  import CharacterSheet from "./components/Sheets/CharacterSheet/CharacterSheet.svelte";
  import MessageComponent from "./components/MessageService/MessageComponent.svelte";
  import AdventurePanel from "./components/AdventurePanel/AdventurePanel.svelte";
  import CombatTracker from "./components/CombatTracker/CombatTracker.svelte";
</script>

<main id="app">
  <Header />
  <Toast />
  <div id="stage">
    {#if isPlayer()}
      <div class="stage-column">
        <CharacterSheet />
      </div>
    {/if}
    <div class="stage-column stage-column_campaign">
      <!-- <CombatTracker /> -->
      <AdventurePanel />
    </div>
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
