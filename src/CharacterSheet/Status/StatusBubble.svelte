<script lang="ts">
  import { Cross1 } from "radix-icons-svelte";
  import { closeModal } from "svelte-modals";
  import { fly } from "svelte/transition";

  export let status: Status;
  export let onClose: () => void = () => {};

  const handleClose = () => {
    closeModal();
    onClose();
  };
</script>

<div
  class="status-bubble"
  transition:fly={{ x: 0, y: -500 }}
  role="dialog"
  aria-modal="true"
  aria-describedby="modal-body"
>
  <div class="status-title-wrapper" id="modal-body">
    <h3 class="status-title">{status.name}</h3>
    <button
      type="button"
      class="button close-button"
      on:click={closeModal}
      title="Close"><Cross1 size={16} /></button
    >
  </div>
  <div class="body-wrapper">{@html status.description}</div>
  {#if status.canCancel}
    <div class="footer">
      <button
        type="button"
        class="button end-button"
        title="End Efffect"
        on:click={handleClose}>End</button
      >
    </div>
  {/if}
</div>

<style>
  .status-bubble {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    padding: var(--small-padding);
    font-family: var(--fixed);
    background-color: yellow;
    color: #000;
    transform: translate3d(calc(50vw - 50%), calc(50vh - 50%), 0);
  }
  .status-title-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .status-title-wrapper,
  .body-wrapper {
    margin: calc(var(--small-padding) * 2) 0;
  }
  .status-title {
    margin: 0;
  }
  .footer {
    text-align: right;
  }
  .end-button {
    padding: var(--small-padding);
    font-size: 1.25em;
    font-weight: bold;
    transform: rotate(-3deg);
  }
  .close-button {
    position: relative;
    top: -10px;
    width: 32px;
    height: 32px;
    padding: var(--small-padding);
    border-radius: 50%;
  }
  .end-button:active,
  .close-button:active {
    background-color: magenta;
  }
</style>
