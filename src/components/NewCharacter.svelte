<script>
    import { isEmpty } from 'ramda';
    import characters from '../data/characters';
    import { writable } from "svelte/store";
    import { propSatisfies, test } from "ramda";
    import { addCharacter } from '../stores/Characters';
    import Input from './Form/Input.svelte';
    import NumberInput from './Form/NumberInput.svelte';
    import TextInput from './Form/TextInput.svelte';
    import RollButton from './Buttons/RollButton.svelte';
    import ExceptionTable from './Tables/ExceptionTable.svelte';
    import RollTable from "./Tables/RollTable.svelte";
    import StringTable from './Tables/StringTable.svelte';
    import { formatCharacterData } from '../lib/formatCharacterData';
    import { handleFieldRoll, getFormData, findForm } from "../lib/dom";
    import TableofTables from './Tables/TableofTables.svelte';

    const ownership = (string) => string.endsWith('s') ? `${string}'` : `${string}'s`

    const onSubmit = (e) => {
        // const { name:className, omens, classSpecial, tests, img } = $selected;
        const formData = getFormData(e.target);
        console.log(46, formData)
        // addCharacter(
        //     formatCharacterData({
        //         ...formData,
        //         className,
        //         omens,
        //         classSpecial,
        //         tests,
        //         img
        //     })
        // );
    };


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
    }

    $: console.log(formData, typeof formData.food)
</script>

<form
    id="new-character-form"
    novalidate
    on:submit|preventDefault={onSubmit}
    class="theme-black"
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
    <p class="calligraphy">The weight of equipment compresses {ownership(formData.name)} spine.</p>
    EQUIPMENT ADDERS
    <!-- <fieldset class="fieldset">
        <legend>To begin with, you are what you own</legend>
        <RollTable {...STARTING_EQUIPMENT_ONE} />
        <TableofTables tables={[STARTING_EQUIPMENT_TWO, UNCLEAN_SCROLLS]} />
        <TableofTables tables={[STARTING_EQUIPMENT_THREE, SACRED_SCROLLS]} />
        <ExceptionTable {...WEAPON_TABLE} {hasScroll}  />
        <ExceptionTable {...ARMOR_TABLE} {hasScroll}  />
    </fieldset> -->
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
      <p class="calligraphy">{ownership(formData.name)} mettle will be tested...</p>
    </div>

    <div class="pod">
        <p class="calligraphy">perhaps {!!formData.name ? `${formData.name} has` : 'you have'} a 
          <label class="bigger" for="className">profession</label> &hellip;
          <input
            type="text"
            id='className'
            class="theme-black-input"
            bind:value={formData.class}
          />
        </p>
        <p>...perhaps not
            <input
                type="number"
                name="omens"
                id="omens"
                min="0"
                max="4"
            />
            <label class="smaller" for="omens">(Omens Die)</label>
        </p>
    </div>

    <div>
        <label for="description">Description</label>
        <textarea name="description" id="description" class="theme-black-input" cols="30" rows="10"></textarea>
    </div>

    <p class="calligraphy">there is no saviour, but {formData.name || 'you'} may yet <button class="btn" type="submit">survive</button>.</p>
</form>

<style>
    #new-character-form {
        /* padding: calc(var(--small-padding) * 2); */
    }
    .hidden {
        position: absolute;
        left: -100in;
    }
    .theme-black-input {
      background-color: #000;
      border: none;
      border-bottom: 1px solid #fff;
      color: #fff;
    }
    .theme-black-input::placeholder {
        color: #888;
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

    .smaller {
        font-size: 1.5rem;
    }
    
    /* */
    .pod {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100vw;
      height: 100vw;
      padding: calc(var(--small-padding) * 2);
    }

    .btn {
      display: inline;
      padding: 0 .25em;
      border: none;
      border-radius: 0;
      margin: 0;
      font-size: 2.5rem;
      color: #000;
      background: yellow;
    }
</style>