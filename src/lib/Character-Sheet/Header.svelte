<script lang="ts">
	import CharacterStore, { update } from './state/store';
	import Incrementer from './Incrementer.svelte';
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
	<div class="col-one">
		<Incrementer title="Hit Points" on:increment={increment} on:decrement={decrement}>
			{$CharacterStore.hitpoints.current}/{$CharacterStore.hitpoints.maximum}
		</Incrementer>
	</div>
</header>
