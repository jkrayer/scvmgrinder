<script>
  import { has } from "ramda";
  import Character from "../../stores/CharacterSocket";
  // TODO: Need state mechanism to handle the effect of being encumbered and max items carried
  export let equipment = [];
  export let silver = 0;

  const equippable = has("equipped");
</script>

<h2>Equipment</h2>
<ul id="equipment-list">
  {#each equipment as eq, index}
    <li>
      {#if typeof eq === "string"}
        <div>{eq}</div>
      {:else}
        <div>
          <b>{eq.name}</b>
          {eq.description || ""}
          {#if eq.quantity !== undefined}
            ({eq.quantity})
          {/if}
        </div>
      {/if}
      <div>
        {#if eq.quantity !== undefined}
          <button
            type="button"
            on:click={() => Character.decrementEquipment(index)}
          >
            -</button
          >
        {/if}
        {#if equippable(eq)}
          <button
            type="button"
            on:click={() => Character.toggleEquipment(index)}
            >{eq.equipped ? "U " : "E"}</button
          >
        {/if}
        <button type="button" on:click={() => Character.trashEquipment(index)}
          >T</button
        >
      </div>
    </li>
  {/each}
  <li>Silver: {silver}</li>
</ul>

<style>
  #equipment-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  #equipment-list > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25em;
    height: 3em;
    line-height: 1;
  }
  #equipment-list > li:nth-child(even) {
    background-color: rgba(255, 255, 0, 0.5);
  }
</style>
