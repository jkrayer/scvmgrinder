<script lang="ts">
	import { rollDice } from '$lib/index';
	import { createEventDispatcher } from 'svelte';

	export let dice: Dice;

	const dispatch = createEventDispatcher<{ roll: number }>();

	const handleRoll = () => {
		dispatch('roll', rollDice(dice));
	};
</script>

<button type="button" title="Roll" on:click={handleRoll} class="button"
	><img src="/pip-six.svg" alt="Roll" /></button
>

<style>
	.button {
		box-sizing: border-box;
		border: none;
		padding: 0;
		line-height: 1;
		background-color: transparent;
	}
</style>
