<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { maxRoll, minRoll, toDiceString } from '$lib';
	import Label from './Form/Label.svelte';
	import NumberInput from './Form/NumberInput.svelte';
	import RollButton from './RollButton.svelte';

	const dispatch = createEventDispatcher<{ change: { key: AbilityKeys; score: number } }>();

	export let ability: Ability;
	export let mod: number;

	let score: number = 0;
	let lastScore: number = -1;

	const send = (score: number) => {
		dispatch('change', { key: ability.key, score });
		lastScore = score;
	};

	$: {
		if (score !== lastScore) {
			send(score);
		}
	}
</script>

<fieldset class="flex fieldset">
	<legend class="flex-col legend">
		{`${ability.name}(${toDiceString(ability.dice)})`}
		<RollButton dice={ability.dice} on:roll={({ detail }) => (score = detail)} />
	</legend>
	<div class="flex">
		<div class="flex-col">
			<Label title="roll">
				<NumberInput bind:value={score} min={minRoll(ability.dice)} max={maxRoll(ability.dice)} />
			</Label>
		</div>
		<div class="flex-col">
			<Label title="score" aria-labelledby={`${ability.name}-title`}>
				<NumberInput readonly value={mod} />
			</Label>
		</div>
	</div>
</fieldset>

<style>
	.fieldset {
		padding: 0;
		border: none;
		margin: 0;
	}

	.legend {
		display: flex;
		gap: 0.75em;
		align-items: center;
		padding-bottom: 0.5em;
		font-weight: 700;
		font-size: 0.875em;
		letter-spacing: 0.02em;
	}
</style>
