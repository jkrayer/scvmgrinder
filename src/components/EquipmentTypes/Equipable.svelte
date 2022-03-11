<script>
    import { partial } from 'ramda';
    import { equipArmor } from '../../stores/Character';
    export let item = {}
</script>

<div class="r">
  <div>
    {item.name}
    <p class="desc">{item.description}</p>
    
  </div>
  <button
    class="mb0"
    type="button"
    on:click={partial(equipArmor, [item._id])}
    disabled={item.broken}
  >
    {item.equipped ? 'Remove' : 'Equip'}
  </button>
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
  .mb0 {
    margin-bottom: 0;
  }
</style>