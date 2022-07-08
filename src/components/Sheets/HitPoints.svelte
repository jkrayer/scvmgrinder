<script>
  export let current = 0;
  export let maximum = 0;
  export let onSet = () => {};

  let num = 0;

  const handleSubmit = () => {
    onSet(num);
    num = 0;
  };
</script>

<div class="hitpoint-wrapper">
  <div class="left-col">
    <p class="title">Hit Points</p>
    <p class="hp">{current} / {maximum}</p>
  </div>
  <form class="form" on:submit|preventDefault={handleSubmit}>
    <!-- <button type="submit" class="button damage" data-type="damage"
      >Damage</button
    > -->
    <label for="id-field" class="hidden-field">Adjust Hit Points</label>
    <input type="number" id="hp-field" bind:value={num} size="2" />
    <button
      type="submit"
      class={num > -1 ? "button heal" : "button damage"}
      disabled={num === 0}>{num > -1 ? "Heal" : "Damage"}</button
    >
  </form>
</div>

<style>
  .hitpoint-wrapper {
    display: flex;
    align-items: center;
  }
  .left-col {
    margin-right: 0.625rem;
  }
  .hp,
  .title {
    padding: 0;
    margin: 0;
    text-align: center;
  }
  .title {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 700;
  }
  .hp {
    font-size: 1.75rem;
    font-weight: 500;
  }
  .form {
    display: flex;
    flex-direction: column;
  }
  .hidden-field {
    position: absolute;
    left: 10000in;
  }
  .button {
    border-width: 1px;
    border-style: solid;
    background-color: transparent;
    font-size: 0.5rem;
  }
  .heal {
    border-color: green;
    color: green;
  }
  .damage {
    border-color: red;
    color: red;
  }
  .button:disabled {
    border-color: #bbb;
    color: #bbb;
  }
  #hp-field {
    padding: 0;
  }
</style>
