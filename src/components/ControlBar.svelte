<script type="ts">
  import { getAllContexts } from "svelte";
  import { navigate } from "svelte-routing";
  import { openModal } from "svelte-modals";
  import {
    ArrowUp,
    Cross1,
    Exit,
    HamburgerMenu,
    Target,
  } from "radix-icons-svelte";
  import Button from "./Button.svelte";
  import GetBetter from "./GetBetter.svelte";
  import DiceRoller from "./DiceRoller/DiceRoller.svelte";
  import { addMessage } from "../Messages/state/MessageStore";
  import { diceMessage } from "../Messages/lib";

  const noop = () => {};

  let open: boolean = false;
  $: text = open ? "Close" : "Open";
  let path: string = "";

  getAllContexts().forEach(function (key, value) {
    const sub = key.subscribe || noop;

    sub(function ({ pathname }) {
      path = pathname;
    });
  });

  // Helpers
  let close = () => (open = false);

  const openGetBetter = () => {
    close();
    openModal(GetBetter);
  };

  // Handlers
  const onRoll = ({ detail: { sum, formula } }: CustomEvent<RollObject>) =>
    addMessage(diceMessage("", formula, sum, ""));
</script>

<nav class="navigation" class:open>
  <div>
    <div class="navigation-item">
      <Button stretch on:click={() => (open = !open)} title={`${text} Menu`}>
        {#if open}
          <Cross1 slot="iconLeft" />
        {:else}
          <HamburgerMenu slot="iconLeft" />
        {/if}
      </Button>
    </div>
    <div class="navigation-item">
      <Button
        stretch
        on:click={() => navigate("/")}
        title="Exit: Back to Home"
        disabled={path === "/"}
      >
        <Exit slot="iconLeft" /> Exit
      </Button>
    </div>
    <div class="navigation-item">
      <Button
        stretch
        on:click={openGetBetter}
        title="Level Up"
        disabled={path === "/"}
      >
        <ArrowUp slot="iconLeft" /> Level Up
      </Button>
    </div>
  </div>
  <div>
    <DiceRoller on:roll={onRoll} disabled={path === "/"} />
  </div>
</nav>

<style>
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2rem;
    height: 100vh;
    /* overflow: hidden; */
    background-color: var(--black);
    transition: width 0.25s ease-in-out;
  }
  .navigation.open {
    width: 15ex;
  }
  .navigation-item {
    padding: var(--small-padding);
    border-bottom: 1px solid #444;
    white-space: nowrap;
  }
</style>
