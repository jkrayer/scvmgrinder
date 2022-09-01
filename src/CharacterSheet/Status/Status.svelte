<script lang="ts">
  import { CrossCircled } from "radix-icons-svelte";
  import { openModal } from "svelte-modals";
  import { update } from "../store";
  import { deleteStatus } from "../../lib/character/status";
  import StatusBubble from "./StatusBubble.svelte";

  export let status: Status;

  const cancel = () => update(deleteStatus(status));

  const open = () => openModal(StatusBubble, { status, onClose: cancel });
</script>

<button type="button" class="button status-button" on:click={open}>
  {status.name}</button
><!--
-->{#if status.canCancel}
  &nbsp;<button
    type="button"
    class="button dismiss-button"
    title="Dismiss"
    on:click={cancel}><span class="svg"><CrossCircled /></span></button
  >
{/if}

<style>
  .status-button {
    cursor: help;
  }
  .dismiss-button > .svg {
    position: relative;
    top: 2px;
  }
  .status-button,
  .dismiss-button {
    padding: var(--tiny-padding) 0;
  }

  .status-button:active,
  .dismiss-button:active {
    color: #000;
    background-color: yellow;
  }
</style>
