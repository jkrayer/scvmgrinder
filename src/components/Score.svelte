<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { maxRoll, minRoll, toDiceString } from '$lib';
	import Label from './Form/Label.svelte';
	import NumberInput from './Form/NumberInput.svelte';

	const dispatch = createEventDispatcher<{ change: { key: AbilityKeys; score: number } }>();

	export let ability: Ability;
	export let mod: number;

	let score: number = 0;
	let lastScore: number = -1;

	$: {
		if (score !== lastScore) {
			dispatch('change', { key: ability.key, score });
			lastScore = score;
		}
	}
</script>

<div class="flex">
	<div class="flex-col" id={`${ability.name}-title`}>
		{`${ability.name}(${toDiceString(ability.dice)})`}
	</div>
</div>
<div class="flex">
	<div class="flex-col">
		<Label title="roll" aria-labelledby={`${ability.name}-title`}>
			<NumberInput bind:value={score} min={minRoll(ability.dice)} max={maxRoll(ability.dice)} />
		</Label>
	</div>
	<div class="flex-col">
		<Label title="score" aria-labelledby={`${ability.name}-title`}>
			<NumberInput readonly value={mod} />
		</Label>
	</div>
</div>
