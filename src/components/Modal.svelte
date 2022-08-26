<script type="ts">
  import { closeModal } from "svelte-modals";
  import { fly } from "svelte/transition";

  export let visible: boolean = true;
</script>

<!-- aria-labelledby="modal-title" -->
{#if visible}
  <div
    id="modal-content"
    transition:fly
    role="dialog"
    aria-modal="true"
    aria-describedby="modal-body"
  >
    <button
      type="button"
      id="modal-close"
      title="Click or Press Escape to close"
      on:click={closeModal}>&times;</button
    >
    <div id="modal-body">
      <slot>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </slot>
    </div>
  </div>
{/if}

<style>
  #modal-content {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    max-width: 70ex;
    padding: 1em;
    transform: translate3d(calc(50vw - 50%), calc(50vh - 50%), 0);
    background-color: #fff;
    color: #000;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }

  #modal-close {
    position: absolute;
    top: -0.5em;
    right: -0.5em;
  }
</style>
