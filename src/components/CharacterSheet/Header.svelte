<script>
  import Character from "../../stores/CharacterSocket";
  // import character from "../../stores/Character";
  import HitPoints from "../HitPoints.svelte";

  let character = {};

  Character.subscribe((c) => (character = c.data));
</script>

<div id="character-header" class="theme-black">
  <!-- <img src={$character.img} alt={$character.name} width="55" height="55" /> -->
  <header>
    <h1 class="h1">{character.name || "your mom"}</h1>
    <h2 class="h2">$character.className</h2>
  </header>
  <div class="hp-wrapper">
    <HitPoints />
  </div>
</div>

<style>
  #character-header {
    display: flex;
    align-items: center;
    padding: var(--small-padding);
  }

  .hp-wrapper {
    display: flex;
    justify-content: right;
    flex-grow: 1;
  }

  .h1 {
    width: 150px;
    margin: 0;
    font-family: var(--serif);
    font-size: 1.5rem;
    line-height: 0.8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .h2 {
    margin: 0;
    font-family: var(--serif);
    font-size: 0.875rem;
    line-height: 1;
  }
</style>
