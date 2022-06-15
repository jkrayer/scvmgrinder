<script>
  export let visible = true;
  export let onClose = () => {};

  const escapeHandler = (e) => (e.key === "Escape" ? onClose() : null);

  $: {
    if (visible) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keyup", escapeHandler);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("keyup", escapeHandler);
    }
  }
</script>

{#if visible}
  <div id="modal-overlay">
    <div id="modal-content">
      <button type="button" id="modal-close" on:click={onClose}>&times;</button>
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
  #modal-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  #modal-content {
    position: absolute;
    max-width: 70ex;
    padding: 1em;
    transform: translate3d(calc(50vw - 50%), calc(50vh - 50%), 0);
    background-color: #fff;
  }

  #modal-close {
    position: absolute;
    top: -0.5em;
    right: -0.5em;
  }
</style>
