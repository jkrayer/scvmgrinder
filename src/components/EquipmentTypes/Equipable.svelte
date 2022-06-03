<script>
  import { partial } from "ramda";
  import { equip } from "../../stores/Character";

  export let item = {};
</script>

<div class="r">
  <div>
    {item.description}
  </div>
  <button
    class="mb0"
    type="button"
    on:click={partial(equip, [item._id])}
    disabled={item.broken}
  >
    {item.equipped ? "Remove" : "Equip"}
  </button>
</div>

<style>
  .r {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }
</style>
