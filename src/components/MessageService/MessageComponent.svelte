<script lang="ts">
  import type { Message } from "../../global";
  import Messages from "./MessageStore";

  let messages: Message[] = [];

  Messages.subscribe((data) => {
    messages = data.messages;
  });

  const rollTypeClass = (x: string): string =>
    x.toLocaleLowerCase().replace(/\s/g, "-");
</script>

<div id="messages">
  {#each messages as message, index}
    {#if index === 0}
      <div class="message-body">
        <div class="message-body-title">
          <span>{message.message.name}:</span>
          <span
            class={`message-body-title_${rollTypeClass(
              message.message.rollType
            )}`}>{message.message.rollType}</span
          >
        </div>
        <div class="message-body-roll-row">
          <div class="message-body-roll">{message.message.roll}</div>
          <div class="message-body-formula">
            ({message.message.rollFormula})
          </div>
        </div>

        <div class="message-body-target">{message.message.target}: Hit!</div>
      </div>
    {:else}
      <div class="message-body">
        <div class="message-body-title">
          <span>{message.message.name}:</span>
          {message.message.roll}
        </div>
      </div>
    {/if}
  {/each}
</div>

<!--  -->
<style>
  #messages {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    display: flex;
    flex-direction: column-reverse;
  }
  .message-body {
    padding: 1rem;
    border-radius: 0.25rem;
    margin-top: 0.5rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.05em;
    background-color: #303030;
  }
  .message-body-title,
  .message-body-formula,
  .message-body-target {
    font-size: 0.8125rem;
    line-height: 1;
  }
  .message-body-title {
    text-transform: uppercase;
  }
  .message-body-title_to-hit {
    color: #769eff;
  }
  .message-body-title_damage {
    color: red;
  }
  .message-body-title_test {
    color: green;
  }

  .message-body-formula,
  .message-body-target {
    color: #ccc;
  }
  .message-body-formula {
    margin-left: 0.25rem;
    font-weight: 400;
  }
  .message-body-roll {
    padding: 0.125em 0;
    font-size: 1.5rem;
  }
  .message-body-roll-row {
    display: flex;
    align-items: center;
  }
</style>
