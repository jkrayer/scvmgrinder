<script type="ts">
  import type { Armor } from "../../../global";
  import { isEmpty, isNil, pathOr, propOr } from "ramda";
  import RollButton from "../../Buttons/RollButton.svelte";
  import { sign } from "../../../lib";

  const name = propOr("None", "name");
  const effDescription = pathOr("", ["effect", "description"]);

  export let armor: Armor;
</script>

<div class="armor-wrapper">
  <h2 class="monster-sheet-header">Armor: <span>{armor.name}</span>&nbsp;</h2>
  <div class="armor-buttons">
    <button type="button" disabled={armor.tier.current !== 1}>1</button>
    <button type="button" disabled={armor.tier.current !== 2}>2</button>
    <button type="button" disabled={armor.tier.current !== 3}>3</button>
  </div>
</div>
<div>{JSON.stringify(armor)}</div>

<style>
  .armor-wrapper {
    display: flex;
    padding: 0.25em;
    align-items: center;
  }
  .armor-buttons {
    font-size: 0.75rem;
  }
  .armor-buttons > button {
    width: 1.5rem;
    border-radius: 50%;
  }
</style>
