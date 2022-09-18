<script type="ts">
  import { slide } from "svelte/transition";
  import {
    AMMUNITION_TYPES,
    EQUIPMENT_TYPES,
    ARMOR_TIER_TYPES,
    DAMAGE_DICE_TYPES,
  } from "./formdata";
  import {
    format,
    equipmentMax,
    getFormData,
    hasSubtypes,
    getSubtypes,
  } from "./lib";
  import type { FormData } from "./type";
  import RadioGroup from "../components/Form/RadioGroup.svelte";
  import Input from "../components/Form/Input.svelte";
  import InputNumber from "../components/Form/InputNumber.svelte";

  //
  export let onSaveAndClose: false | ((arg1: Equipment) => void) = false;
  export let onSave: (arg1: Equipment) => void;

  let nameInput;
  let oldType = "equipment";
  let oldSubtype = "";

  let formData: FormData = getFormData("equipment");

  let maxQuantity: number;

  $: {
    maxQuantity = equipmentMax(formData.subtype || formData.type);

    // TODO: Replace with a more FP solution
    if (formData.type !== oldType) {
      formData = getFormData(formData.type);

      oldType = formData.type;
    }

    if (formData.subtype !== oldSubtype) {
      formData = {
        ...formData,

        quantity: 1,
      };

      oldSubtype = formData.subtype || null;
    }
  }

  //
  const handleSubmit = (e) => {
    // @ts-ignore
    const equipment: Equipment = format(formData);
    console.log(56, equipment);

    if (onSaveAndClose && e.submitter.dataset.fn === "close") {
      onSaveAndClose(equipment);
    } else {
      onSave(equipment);
      formData = getFormData("equipment");
      nameInput?.focus();
    }
  };
</script>

<!-- DAMAGEDIE -->

<h2 class="character-sheet-field-label">Add Equipment</h2>
<form on:submit|preventDefault={handleSubmit}>
  <RadioGroup
    bind:group={formData.type}
    values={EQUIPMENT_TYPES}
    title="Equipment Type"
  />
  <div class="grid name-row">
    <Input label="Name" bind:value={formData.name} bind:ref={nameInput} />
    {#if hasSubtypes(formData.type)}
      {@const { title, values } = getSubtypes(formData.type)}
      <div class="grid balanced">
        <RadioGroup
          bind:group={formData.subtype}
          {values}
          {title}
          showLegend={true}
        />
        {#if formData.subtype === "ranged"}
          <RadioGroup
            bind:group={formData.ammoType}
            values={AMMUNITION_TYPES}
            title="Ammunition Type"
            showLegend={true}
          />
        {/if}
      </div>
    {:else if formData.type === "armor"}
      <RadioGroup
        bind:group={formData.tier}
        values={ARMOR_TIER_TYPES}
        title="Armor Tier"
        showLegend={true}
      />
    {/if}
  </div>

  <div class="grid description-row">
    <Input
      label="Description (add % to show quantity in description)"
      bind:value={formData.description}
    />
    {#if ["food", "ammunition"].includes(formData.type)}
      <InputNumber
        label="Quantity"
        bind:value={formData.quantity}
        min={1}
        max={maxQuantity}
      />
    {/if}
  </div>

  {#if formData.type === "weapon"}
    <div transition:slide>
      <RadioGroup
        bind:group={formData.damageDie}
        values={DAMAGE_DICE_TYPES}
        title="Damage Die"
        showLegend={true}
      />
    </div>
  {/if}

  <div class="save">
    <button type="submit" data-fn="save" class="btn-magenta">Save</button>
    {#if onSaveAndClose}
      <button type="submit" data-fn="close" class="btn-yellow"
        >Save & Close</button
      >
    {/if}
  </div>
</form>

<style>
  .name-row {
    grid-template-columns: 1fr 2fr;
  }
  .description-row {
    grid-template-columns: 2fr 1fr;
  }

  .balanced {
    grid-template-columns: 1fr 1fr;
  }

  .save {
    display: flex;
    flex-direction: row-reverse;
    justify-content: right;
  }
</style>
