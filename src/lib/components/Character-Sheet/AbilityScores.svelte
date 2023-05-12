<script type="ts">
	import { toPairs } from 'ramda';
	import CharacterStore from './store';
	// import { addMessage } from "../Messages/state/MessageStore";
	// import { testMessage } from "../Messages/lib";
	// import Button from "../components/Button.svelte";

	// const handleAbilityTest = (score: string, modifier: number) => () =>
	// addMessage(testMessage({ score, modifier, name: $CharacterStore.name }));
</script>

<div class="row scores">
	{#each toPairs($CharacterStore.abilities) as [key, value]}
		<div class="col-one">
			<button type="button" class="clear-button">
				<h3 class="score-title">{key}</h3>
				<p class="score">{value}</p>
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
		border-top: 1px solid #c8c8c8;
		border-bottom: 1px solid #c8c8c8;
	}
	.score-title,
	.score {
		margin-top: 0.25rem;
		margin-bottom: 0;
		font: 400 1.5rem/1 var(--handwriting);
		color: var(--gray);
		text-align: center;
	}
	.score {
		margin-bottom: 0.25rem;
	}
</style>
