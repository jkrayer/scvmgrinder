<script>
    import { compose, filter, head, isNil, ifElse, always, identity, toPairs } from 'ramda';
	import character, { setArmorTier } from '../stores/Character';

    const isWornArmor = (equipment) => equipment.type === 'armor' && equipment.equipped

    const getWornArmor = compose(ifElse(isNil, always(['', {}]), identity), head, toPairs, filter(isWornArmor))

    $: [slotId, armorWorn] = getWornArmor($character.equipment);
    $: console.log(armorWorn)

    const handleTierClick = (tier) => () => setArmorTier(slotId, tier)
</script>

<h2>Armor</h2>
<div>
    {armorWorn.name || ''}
    <div>
        <button type="button" on:click={handleTierClick(1)} class={armorWorn.currentTier === 1 ? 'current' : ''}>Tier 1</button>
        <button type="button" on:click={handleTierClick(2)} class={armorWorn.currentTier === 2 ? 'current' : ''}>Tier 2</button>
        <button type="button" on:click={handleTierClick(3)} class={armorWorn.currentTier === 3 ? 'current' : ''}>Tier 3</button>
    </div>
</div>

<style>
    .current { background-color: yellow; }
    button:disabled { background-color: gray; }
</style>