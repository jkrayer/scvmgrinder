<script lang="ts">
	import EquipmentItem from './EquipmentItem.svelte';
	import CharacterStore, { update } from '../state/store';
	import Incrementer from '../Incrementer.svelte';
	import { padTo } from '$lib/helpers';
	import { incSilver, decSilver } from '$lib/Character-Sheet/state/index';

	// import EquipmentPicker from './EquipmentPicker.svelte';

	// Should this just be  aderived?
	let inventory = padTo<Character.Equipment>(16, $CharacterStore.equipment);
	let encumbrance: number = 8;
	let encumbranceIndex: number = 7;
	let isEncumbered: boolean = false;

	$: {
		encumbrance = 8 + $CharacterStore.abilities.strength;
		encumbranceIndex = encumbrance - 1;
		isEncumbered = $CharacterStore.equipment.length > encumbrance;
		inventory = padTo<Character.Equipment>(16, $CharacterStore.equipment);
	}

	// HANDLERS
</script>

<div id="equipment">
	<div class="row">
		<h2 class="sheet-title col-two">Equipment</h2>
		<!-- TODO: Change message when encumbered -->
		<p class="rule col-two">Strength + 8 items or DR+2 on Agility<wbr />/<wbr />Strength tests</p>
	</div>
	<ul class="inventory-list clear-list">
		{#each inventory as eq, index}
			<li class="inventory-slot">
				<EquipmentItem {eq} encumbered={index > encumbranceIndex} />
			</li>
		{/each}
	</ul>
	<div class="row">
		<div class="col-two">
			<Incrementer title="Silver" on:decrement={decSilver} on:increment={incSilver}
				>{$CharacterStore.silver}</Incrementer
			>
		</div>
	</div>
</div>

<!-- <EquipmentPicker /> -->
<style>
	#equipment {
		margin-bottom: var(--pad);
	}

	#equipment > .row {
		margin-bottom: var(--padSmall);
	}

	#equipment > ul {
		margin-bottom: 0;
	}

	.rule {
		margin: 0;
		font-size: 0.75rem;
		color: var(--gray);
	}

	.inventory-list {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
	}

	.inventory-slot {
		box-sizing: border-box;
		flex: 0 0 50%;
		width: 50%;
		padding: 1px;
	}

	.inventory-title {
		box-sizing: border-box;
		height: 27px;
		padding: 6px 6px 0;
		background-color: var(--veryLightGray);
		font-size: 0.875rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.inventory-title-encumbered {
		background-color: var(--lightYellow);
	}

	.inventory-is-broken {
		text-decoration: line-through;
	}

	.silver {
		margin: var(--padTiny) 0 0 0;
		font-size: 0.875rem;
	}

	.silver > span {
		font-weight: 700;
	}
</style>
