<script lang="ts">
	import Label from './Form/Label.svelte';
	import Input from './Form/Input.svelte';
	import { toDiceString } from '$lib';

	export let scores: {
		key: string;
		name: string;
		dice: [number, 'd', number, ('+' | '-')?, number?];
	}[];

	const cols = scores.length / 2;
</script>

<div class="flex">
	{#each scores.slice(0, cols) as { name, dice }, index}
		<div class="flex-col">
			<Label title={`${name} (${toDiceString(dice)})`}>
				<Input type="number" />
			</Label>
		</div>
	{/each}
</div>
<div class="flex">
	{#each scores.slice(cols) as { name, dice }, index}
		<div class="flex-col">
			<Label title={`${name} (${toDiceString(dice)})`}>
				<Input type="number" />
			</Label>
		</div>
	{/each}
</div>
