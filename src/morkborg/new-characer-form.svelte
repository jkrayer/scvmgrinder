<script lang="ts">
	export let tables: CreateCharacterData['tables'];

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { isEmpty } from 'ramda';
	import store, { canSubmit, reset, setSelectedClass, setTrait } from './store/new-character-store';
	import { maxRoll, toDiceString, rollToScore } from '$lib';
	import Label from '$lib/components/Form/Label.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import NumberInput from '$lib/components/Form/NumberInput.svelte';
	import Select from '$lib/components/Form/Select.svelte';
	import RollTable from '$lib/components/RollTable.svelte';
	import Button from '$lib/components/Button.svelte';
	import Score from '$lib/components/Score.svelte';
	import Form from '$lib/components/Form/Form.svelte';
	import Title from '$lib/components/Title.svelte';
	import OptionButton from '$lib/components/OptionButton.svelte';
	import RollButton from '$lib/components/RollButton.svelte';
	import { formToCharacter } from '../morkborg/lib';
	import { addCharacter } from '$lib/db';

	const CHARACTERS: RawClassData[] = tables.characters;
	let classId: string = CHARACTERS[0]._id;
	let hpDice: Dice | never[] = [];

	$: {
		let selectedClass: RawClassData | undefined = CHARACTERS.find((x: any) => x._id === classId);
		!!selectedClass && setSelectedClass(selectedClass);
	}

	onMount(() => reset(CHARACTERS[0]));

	$: {
		const D: [Dice[0], Dice[1], Dice[2]] = $store.selectedClass.hitPoints || [1, 'd', 1];
		const M: [Dice[3], Dice[4]] = ['+', $store.formData.toughness];
		hpDice = [...D, ...M];
	}

	const handleScoreChange = ({
		detail: { key, score }
	}: CustomEvent<{ key: AbilityKeys; score: number }>) =>
		($store.formData[key] = rollToScore(score));

	const handleSubmit = () =>
		addCharacter(formToCharacter($store.selectedClass as RawClassData, $store.formData)).then(() =>
			goto(`${base}/`)
		);
</script>

