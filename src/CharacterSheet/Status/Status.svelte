<script lang="ts">
  import { CrossCircled } from "radix-icons-svelte";
  import { openModal } from "svelte-modals";
  import { update } from "../store";
  import { deleteStatus } from "../../lib/character/status";
  import StatusBubble from "./StatusBubble.svelte";
  import Button from "../../components/Button.svelte";

  export let status: Status;

  const cancel = () => update(deleteStatus(status));

  const open = () => openModal(StatusBubble, { status, onClose: cancel });
</script>

<Button on:click={open}>
  {status.name}
</Button><!-- -->{#if status.canCancel}<Button
    title="Dismiss"
    on:click={cancel}
  >
    <CrossCircled slot="iconRight" />
  </Button>{/if}
