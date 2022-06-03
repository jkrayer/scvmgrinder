<script>
  export let onClose = () => {};
  export let result;
  export let message = {
    roll: 0,
    scoreName: "Strength",
    score: 0,
  };

  const handleEsc = (e) => (e.key === "Escape" ? onClose() : null);
</script>

<svelte:window on:keyup={handleEsc} />
{#if result !== null}
  <div class="overlay" on:click={onClose}>
    <button type="button" class="close" on:click={onClose}>&times;</button>
    <div class="die" />
    <div class="roll">
      {result}
    </div>
    <div class="formula">
      {message.formula} ({message.roll}) + {message.scoreName} ({message.score})
    </div>
  </div>
{/if}
<slot />

<style>
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .die {
    position: fixed;
    top: calc(50vh - 50px);
    left: calc(50vw - 50px);
    width: 100px;
    height: 100px;
    background-color: yellow;
    animation: spin 0.4s ease-out;
    box-shadow: 5px 5px 10px rgb(0 0 0 / 15%);
  }

  .roll {
    position: relative;
    z-index: 2;
    font-size: 4rem;
    color: #000;
  }

  .close {
    position: fixed;
    top: calc(50vh - 75px);
    left: calc(50vw + 50px);
    box-sizing: border-box;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    color: #000;
    font-weight: 700;
    background-color: yellow;
  }

  .formula {
    position: fixed;
    top: calc(50vh + 60px);
    padding: 0.25em 0.75em;
    border-radius: 1em;
    font-size: 0.875em;
    font-style: italic;
    color: #000;
    background-color: yellow;
    box-shadow: 5px 5px 10px rgb(0 0 0 / 15%);
  }

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
