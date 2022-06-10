<script>
  export let canUse = false;
  export let current = 0;
</script>

<div>
  <p>Powers: (1d4/day); current ({current})</p>
  <p>
    Presence Test DR12. Success, the power is activated. Failure, take d2 points
    of damage and you are dizzy for the next hour. Powers can not be used during
    this time.
  </p>
  <p>Available Powers {current === 0 ? ": none" : ":"}</p>
  <button
    >Roll Prsence test, if successful onlock scrolls and enable thir effects,
    oin fail closse and take damage.</button
  >
</div>
