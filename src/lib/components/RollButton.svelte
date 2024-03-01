<script lang="ts">
	import { rollDice } from '$lib/dice';
	import { createEventDispatcher } from 'svelte';

	export let dice: Dice;
	export let roll: (arg0: Dice) => number = rollDice;

	const dispatch = createEventDispatcher<{ roll: number }>();

	const handleRoll = () => {
		dispatch('roll', roll(dice));
	};
</script>

<button type="button" title="Roll" on:click={handleRoll} class="button"
	><img src="pip-six.svg" alt="Roll" /></button
>

<style>
	.button {
		box-sizing: border-box;
		border: none;
		padding: 0;
		line-height: 1;
		background-color: transparent;
		cursor: pointer;
	}
</style>
