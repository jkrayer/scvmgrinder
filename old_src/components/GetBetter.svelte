<script type="ts">
	import { closeModal } from 'svelte-modals';
	import { sum, toPairs } from 'ramda';
	import Modal from './Modal.svelte';
	import HpUpdater from './Form/HpUpdater.svelte';
	import AbilityUpdater from './Form/AbilityUpdater.svelte';
	import CharacterStore, { update } from '../CharacterSheet/store';
	import { getBetter } from '../lib/character/getBetter';
	import { rollD10, rollD6 } from '../lib/dice';
	import { getSacredScroll, getUncleanScroll } from '../lib/game_data/index';

	let hp: number = $CharacterStore.hitpoints.maximum;
	let abilityScores: AbilityScores = {
		strength: 0,
		agility: 0,
		presence: 0,
		toughness: 0
	};
	let silver = 0;
	let equipment = [];

	let rolled = 0;

	const handleRoll = () => {
		equipment = [];
		silver = 0;
		rolled = rollD6();
	};

	const rollSilver = () => (silver = sum([rollD10(), rollD10(), rollD10()]));

	const rollScroll = (type: 'sacred' | 'unclean') => () => {
		const rollIndex: number = rollD10() - 1;

		const nextEq =
			type === 'sacred'
				? getSacredScroll(rollIndex)
				: type === 'unclean'
				? getUncleanScroll(rollIndex)
				: null;

		equipment = nextEq === null ? [] : [nextEq];
	};

	// HANDLERS
	const handleSubmit = () => {
		update(getBetter(hp, abilityScores, silver, equipment));
		closeModal();
	};

	const setScore =
		(name: keyof AbilityScores) =>
		({ detail }: CustomEvent<number>) =>
			(abilityScores[name] = detail);

	const setHp = ({ detail }: CustomEvent<number>) => (hp = detail);
</script>

<Modal>
	<h2>Get Better</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<HpUpdater current={$CharacterStore.hitpoints.maximum} on:newScore={setHp} />
		<div class="grid score-grid">
			{#each toPairs($CharacterStore.abilities) as [name, score]}
				<AbilityUpdater {name} {score} on:newScore={setScore(name)} />
			{/each}
		</div>
		<h3>Left in the debris you find</h3>
		<button type="button" on:click={handleRoll}>D6</button>
		{#if rolled !== 0}
			({rolled})
		{/if}
		<ul>
			<li class:active={rolled > 0 && rolled < 4} class:strike={rolled !== 0 && rolled > 3}>
				<b>1-3</b> Nothing
			</li>

			{#if rolled === 4}
				{#if silver === 0}
					<li class="active">
						<button type="button" on:click={rollSilver}>3d10 silver</button>
					</li>
				{:else}
					<li class="active">{silver} silver</li>
				{/if}
			{:else}
				<li class:strike={rolled !== 0 && rolled != 4}><b>4</b> 3d10 silver</li>
			{/if}

			{#if rolled === 5}
				{#if equipment.length === 0}
					<li class="active">
						<button type="button" on:click={rollScroll('unclean')}>unclean scroll</button>
					</li>
				{:else}
					<li class="active">{equipment[0].name}</li>
				{/if}
			{:else}
				<li class:strike={rolled !== 0 && rolled != 5}>
					<b>5</b> an unclean scroll
				</li>
			{/if}

			{#if rolled === 6}
				{#if equipment.length === 0}
					<li class="active">
						<button type="button" on:click={rollScroll('sacred')}>sacred scroll</button>
					</li>
				{:else}
					<li class="active">{equipment[0].name}</li>
				{/if}
			{:else}
				<li class:strike={rolled !== 0 && rolled != 6}>
					<b>6</b> a sacred scroll
				</li>
			{/if}
		</ul>
		<button type="submit">Save</button>
	</form>
</Modal>

<style>
	.score-grid {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}
	.active {
		background-color: yellow;
	}
	.strike {
		text-decoration: line-through;
	}
</style>
