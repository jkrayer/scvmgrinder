<script lang="ts">
  import CharacterSheet from "./CharacterSheet/CharacterSheet.svelte";
  import Messages from "./Messages/Messages.svelte";
</script>

<main id="app">
  <header id="global-header">
    <h1 id="logo">SCVUMGRINDER</h1>
    <span class="tiny-fixed">v0.0.3</span>
    <p class="tiny-fixed space-tiny">A digital character sheet for MÖRK BORG</p>
  </header>
  <CharacterSheet />
  <Messages />
  <footer id="global-footer">
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
