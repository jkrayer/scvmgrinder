<script type="ts">
  import { closeModal } from "svelte-modals";
  import Editor from "cl-editor/src/Editor.svelte";
  import { addCharacter } from "../lib/db";
  import { addCharacters } from "../Stores/CharactersStore";
  import Modal from "../components/Modal.svelte";
  import Input from "../components/Form/Input.svelte";
  import TextArea from "../components/Form/TextArea.svelte";
  import Label from "../components/Form/Label.svelte";
  import Checkbox from "../components/Form/Checkbox.svelte";
  import InputNumber from "../components/Form/InputNumber.svelte";
  import AddEquipmentForm from "../Equipment/AddEquipmentForm.svelte";
  import EquipmentList from "../Equipment/EquipmentList.svelte";
  import { rollD2, rollD4 } from "../lib/dice";
  import Button from "../components/Button.svelte";
  import ScoreRoller from "../components/ScoreRoller.svelte";
  import { getScore } from "../lib/character/scores";

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
  $: console.log(34, NewCharacter);

  const editorActions = [
    "b",
    "i",
    "u",
    "h2",
    "ul",
    "left",
    "center",
    "justify",
  ];
  const editorSize = "150px";

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

    addCharacter(char).then((character: CharacterType) => {
      addCharacters([character]);
      closeModal();
    });
  };

  const handleAddEquipment = (eq: Equipment) => {
    NewCharacter.equipment = [eq, ...NewCharacter.equipment];
  };

  const handlScores = ({ detail }: CustomEvent<ScoreObject>) => {
    const keys = ["Agility", "Presence", "Strength", "Toughness"];

    keys.forEach((key) => {
      const k = key.toLowerCase();
      NewCharacter.abilities[k] = detail[key].modifier;
    });
  };
</script>

<Modal>
  <h1>Add Character Form</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <Input label="Name" bind:value={NewCharacter.name} />
    <!-- <TextArea label="Description" bind:value={NewCharacter.description} /> -->

    <Label label="Description" />
    <Editor
      actions={editorActions}
      html={NewCharacter.description}
      on:change={(evt) => (NewCharacter.description = evt.detail)}
      height={editorSize}
    />
    <Input label="Class Name" bind:value={NewCharacter.class.name} />
    <!-- <TextArea
      label="Class Description"
      bind:value={NewCharacter.class.abilities}
    /> -->
    <Label label="Class Description" />
    <Editor
      actions={editorActions}
      html={NewCharacter.class.abilities}
      on:change={(evt) => (NewCharacter.class.abilities = evt.detail)}
      height={editorSize}
    />
    <div>
      <Checkbox label="Powers" bind:value={powers} />
      <InputNumber label="Omens" bind:value={omens} min={2} max={4} step={2} />
    </div>
    <InputNumber label="Hit Points" bind:value={hp} />
    <ScoreRoller
      scores={[
        { name: "Strength", rollFormula: "3d6" },
        { name: "Agility", rollFormula: "3d6" },
        { name: "Presence", rollFormula: "3d6" },
        { name: "Toughness", rollFormula: "3d6" },
      ]}
      getModifier={getScore}
      on:score:update={handlScores}
    />
    <InputNumber label="Silver" bind:value={NewCharacter.silver} min={0} />
    <AddEquipmentForm onSave={handleAddEquipment} />
    <EquipmentList equipment={NewCharacter.equipment} />
    <Button type="submit" buttonColor="yellow">Save Character</Button>
  </form>
</Modal>
