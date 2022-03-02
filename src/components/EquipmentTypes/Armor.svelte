<script>
    import { partial } from 'ramda';
    import { equipArmor } from '../../stores/Character';
    export let armor = {}
</script>

<div>
  {armor.name} <button type="button" on:click={partial(equipArmor, [armor._id])} disabled={armor.broken}>{armor.equipped ? 'Remove' : 'Equip'}</button>
</div>

