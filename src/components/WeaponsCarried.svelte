<script>
    import { compose, filter, propSatisfies, values } from 'ramda';
	import character from '../stores/Character';

    const isWeapon = propSatisfies((type) => type === 'weapon', 'type')
    const getWeapons = compose(filter(isWeapon), values)

    $: weapons = getWeapons($character.equipment)
</script>

<h2>Weapons</h2>
{#each weapons as weapon }
<div>{weapon.name} <button type="button">To Hit</button> <button type="button">Damage</button></div>
{/each}