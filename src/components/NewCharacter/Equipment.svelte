<script>
    export let item = {};
    export let onRemove = () => {}
</script>

<fieldset class="eq">
    <h3 class="h3">{item.type}</h3>

    <div class="fields">
    {#if item.type === 'armor'}
    <div>
      <label class="small" for="armor-type">Armor Type</label>
      <!-- svelte-ignore a11y-autofocus -->
      <select class="theme-black-input" id="armor-type" bind:value={item.armorType} autofocus>
          <option value="">Select</option>
          <option value="shield">Shield</option>
          <option value="light">Light Armor</option>
          <option value="medium">Medium Armor</option>
          <option value="heavy">Heavy Armor</option>
      </select>
    </div>
    

    {:else if item.type === 'weapon'}
    <div>
        <label class="small" for="weapon-type">Weapon Type</label>
        <select id="weapon-type" class="theme-black-input" bind:value={item.weaponType}>
            <option value="melee">Melee</option>
            <option value="ranged">Ranged</option>
            <option value="thrown">Thrown</option>
        </select>
    </div>
    <div>
        <label class="small" for="damage">Damage</label>
        <input type="text" id="damage" class="theme-black-input" bind:value={item.damageDie} placeholder="1d6">
    </div>
        {#if item.weaponType === 'ranged'}
            <div>
                <label class="small" for="ammunition-type">Ammunition Type</label>
                <select id="ammunition-type" class="theme-black-input" bind:value={item.ammoType}>
                    <option value="arrow">Arrow</option>
                    <option value="bolt">Bolt</option>
                    <option value="rock">Rock</option>
                </select>
            </div>
            <div>
                <label class="small" for="ammunition-count">Ammunition count</label>
                <input type="number" id="ammunition-count" class="theme-black-input" min="0" max="20" bind:value={item.ammoCount} />
            </div>
        {/if}

    {:else if item.type === 'equipment'}
        <div>
          <label class="small" for="quantity">Quantity</label>
          <input type="number" id="quantity" class="theme-black-input" min="1" max="20" bind:value={item.quantity} />
        </div>
    {/if}

    {#if item.type !== ''}
    <div>
        <label class="small" for="description">Description</label>
        <input type="text" id="description" class="theme-black-input" bind:value={item.description} />
        <button type="button" class="btn" on:click={onRemove} title="Remove Equipment">-</button>
    </div>
    {/if}
</div>
</fieldset>

<style>
.eq {
  position: relative;
  border: none;
  margin: 0;
}

.h3 {
  position: absolute;
  top: 0;
  left: -.5em;
  margin: 0;
  font-family: var(--callig);
  font-size: 4rem;
  line-height: 1;
  color: magenta
}

.fields {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
}

.fields > div {padding: var(--small-padding);}

.btn {
  border: 2px solid #000;
  border-radius: 0;
  color: #000;
  background: yellow;
}
.btn:focus {
  outline: 1px solid yellow;
}

.small {
    font-size: .75em;
}
</style>

