<script>
    import { compose, filter, head, isNil, ifElse, always, identity, toPairs } from 'ramda';
	import character, { setArmorTier } from '../stores/Character';
    import { roll } from '../lib'

    const isWornArmor = (equipment) => equipment.type === 'armor' && equipment.equipped
    const getWornArmor = compose(ifElse(isNil, always(['', {}]), identity), head, toPairs, filter(isWornArmor))

    let toggle = true;
    $: [slotId, armorWorn] = getWornArmor($character.equipment);

    const handleToggle = () => toggle = !toggle

    const handleTierClick = (tier) => () => setArmorTier(slotId, tier)
</script>

<div class="row">
    <div>
        <b>Armor:</b> {armorWorn.name || ''}
    </div>
    <div>
        <button type="button" on:click={handleToggle}>{toggle ? 'Tiers' : 'Rolls'}</button>
        {#if toggle}
            <button type="button" on:click={() => alert(roll(2))} class={armorWorn.currentTier === 1 ? 'current button-tier' : 'button-tier'} title="-d2" disabled={armorWorn.currentTier !== 1}>-d2</button>
            <button type="button" on:click={() => alert(roll(4))} class={armorWorn.currentTier === 2 ? 'current button-tier' : 'button-tier'} title="-d4" disabled={armorWorn.currentTier !== 2}>-d4</button>
            <button type="button" on:click={() => alert(roll(6))} class={armorWorn.currentTier === 3 ? 'current button-tier' : 'button-tier'} title="-d6" disabled={armorWorn.currentTier !== 3}>-d6</button>
        {:else}
            <button type="button" on:click={handleTierClick(1)} class={armorWorn.currentTier === 1 ? 'current button-tier' : 'button-tier'} title="Tier 1, -d2">1</button>
            <button type="button" on:click={handleTierClick(2)} class={armorWorn.currentTier === 2 ? 'current button-tier' : 'button-tier'} title="Tier 2, -d4">2</button>
            <button type="button" on:click={handleTierClick(3)} class={armorWorn.currentTier === 3 ? 'current button-tier' : 'button-tier'} title="Tier 3, -d6">3</button>
        {/if}
    </div>
</div>

<style>
    .current { background-color: yellow; }
    button:disabled { background-color: gray; }

    .button-tier {
        width: 30px;
        height: 30px;
        padding: 3px;
        border-radius: 50%;
        font-size: .75em;
    }
</style>