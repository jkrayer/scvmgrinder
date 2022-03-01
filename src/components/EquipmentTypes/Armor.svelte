<script>
    import { equipArmor } from '../../stores/Character'
    export let armor = {}
    export let slotId;
</script>

<div>
  {armor.name} <button type="button" on:click={() => equipArmor(slotId)} disabled={armor.broken}>{armor.equipped ? 'Remove' : 'Equip'}</button>
</div>

