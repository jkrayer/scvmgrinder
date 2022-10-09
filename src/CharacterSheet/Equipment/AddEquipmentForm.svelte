<script type="ts">
  import { closeModal } from "svelte-modals";
  import { update } from "../store";
  import { addEquipmentWithEncumbrance } from "../../lib/character";
  import Modal from "../../components/Modal.svelte";
  import AddEquipmentForm from "../../Equipment/AddEquipmentForm.svelte";

  //
  const handleSubmit = (data: Equipment) =>
    update(addEquipmentWithEncumbrance(data));

  const handleSaveAndClose = (data: Equipment) => {
    handleSubmit(data);
    closeModal();
  };
</script>

<Modal>
  <AddEquipmentForm onSave={handleSubmit} onSaveAndClose={handleSaveAndClose} />
</Modal>
