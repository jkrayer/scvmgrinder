<script lang="ts">
  export let status: Status;

  let show: boolean = false;

  const handle = () => {
    show = true;
  };
</script>

<button type="button" on:click={handle}>{status.name}</button>
{#if show}
  <div>
    {status.description}
  </div>
{/if}
