<script lang="ts">
	import Character, { EquippedWeapons } from './state/store';
	import RollButton from '$lib/components/RollButton.svelte';
	import { toDiceString } from '$lib/helpers/character';
	import { toHit, damage } from '$lib/Messages/state';

	// HANDLERS
	const handleToHit =
		({ name, weaponType }: Equipment.Weapon) =>
		() =>
			toHit([
				name,
				weaponType === 'melee' ? $Character.abilities.strength : $Character.abilities.agility
			]);
</script>

{#each $EquippedWeapons as weapon}
	<div class="row weapon-row">
		<h2 class="col-two sheet-title">
			{weapon.name}
		</h2>
		<div class="col-one weapon-row">
			{toDiceString(weapon.toHit)}&nbsp;
			<RollButton dice={weapon.toHit} on:roll={handleToHit(weapon)} />
		</div>
		<div class="col-one weapon-row">
			{toDiceString(weapon.damage)}&nbsp;
			<RollButton dice={weapon.damage} on:roll={() => damage(weapon)} />
		</div>
	</div>
{/each}

<style>
	.weapon-row {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 0.625rem;
		border-bottom: 1px solid var(--ruleGray);
	}
	.weapon-row > .weapon-row {
		padding-bottom: 0;
		border-bottom: none;
	}
</style>
