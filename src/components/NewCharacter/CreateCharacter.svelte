<script>
    import Equipment from './Equipment.svelte';
    import { addCharacter } from '../../stores/Characters';
    import { formatCharacterData } from '../../lib/formatCharacterData';

    // Helpers
    const ownership = (string) => string.endsWith('s') ? `${string}'` : `${string}'s`

    let eq = '';
    let formData = {
        name: '',
        silver: null,
        food: null,
        abilities: {
          agility: null,
          presence: null,
          strength: null,
          toughness: null
        },
        hitpoints: null,
        tests: {
          agility: 12,
          presence: 12,
          strength: 12,
          toughness: 12,
          melee: 12,
          ranged: 12,
          defense: 12,
        },
        className: null,
        omens: 2,
        desciption: null,
        equipment: []
    };

    // Handlers
    const onSubmit = () => addCharacter(formatCharacterData(formData));

    const addEquipment = () => {
      if (eq === '') return false;
      
      formData.equipment = [...formData.equipment, { type: eq, quantity: 1 }];
      eq = '';
    }

    const handleRemove = (index) => () => formData.equipment = formData.equipment.filter((__dirname, ind) => ind !== index)

    $: console.log(formData, typeof formData.food)
</script>

<div class="theme-black">
  <form
      novalidate
      on:submit|preventDefault={onSubmit}
      id="new-character-form"
  >
  
    <div class="pod">
      <p>
        <label class="hidden" for="name">Name</label>
        <input
          type="text"
          id="name"
          class="theme-black-input"
          bind:value={formData.name}
        /> <span class="calligraphy">emerges from the wastes with a fist full of <label class="inline bigger" for="silver">Silver</label></span>
        <input
            type="number"
            id="silver"
            class="theme-black-input"
            bind:value={formData.silver}
            min="10"
            max="300"
        />,
        <span class="calligraphy"> a waterskin and an amount of <label class="inline bigger" for="food">food</label></span>
        <input
            type="number"
            id="food"
            class="theme-black-input"
            bind:value={formData.food}
            min="1"
            max="4"
        />
      </p>
    </div>
    
    <div class="pod">
      <div>
        <p class="calligraphy">
          The weight of equipment compresses {!!formData.name ? ownership(formData.name) : 'your'} spine.
        </p>
        {#each formData.equipment as eq, i }
          <Equipment item={eq} onRemove={handleRemove(i)} />
        {/each}
        <p class="text-right">
          <select class="theme-black-input calligraphy smaller" bind:value={eq}>
            <option value="">Select</option>
            <option value="armor">Armor</option>
            <option value="weapon">Weapon</option>
            <option value="equipment">Equipment</option>
            <option value="follower">Follower</option>
          </select>
          <button
            type="button"
            class="calligraphy btn"
            on:click={addEquipment}
            title="Add Equipment"
          >+</button>
        </p>
      </div>
    </div>

    <div class="pod">
      <p class="calligraphy">With scant natural abilities</p>
      <div>
        <label for="agility">Agility</label>
        <input
            type="number"
            id="agility"
            class="theme-black-input"
            bind:value={formData.abilities.agility}
            min="-3"
            max="3"
        />
        <label for="presence">Presence</label>
        <input
            type="number"
            id="presence"
            class="theme-black-input"
            bind:value={formData.abilities.presence}
            min="-3"
            max="3"
        />
        <label for="strength">Strength</label>
        <input
            type="number"
            id="strength"
            class="theme-black-input"
            bind:value={formData.abilities.strength}
            min="-3"
            max="3"
        />
        <label for="toughness">Toughness</label>
        <input
            type="number"
            id="toughness"
            class="theme-black-input"
            bind:value={formData.abilities.toughness}
            min="-3"
            max="3"
        />
        <label for="hitpoints">Hit Points</label>
        <input
            type="number"
            id="hitpoints"
            class="theme-black-input"
            bind:value={formData.hitpoints}
            min="1"
            max="20"
        />
      </div>
    </div>
  
      <div class="pod">
        <div>
          <span class="calligraphy">tests</span>        
          <div class="r">
            <div>
                <label for="agility-test">Agility</label>
                <input
                    type="number"
                    id="agility-test"
                    class="theme-black-input"
                    bind:value={formData.tests.agility}
                    min="-3"
                    max="3"
                />
                <label for="presence-test">Presence</label>
                <input
                    type="number"
                    id="presence-test"
                    class="theme-black-input"
                    bind:value={formData.tests.presence}
                    min="-3"
                    max="3"
                />
                <label for="strength-test">Strength</label>
                <input
                    type="number"
                    id="strength-test"
                    class="theme-black-input"
                    bind:value={formData.tests.strength}
                    min="-3"
                    max="3"
                />
                <label for="toughness-test">Toughness</label>
                <input
                    type="number"
                    id="toughness-test"
                    class="theme-black-input"
                    bind:value={formData.tests.toughness}
                    min="-3"
                    max="3"
                />
            </div>
            <div>
              <label for="melee">Melee</label>
              <input
                  type="number"
                  id="melee"
                  class="theme-black-input"
                  bind:value={formData.tests.melee}
                  min="-3"
                  max="3"
              />
              <label for="ranged">Ranged</label>
              <input
                  type="number"
                  id="ranged"
                  class="theme-black-input"
                  bind:value={formData.tests.ranged}
                  min="-3"
                  max="3"
              />
              <label for="defense">Defense</label>
              <input
                  type="number"
                  id="defense"
                  class="theme-black-input"
                  bind:value={formData.tests.defense}
                  min="-3"
                  max="3"
              />
            </div>
          </div>
        </div>
        <p class="calligraphy right-aligned">{!!formData.name ? ownership(formData.name) : 'You'} mettle will be tested.</p>
      </div>
  
      <div class="pod">
        <div>
          <p><span class="calligraphy">perhaps {!!formData.name ? `${formData.name} has` : 'you have'} a  <label class="bigger inline" for="className">profession</label> &hellip;</span>
            <input
              type="text"
              id='className'
              class="theme-black-input"
              bind:value={formData.className}
            />
          </p>
          <p class="text-right"><span class="calligraphy">&hellip;perhaps not</span>
              <input
                  type="number"
                  id="omens"
                  bind:value={formData.omens}
                  class="theme-black-input"
                  min="0"
                  max="4"
              />
              <label class="calligraphy smaller inline" for="omens">(Omens Die).</label>
          </p>
        </div>
      </div>
  
      <div class="pad">
        <div>
          <p class="calligraphy">Scribe your epitaph&hellip;</p>
          <textarea name="description" id="description" class="theme-black-input" cols="30" rows="10" style="width:100%;"></textarea>
          <label class="hidden" for="description">Description</label>
          <p class="calligraphy text-right">&hellip;no one else will.</p>
        </div>
      </div>
  
      <div class="pad">
          <p class="calligraphy">there is no saviour, but {formData.name || 'you'} may yet <button class="btn" type="submit">survive</button>.</p>
      </div>
  </form>
</div>


<style>
    #new-character-form {
        max-width: 800px;
        margin: 0 auto;
    }
    .hidden {
        position: absolute;
        left: -100in;
    }
    .inline {
        display: inline;
    }
    
    /* typography */
    .calligraphy {
      font-family: var(--callig);
      font-size: 2rem;
      line-height: 1.5;
    }

    .bigger {
        font-size: 2.5rem;
    }

    label.bigger {
        color: magenta;
    }


    .smaller {
        font-size: 1.5rem;
    }

    .text-right {
        text-align: right;
    }
    
    /* */
    .pad {
      padding: calc(var(--small-padding) * 2);
    }
    .pod {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 0 calc(var(--small-padding) * 2);
      margin: 5rem 0;
    }
    .pod:first-of-type {
      padding-top: 5rem;
      margin-top: 0;
    }

    .r { display: flex; }

    .right-aligned {
        padding-left: var(--small-padding);
    }

    .btn {
      display: inline;
      padding: 0 .25em;
      border: 2px solid #000;
      border-radius: 0;
      margin: 0;
      font-size: 2.5rem;
      color: #000;
      background: yellow;
    }
    .btn:focus {
      outline: 1px solid yellow;
    }
</style>