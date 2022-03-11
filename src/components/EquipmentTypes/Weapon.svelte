<script>
    export let weapon = {};
</script>

<div class="r">
  <div>
    {weapon.name}
    {#if !!weapon.description}
        <p class="desc">{weapon.description}</p>    
    {/if}
  </div>
</div>

<style>
  .r {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }
  .desc {
    margin: 0;
    font-size: .875em;
    font-style: oblique;
    font-weight: 500;
  }
</style>