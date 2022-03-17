<script>
    export let item = {};
</script>

<div class="r">
  <div>
    {item.description}
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