<script lang="ts" generics="T extends { _id: string; name: string }">
	import { createEventDispatcher } from 'svelte';
	import RollButton from './RollButton.svelte';

	export let dice: Dice;
	export let options: T[];

	const dispatch = createEventDispatcher<{ random: T }>();

	const handleRoll = ({ detail }: { detail: number }) => {
		dispatch('random', options[detail - 1]);
	};
</script>

<RollButton {dice} on:roll={handleRoll} />
