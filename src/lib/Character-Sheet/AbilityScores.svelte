<script lang="ts">
	import { toPairs } from 'ramda';
	import CharacterStore from './state/store';
	import { abilityTest } from '$lib/Messages/state';

	// HANDLERS
	const handleTest = (name: AbilityKeys, score: Score) => () => abilityTest([name, score]);
</script>

<div class="row scores">
	{#each toPairs($CharacterStore.abilities) as [key, value]}
		<div class="col-one">
			<button type="button" class="clear-button" on:click={handleTest(key, value)}>
				<h3 class="score-title">{key}</h3>
				<p class="score-title score">{value}</p>
			</button>
		</div>
	{/each}
</div>

<style>
	.clear-button {
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		margin: 0;
		background-color: transparent;
		appearance: none;
		cursor: pointer;
	}
	.scores {
		border-top: 1px solid var(--ruleGray);
		border-bottom: 1px solid var(--ruleGray);
	}
	.score-title,
	.score {
		margin-top: 0.25rem;
		margin-bottom: 0;
		color: var(--gray);
		text-align: center;
	}
	.score {
		margin-bottom: 0.25rem;
	}
</style>
