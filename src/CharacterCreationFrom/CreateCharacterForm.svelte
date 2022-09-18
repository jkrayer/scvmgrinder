<script type="ts">
  import { closeModal } from "svelte-modals";
  // somesortofdbsavecharacter, and an update
  import { addCharacter } from "../lib/db";
  import Modal from "../components/Modal.svelte";
  import Input from "../components/Form/Input.svelte";
  import TextArea from "../components/Form/TextArea.svelte";
  import Checkbox from "../components/Form/Checkbox.svelte";
  import InputNumber from "../components/Form/InputNumber.svelte";
  import Fieldset from "../components/Form/Fieldset.svelte";
  import AddEquipmentForm from "../Equipment/AddEquipmentForm.svelte";
  import EquipmentList from "../Equipment/EquipmentList.svelte";
  import { rollD2, rollD4 } from "../lib/dice";
  import equipment from "../data/equipment";

  export let NewCharacter: Partial<CharacterType> = {
    name: "",
    description: "",
    class: {
      name: "",
      abilities: "",
    },
    abilities: {
      agility: 0,
      presence: 0,
      strength: 0,
      toughness: 0,
    },
    silver: 0,
    equipment: [],
  };

  let powers: boolean = true;
  let hp: number = 0;
  let omens: number = 2;

  // HANDLERS
  const handleSubmit = () => {
    const char = {
      ...NewCharacter,
      hitpoints: { current: hp, maximum: hp },
      omens: { current: omens === 2 ? rollD2() : rollD4(), maximum: omens },
      powers:
        powers === false
          ? null
          : Math.max(1, rollD4() + NewCharacter.abilities.presence),
      miseries: [false, false, false, false, false, false, false],
      status: {},
    } as CharacterType;

    addCharacter(char);
    closeModal();
  };

  const handleAddEquipment = (eq: Equipment) => {
    NewCharacter.equipment = [eq, ...NewCharacter.equipment];
  };
</script>

<Modal>
  <h1>Add Character Form</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <Input label="Name" bind:value={NewCharacter.name} />
    <TextArea label="Description" bind:value={NewCharacter.description} />
    <Input label="Class Name" bind:value={NewCharacter.class.name} />
    <TextArea
      label="Class Description"
      bind:value={NewCharacter.class.abilities}
    />
    <div>
      <Checkbox label="Powers" bind:value={powers} />
      <InputNumber label="Omens" bind:value={omens} min={2} max={4} step={2} />
    </div>
    <InputNumber label="Hit Points" bind:value={hp} />
    <Fieldset legend="Ability Scores">
      <InputNumber
        label="Strength"
        bind:value={NewCharacter.abilities.strength}
        min={-3}
        max={3}
      />
      <InputNumber
        label="Agility"
        bind:value={NewCharacter.abilities.agility}
        min={-3}
        max={3}
      />
      <InputNumber
        label="Presence"
        bind:value={NewCharacter.abilities.presence}
        min={-3}
        max={3}
      />
      <InputNumber
        label="Toughness"
        bind:value={NewCharacter.abilities.toughness}
        min={-3}
        max={3}
      />
    </Fieldset>
    <InputNumber label="Silver" bind:value={NewCharacter.silver} min={0} />
    <AddEquipmentForm onSave={handleAddEquipment} />
    <EquipmentList equipment={NewCharacter.equipment} />
    <button type="submit">Save Character</button>
  </form>
</Modal>
