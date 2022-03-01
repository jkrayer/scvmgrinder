<script>
    import { compose, filter, propSatisfies, values } from 'ramda';
	import character from '../stores/Character';
    import { symbol, roll } from '../lib'

    const { strength, presence } = $character.abilities

    const BONUS_MAP = {
        melee: strength,
        ranged: presence
    }

    const isWeapon = propSatisfies((type) => type === 'weapon', 'type')
    const getWeapons = compose(filter(isWeapon), values)

    $: weapons = getWeapons($character.equipment)

</script>
<table>
    <thead>
        <tr>
            <th>Weapon</th>
            <th>To Hit</th>
            <th>Damage</th>
        </tr>
    </thead>
    <tbody>
    {#each weapons as weapon }
        <tr>
            <td>{weapon.name}</td>
            <td>
                <button type="button" on:click={()=> alert(roll(20) + BONUS_MAP[weapon.subtype])} title="To Hit">{symbol(BONUS_MAP[weapon.subtype])}</button>
            </td>
            <td>
                <button type="button" on:click={()=> alert(roll(weapon.damage))} title="Damage">{`d${weapon.damage}`}</button>
            </td>
        </tr>
    {/each}
    </tbody>
</table>
