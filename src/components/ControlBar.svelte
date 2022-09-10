<script type="ts">
  import { openModal } from "svelte-modals";
  import {
    ArrowUp,
    DragHandleVertical,
    Exit,
    Gear,
    HamburgerMenu,
  } from "radix-icons-svelte";
  import GetBetter from "./GetBetter.svelte";

  const openGetBetter = () => openModal(GetBetter);
</script>

<nav>
  <button type="button" on:click={openGetBetter}>
    <ArrowUp /><span> Level Up</span>
  </button>
</nav>

<style></style>
