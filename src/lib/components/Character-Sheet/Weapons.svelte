<script lang="ts">
	import { EquippedWeapons } from './store';
	import RollButton from '../RollButton.svelte';
	import { toDiceString } from '$lib/helpers/character';
</script>

{#each $EquippedWeapons as weapon}
	<div class="row weapon-row">
		<h2 class="col-two sheet-title">
			{weapon.name}
		</h2>
		<div class="col-one weapon-row">
			{toDiceString(weapon.toHit)}&nbsp;
			<RollButton dice={weapon.toHit} />
		</div>
		<div class="col-one weapon-row">
			{toDiceString(weapon.damage)}&nbsp;
			<RollButton dice={weapon.damage} />
		</div>
	</div>
{/each}

<style>
	.weapon-row {
		display: flex;
		align-items: center;
		padding-bottom: 0.625rem;
		border-bottom: 1px solid var(--ruleGray);
	}
	.weapon-row > .weapon-row {
		padding-bottom: 0;
		border-bottom: none;
	}
</style>
