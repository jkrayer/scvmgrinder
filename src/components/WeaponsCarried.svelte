<script>
    import { filter, partial, propSatisfies } from 'ramda';
    import character, { breakWeapon } from '../stores/Character';
    import { symbol, roll, rollString } from '../lib';

    const { strength, presence } = $character.abilities;

    const COMBAT_BONUS_MAP = {
        melee: strength,
        ranged: presence
    };

    const isWeapon = propSatisfies((x) => x === 'weapon', 'type');
    const isUnbroken = propSatisfies((x) => x === false, 'broken');
    const isUnbrokenWeapon = (weapon) => isWeapon(weapon) && isUnbroken(weapon);
    const getWeapons = filter(isUnbrokenWeapon);

    const rol = (die) => typeof die === 'string' ? rollString(die) : roll(die)

    $: weapons = getWeapons($character.equipment)
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
    {#each weapons as weapon }
        <tr>
            <td>{weapon.name}</td>
            <td>
                <button type="button" on:click={partial(breakWeapon, [weapon._id])}>Break</button>
            </td>
            <td>
                <button type="button" on:click={()=> alert(roll(20) + COMBAT_BONUS_MAP[weapon.weaponType])} title="To Hit">{symbol(COMBAT_BONUS_MAP[weapon.weaponType])}</button>
            </td>
            <td>
                <button type="button" on:click={()=> alert(rol(weapon.damageDie))} title="Damage">{`d${weapon.damageDie}`}</button>
            </td>
        </tr>
    {/each}
    </tbody>
</table>
