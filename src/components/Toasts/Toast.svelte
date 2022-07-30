<script lang="ts">
  import { Notification } from "@svelteuidev/core";
  import type { Toast } from "./type";
  import ToastStore from "./ToastStore";

  // Handler
  const handleDismiss = (toast: Toast): void => {
    ToastStore.update((oldStore: Toast[]) =>
      oldStore.filter((ot: Toast) => ot.text !== toast.text)
    );
  };
</script>

<div id="toast-wrapper">
  {#each $ToastStore as toast}
    <Notification
      on:close={() => handleDismiss(toast)}
      title={toast.title}
      loading={true}
      color={toast.color}
      closeButtonLabel="Dismiss notification"
    >
      {toast.text}
    </Notification>
  {/each}
</div>

<style>
  #toast-wrapper {
    position: fixed;
    z-index: 1;
    transform: translate3d(calc(50vw - 50%), 1rem, 0);
  }
</style>
