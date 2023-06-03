<script lang="ts">
	import CharacterStore, { update } from './store';
	import SquareButton from '$lib/components/SquareButton.svelte';
	import { incrementHp, decrementHp } from '$lib/helpers/character';

	// HANDLERS
	const increment = () => update(incrementHp);
	const decrement = () => update(decrementHp);
</script>

<header id="character-sheet-header" class="row">
	<div class="col-one">
		<div class="label">Name</div>
		<h1 class="title">{$CharacterStore.name}</h1>
	</div>
	<div class="col-two">
		<div class="label">Class</div>
		<h2 class="title">{$CharacterStore.className}</h2>
	</div>
	<div class="col-one row hp-row">
		<div>
			<div class="label">Hit Points</div>
			<p class="title">{$CharacterStore.hitpoints.current}/{$CharacterStore.hitpoints.maximum}</p>
		</div>
		<div class="button-col">
			<SquareButton icon="plus" on:click={increment} />
			<SquareButton color="secondary" icon="minus" on:click={decrement} />
		</div>
	</div>
</header>

<style>
	.label {
		font: 700 0.75rem/1 var(--sans-serif);
		color: var(---black);
	}

	.title {
		margin: 8px 0 0 0;
		font: 400 1rem/1 var(--sans-serif);
		color: var(---black);
	}

	.label,
	.title {
		padding-left: 0.625rem;
	}

	.hp-row {
		justify-content: space-between;
	}
</style>
