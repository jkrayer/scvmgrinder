<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import RollButton from './RollButton.svelte';

	type T = $$Generic<{ _id: string; name: string }>;

	export let dice: Dice;
	export let options: T[];

	const dispatch = createEventDispatcher<{ random: T }>();

	const handleRoll = ({ detail }: { detail: number }) => {
		dispatch('random', options[detail - 1]);
	};
</script>

<RollButton {dice} on:roll={handleRoll} />
