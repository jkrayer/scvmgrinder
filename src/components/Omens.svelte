<script>
  import Modal from "./Modal.svelte";

  export let current = 0;
  export let die = 4;
  export let onSet = () => {};

  let visible = false;

  const toggle = () => (visible = !visible);
  const handleUse = () => {
    onSet(current - 1);
    toggle();
  };
</script>

<div>
  <button type="button" disabled={current === 0} on:click={toggle}>
    Omens: ({die}/day); current ({current})
  </button>
  <Modal {visible} onClose={toggle}>
    <p>Use omens to:</p>
    <ul>
      <li>deal maximum damage with one attack</li>
      <li>reroll, your dice or someone else's</li>
      <li>lower damage dealt to you by 1d6</li>
      <li>neutralize a crit or a fumble</li>
      <li>lower one test by DR -4</li>
    </ul>
    <div>
      <button type="button" on:click={toggle}>Cancel</button>
      <button type="button" on:click={handleUse}>Use</button>
    </div>
  </Modal>
  <!-- <button type="button" on:click={handleUse}>Use</button>
  <button type="button" on:click={onClose}>Cancel</button> -->
</div>
