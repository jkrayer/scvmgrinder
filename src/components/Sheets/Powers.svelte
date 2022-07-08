<script>
  import Character from "../stores/Character";
  import Modal from "./Modal.svelte";
  import RollButton from "./Buttons/RollButton.svelte";
  import { sign, roll } from "../lib";
  import { DIZZY } from "../lib/gameConstants";
  // import { setEffects } from "../lib/gameData";

  export let scrolls = [];
  export let current = 0;
  export let presence = 0;

  let visible = false;
  let disabled = current < 1 && scrolls.length < 1;

  const open = () => (visible = true);
  const close = () => (visible = false);
  const handleRoll = (scroll) => (rolled) => {
    if (rolled >= 12) {
      alert(`${rolled} Success!`);
      Character.useScroll(scroll);
      close();
    } else {
      alert(`${rolled} Failure!\n${DIZZY.description}`);
      // TODO: Batching to reduce round trips
      // Idea 1. a function called all like All([Methods], [Values])
      //         this supposes a refactor of Character dot methods to be data transformations
      // Idea 2. Again refactoring Character. methods to transform data but queueing the data
      //         I'm thinking something like nextCharacter = updateHp(-3); setTimeout(sendToServer, 0)
      //         so the update wont be set until the main loop is idle give the programe time to run
      //         multiple update on nextCharacter...
      // This or these might be early optimizations
      Character.updateHp(-roll(2));
      Character.setStatus(DIZZY);
      close();
    }
  };
</script>

<!-- TODO: Scrolls will never work when wielding zweihand weapons or medium/heavy armor. -->
<div>
  <button type="button" {disabled} on:click={open}>
    Powers: (1d4{sign(presence)}/day); current ({current})
  </button>

  <Modal {visible} onClose={close}>
    <p class="small">
      Presence Test DR12. Success, the power is activated. Failure, take d2
      points of damage and you are dizzy for the next hour. Powers can not be
      used during this time.
    </p>
    <ul>
      {#each scrolls as scroll}
        <li>
          <b>{scroll.name}</b>: {scroll.description}
          <RollButton
            diceString={`1d20${sign(presence)}`}
            onRoll={handleRoll(scroll)}
            disabled={current === 0}>Test</RollButton
          >
        </li>
      {/each}
    </ul>
    <div><button type="button" on:click={close}>Cancel</button></div>
  </Modal>
</div>

<style>
  .small {
    font-size: 0.75em;
  }
</style>
