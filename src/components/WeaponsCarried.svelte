<script>
    import { compose, filter, pathSatisfies, toPairs } from 'ramda';
    import character, { breakWeapon } from '../stores/Character';
    import { symbol, roll } from '../lib';

    const { strength, presence } = $character.abilities;

    const BONUS_MAP = {
        melee: strength,
        ranged: presence
    };

    const isWeapon = pathSatisfies((x) => x === 'weapon', [1, 'type']);
    const isUnbroken = pathSatisfies((x) => x === false, [1, 'broken']);
    const isUnbrokenWeapon = (weapon) => isWeapon(weapon) && isUnbroken(weapon);

    const getWeapons = compose(filter(isUnbrokenWeapon), toPairs)

    // Handlers
    const handleBreakWeapon = (slotId) => () => breakWeapon(slotId)

    $: weapons = getWeapons($character.equipment)
    $: console.log(weapons)
</script>

<table>
    <thead>
        <tr>
            <th>Weapon</th>
            <th></th>
            <th>To Hit</th>
            <th>Damage</th>
        </tr>
    </thead>
    <tbody>
    {#each weapons as [slotId, weapon] }
        <tr>
            <td>{weapon.name}</td>
            <td>
                <button type="button" on:click={handleBreakWeapon(slotId)}>Break</button>
            </td>
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
