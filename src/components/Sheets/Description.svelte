<script type="ts">
  export let description: string;
</script>

<div class="description">
  <h2 class="monster-sheet-header">Description</h2>
  <div class="description-body">
    {@html description}
  </div>
</div>

<style>
  .description {
    padding: 0.25rem;
  }
  .description-body {
    font-size: 0.75rem;
  }
</style>
