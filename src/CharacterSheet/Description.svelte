<script type="ts">
  import Modal from "../components/Modal.svelte";

  export let title: string;
  export let body: string;
</script>

<Modal>
  <h2>{title}</h2>
  {@html body}
</Modal>
