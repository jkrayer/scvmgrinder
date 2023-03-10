<script lang="ts">
	import Label from '../components/Form/Label.svelte';
	import Input from '../components/Form/Input.svelte';
	import NumberInput from '../components/Form/NumberInput.svelte';
	import Select from '../components/Form/Select.svelte';
	import RollTable from '../components/RollTable.svelte';
	import Button from '../components/Button.svelte';
	import Score from '../components/Score.svelte';
	import { maxRoll, toDiceString, rollToScore } from '$lib';
	import store, { setSelectedClass } from './new-character-store';
	import Form from '../components/Form/Form.svelte';
	import characters from './data/characters.json';
	import eqTableOne from './data/tables/one';
	import eqTableTwo from './data/tables/two';
	import eqTableThree from './data/tables/three';
	import weaponTable from './data/tables/weapons';
	import armorTable from './data/tables/armor';
	import terribelTraits from './data/tables/terrible-traits';
	import brokenBodies from './data/tables/broken-bodies';
	import badHabits from './data/tables/bad-habits';
	import Title from '../components/Title.svelte';
	import OptionButton from '../components/OptionButton.svelte';
	import RollButton from '../components/RollButton.svelte';

	// TODO: Move this
	const CHARACTERS = JSON.parse(characters);
	let classId: string = CHARACTERS[0]._id;
	let hpDice: Dice | never[] = [];

	$: {
		console.log('running block one');
		let selectedClass = CHARACTERS.find((x: any) => x._id === classId);
		setSelectedClass(selectedClass);
	}

	$: {
		console.log('running block two');
		const D: [Dice[0], Dice[1], Dice[2]] = $store.selectedClass.hitPoints || [1, 'd', 1];
		const M: [Dice[3], Dice[4]] = ['+', $store.formData.toughness];
		hpDice = [...D, ...M];
	}

	$: console.log('FD', $store.formData);

	const handleScoreChange = ({
		detail: { key, score }
	}: CustomEvent<{ key: AbilityKeys; score: number }>) =>
		($store.formData[key] = rollToScore(score));
</script>

<Form onSubmit={() => null} class="narrow-container">
	<Label title="Character Class">
		<OptionButton
			dice={[1, 'd', 6, '+', 1]}
			options={CHARACTERS}
			on:random={({ detail }) => (classId = detail._id)}
			slot="roll"
		/>
		<Select options={CHARACTERS} bind:value={classId} />
	</Label>

	<div class="flex two-col">
		<div class="flex-col">
			<Label title="d4 days of food">
				<RollButton
					dice={[1, 'd', 4]}
					on:roll={({ detail }) => ($store.formData.food = detail)}
					slot="roll"
				/>
				<NumberInput placeholder="0" min="1" max="4" bind:value={$store.formData.food} />
			</Label>
		</div>

		<div class="flex-col">
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

	<div class="flex">
		<div class="flex-col">
			<RollTable die={6} options={eqTableOne.rows} bind:group={$store.formData.tableOne} />
			<RollTable die={12} options={eqTableThree.rows} bind:group={$store.formData.tableThree} />
		</div>
		<div class="flex-col">
			<RollTable die={12} options={eqTableTwo.rows} bind:group={$store.formData.tableTwo} />
			<Title title="Weapons">
				<RollTable die={10} options={weaponTable.rows} bind:group={$store.formData.weapon} />
			</Title>
		</div>
	</div>

	<Title title="Armor">
		<RollTable die={4} options={armorTable.rows} bind:group={$store.formData.armor} />
	</Title>

	<div class="flex flex2">
		<div class="flex-col">
			<Score
				ability={$store.selectedClass.abilities[0]}
				mod={$store.formData.agility}
				on:change={handleScoreChange}
			/>
		</div>
		<div class="flex-col">
			<Score
				ability={$store.selectedClass.abilities[1]}
				mod={$store.formData.presence}
				on:change={handleScoreChange}
			/>
		</div>
		<div class="flex-col">
			<Score
				ability={$store.selectedClass.abilities[2]}
				mod={$store.formData.strength}
				on:change={handleScoreChange}
			/>
		</div>
		<div class="flex-col">
			<Score
				ability={$store.selectedClass.abilities[3]}
				mod={$store.formData.toughness}
				on:change={handleScoreChange}
			/>
		</div>
	</div>

	<div class="flex">
		<div class="flex-col">
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
			options={terribelTraits.rows}
			bind:group={$store.formData.traits}
			multiple={2}
			alignItems="inline-block"
		/>
	</Title>

	<Title title="Broken Bodies" align="left">
		<RollTable
			die={20}
			options={brokenBodies.rows}
			bind:group={$store.formData.brokenBodies}
			alignItems="inline-block"
		/>
	</Title>

	<Title title="Bad Habits">
		<RollTable die={20} options={badHabits.rows} bind:group={$store.formData.badHabits} />
	</Title>

	<!-- Class Tables -->

	<Label title="Name this one">
		<Input />
	</Label>

	<div class="flex flex-right">
		<div style="text-align:right;">
			&hellip; it will not <Button type="submit">Save</Button> you
		</div>
	</div>
</Form>
