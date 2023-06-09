<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SquareButton from '../SquareButton.svelte';

	const dispatch = createEventDispatcher<{ increment: never; decrement: never }>();

	export let title: string;
</script>

<div class="row hp-row">
	<div>
		<div class="label">{title}</div>
		<p class="title"><slot /></p>
	</div>
	<div class="button-col">
		<SquareButton icon="plus" on:click={() => dispatch('increment')} />
		<SquareButton color="secondary" icon="minus" on:click={() => dispatch('decrement')} />
	</div>
</div>

<style>
	.hp-row {
		justify-content: space-between;
	}
</style>
