<script lang="ts">
	import equipment from '../../../../morkborg/data/equipment';
	import CharacterStore, { update } from '../store';
	import { padTo } from '$lib/helpers';
	import { toggleEq } from '$lib/helpers/character';
	// import { addMessage } from "../Messages/state/MessageStore";
	// import { testMessage } from "../Messages/lib";
	// import Button from "../components/Button.svelte";

	// const handleAbilityTest = (score: string, modifier: number) => () =>
	// addMessage(testMessage({ score, modifier, name: $CharacterStore.name }));

	// Should this just be  aderived?
	let inventory = padTo<Character.Equipment>(16, $CharacterStore.equipment);
	let encumbrance: number = 8;
	let encumbranceIndex: number = 7;
	let isEncumbered: boolean = false;

	$: {
		encumbrance = 8 + $CharacterStore.abilities.strength;
		encumbranceIndex = encumbrance - 1;
		isEncumbered = $CharacterStore.equipment.length > encumbrance;
	}
	// on:click={equip(eq)}

	const handleEquip = (id: string) => () => update(toggleEq(id));
</script>

<div class="row">
	<h2 class="sheet-title col-two">Equipment</h2>
	<!-- TODO: Change message when encumbered -->
	<p class="rule col-two">Strength + 8 items or DR+2 on Agility<wbr />/<wbr />Strength tests</p>
</div>
<ul class="row clear-list">
	{#each inventory as eq, index}
		{@const classes = `col-two inventory-slot ${
			index > encumbranceIndex ? 'inventory-slot-encumbered' : ''
		}`}
		<li class={classes}>
			{#if eq !== null}
				{eq.name}
				<button type="button" on:click={handleEquip(eq._id)}>{eq.equipped ? 'un' : ''}equip</button>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.rule {
		margin: 0;
		font-size: 0.75rem;
		color: var(--gray);
	}

	.inventory-slot {
		min-height: 1rem;
		background-color: var(--veryLightGray);
	}
	.inventory-slot-encumbered {
		background-color: var(--lightYellow);
	}
</style>
