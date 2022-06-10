<script>
  export let current = 0;
  export let die = 4;
</script>

<div>
  Omens: ({die}/day); current ({current})
  <p>Use omens to</p>
  <ul>
    <li>deal maximum damage with one attack</li>
    <li>reroll, your dice or someone else's</li>
    <li>lower damage dealt to you by 1d6</li>
    <li>neutralize a crit or a fumble</li>
    <li>lower one test by DR -4</li>
  </ul>
  <!-- <button type="button" on:click={handleUse}>Use</button>
  <button type="button" on:click={onClose}>Cancel</button> -->
</div>