<a href="{base}/" class="banner">Go Home!<br />the path is pain.</a>
<Form onSubmit={handleSubmit}>
	<Label title="Character Class">
		<OptionButton
			dice={[1, 'd', 6, '+', 1]}
			options={CHARACTERS}
			on:random={({ detail }) => (classId = detail._id)}
			slot="roll"
		/>
		<Select options={CHARACTERS} bind:value={classId} />
	</Label>

	<div class="row">
		<div class="col-two">
			<Label title="d4 days of food">
				<RollButton
					dice={[1, 'd', 4]}
					on:roll={({ detail }) => ($store.formData.food = detail)}
					slot="roll"
				/>
				<NumberInput placeholder="0" min="1" max="4" bind:value={$store.formData.food} />
			</Label>
		</div>

		<div class="col-two">
			<Label title={`${toDiceString($store.selectedClass.silver)} silver`}>
				<RollButton
					dice={$store.selectedClass.silver}
					on:roll={({ detail }) => ($store.formData.silver = detail)}
					slot="roll"
				/>

				<NumberInput
					placeholder="0"
					min="0"
					max={maxRoll($store.selectedClass.silver)}
					step="10"
					bind:value={$store.formData.silver}
				/>
			</Label>
		</div>
	</div>

	<div class="row">
		<div class="col-two">
			<RollTable die={6} options={tables.tableOne.rows} bind:group={$store.formData.tableOne}>
				<RollButton
					dice={[1, 'd', 6]}
					on:roll={({ detail }) => {
						const index = detail < 2 ? 0 : detail - 1;
						$store.formData.tableOne = tables.tableOne.rows[index].value;
					}}
				/>
			</RollTable>
			<RollTable die={12} options={tables.tableThree.rows} bind:group={$store.formData.tableThree}>
				<RollButton
					dice={[1, 'd', 12]}
					on:roll={({ detail }) =>
						($store.formData.tableThree = tables.tableThree.rows[detail - 1].value)}
				/>
			</RollTable>
		</div>
		<div class="col-two">
			<RollTable die={12} options={tables.tableTwo.rows} bind:group={$store.formData.tableTwo}>
				<RollButton
					dice={[1, 'd', 12]}
					on:roll={({ detail }) =>
						($store.formData.tableTwo = tables.tableTwo.rows[detail - 1].value)}
				/>
			</RollTable>
			<Title title="Weapons">
				<RollTable
					die={$store.selectedClass.weaponTable}
					options={tables.weaponTable.rows}
					bind:group={$store.formData.weapon}
				>
					({$store.selectedClass.weaponTable})
					<RollButton
						dice={[1, 'd', $store.selectedClass.weaponTable]}
						on:roll={({ detail }) =>
							($store.formData.weapon = tables.weaponTable.rows[detail - 1].value)}
					/>
				</RollTable>
			</Title>
		</div>
	</div>

	<Title title="Armor">
		<RollTable
			die={$store.selectedClass.armorTable}
			options={tables.armorTable.rows}
			bind:group={$store.formData.armor}
		>
			<RollButton
				dice={[1, 'd', $store.selectedClass.armorTable]}
				on:roll={({ detail }) => ($store.formData.armor = tables.armorTable.rows[detail - 1].value)}
			/>
		</RollTable>
	</Title>

	<div class="row">
		<div class="col-two">
			<Score
				ability={$store.selectedClass.abilities[0]}
				mod={$store.formData.agility}
				on:change={handleScoreChange}
			/>
		</div>
		<div class="col-two">
			<Score
				ability={$store.selectedClass.abilities[1]}
				mod={$store.formData.presence}
				on:change={handleScoreChange}
			/>
		</div>
		<div class="col-two">
			<Score
				ability={$store.selectedClass.abilities[2]}
				mod={$store.formData.strength}
				on:change={handleScoreChange}
			/>
		</div>
		<div class="col-two">
			<Score
				ability={$store.selectedClass.abilities[3]}
				mod={$store.formData.toughness}
				on:change={handleScoreChange}
			/>
		</div>
	</div>

	<div class="row">
		<div class="col-three">
			<Label
				title={`Hit Points (${toDiceString($store.selectedClass.hitPoints)} + toughness(${
					$store.formData.toughness
				}))`}
			>
				<RollButton
					dice={[...$store.selectedClass.hitPoints, '+', $store.formData.toughness]}
					on:roll={({ detail }) => ($store.formData.hitPoints = detail)}
					slot="roll"
				/>
				<NumberInput
					placeholder="0"
					min="1"
					max={maxRoll(hpDice)}
					bind:value={$store.formData.hitPoints}
				/>
			</Label>
		</div>
	</div>

	<Title title="Terrible Traits">
		<span slot="subtitle">(roll twice)</span>
		<RollTable
			die={20}
			options={tables.terribelTraits.rows}
			bind:group={$store.formData.traits}
			multiple={2}
			alignItems="inline-block"
		>
			<RollButton
				dice={[1, 'd', 20]}
				on:roll={({ detail }) => setTrait(tables.terribelTraits.rows[detail - 1].value)}
			/>
		</RollTable>
	</Title>

	<Title title="Broken Bodies" align="left">
		<RollTable
			die={20}
			options={tables.brokenBodies.rows}
			bind:group={$store.formData.brokenBodies}
			alignItems="inline-block"
		>
			<RollButton
				dice={[1, 'd', 20]}
				on:roll={({ detail }) =>
					($store.formData.brokenBodies = tables.brokenBodies.rows[detail - 1].value)}
			/>
		</RollTable>
	</Title>

	<Title title="Bad Habits">
		<RollTable die={20} options={tables.badHabits.rows} bind:group={$store.formData.badHabits}>
			<RollButton
				dice={[1, 'd', 20]}
				on:roll={({ detail }) =>
					($store.formData.badHabits = tables.badHabits.rows[detail - 1].value)}
			/>
		</RollTable>
	</Title>

	{#if !isEmpty($store.selectedClass.origin)}
		<Title title={`${$store.selectedClass.origin.title}`}>
			<RollTable
				die={$store.selectedClass.origin.dice[2]}
				options={$store.selectedClass.origin.rows}
				bind:group={$store.formData.origin}
			>
				<RollButton
					dice={$store.selectedClass.origin.dice}
					on:roll={({ detail }) =>
						($store.formData.origin = $store.selectedClass.origin.rows[detail - 1].value)}
				/>
			</RollTable>
		</Title>
	{/if}

	<!-- TODO: Show Occult Hermaster Feature as HTML(?) -->
	{#if !isEmpty($store.selectedClass.classFeature)}
		<Title title="Class Feature...">
			<RollTable
				die={$store.selectedClass.classFeature.dice[2]}
				options={$store.selectedClass.classFeature.rows}
				bind:group={$store.formData.classFeature}
			>
				<RollButton
					dice={$store.selectedClass.classFeature.dice}
					on:roll={({ detail }) =>
						($store.formData.classFeature =
							$store.selectedClass.classFeature.rows[detail - 1].value)}
				/>
			</RollTable>
		</Title>
	{/if}

	<Label title="Name this one">
		<Input bind:value={$store.formData.name} />
	</Label>

	<div class="row row-right">
		<div style="text-align:right;">
			&hellip; it will not <Button type="submit" disabled={!$canSubmit}>Save</Button> you
		</div>
	</div>
</Form>

<style>
	/* may want to move to global */
	.banner {
		position: fixed;
		top: 32px;
		left: -63px;
		padding: 0.5em 4rem;
		border-bottom: 1px solid var(--black);
		transform: rotate(-45deg);
		background-color: var(--yellow);
		text-align: center;
	}
</style>
