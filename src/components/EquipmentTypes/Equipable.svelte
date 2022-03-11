<script>
    import { partial } from 'ramda';
    import { equipArmor } from '../../stores/Character';
    export let armor = {}
</script>

<div class="r">
  <div>
    {armor.name}
    <p class="desc">{armor.description}</p>
    
  </div>
  <button
    class="mb0"
    type="button"
    on:click={partial(equipArmor, [armor._id])}
    disabled={armor.broken}
  >
    {armor.equipped ? 'Remove' : 'Equip'}
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