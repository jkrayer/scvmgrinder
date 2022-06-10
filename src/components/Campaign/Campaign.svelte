<script>
  import { onMount } from "svelte";
  import Campaign from "../../stores/Campaign";

  let campaignData = {};

  onMount(() => {
    Campaign.subscribe(({ data }) => {
      campaignData = data;
    });
  });
</script>

<main id="app">
  <header id="global-header" class="theme-magenta row row-polar">
    <h1>{campaignData.name}</h1>
  </header>
  <slot />
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
  #app {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
  }
</style>
