<script>
  import { partial } from "ramda";
  import { subtractEquipment, addEquipment } from "../../stores/Character";

  export let item = {};
</script>

<div class="r">
  <div>
    {item.description.replace("#", item.quantity)}
  </div>
  <div>
    <button
      class="mb0"
      type="button"
      disabled={item.weight * item.quantity === 100}
      on:click={partial(addEquipment, [item._id])}
    >
      +
    </button>
    <button
      class="mb0"
      type="button"
      on:click={partial(subtractEquipment, [item._id])}
    >
      -
    </button>
  </div>
</div>

<style>
  .r {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }
</style>
