<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { Modals, closeModal } from "svelte-modals";
  import Home from "./Pages/Home.svelte";
  import MorkBorg from "./Pages/MorkBorg.svelte";
  import ControlBar from "./components/ControlBar.svelte";

  let url = "";
</script>

<main id="app">
  <header id="global-header">
    <h1 id="logo">SCVUMGRINDER</h1>
    <span class="tiny-fixed">v0.0.5</span>
    <p class="tiny-fixed space-tiny">A digital character sheet for MÖRK BORG</p>
  </header>
  <Router {url}>
    <ControlBar />
    <Route path="/morkborg/:characterid" component={MorkBorg} />
    <Route path="" component={Home} />
  </Router>
  <Modals>
    <div slot="backdrop" class="backdrop" on:click={closeModal} />
  </Modals>
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

<style>
  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
