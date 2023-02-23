<script lang="ts">
	import Label from '../components/Form/Label.svelte';
	import Input from '../components/Form/Input.svelte';
	import Select from '../components/Form/Select.svelte';
	import RollTable from '../components/RollTable.svelte';
	import Button from '../components/Button.svelte';
	import ScoreRoller from '../components/ScoreRoller.svelte';
	import { toDiceString } from '$lib';
	//
	import characters from './data/characters.json';
	import eqTableOne from './data/tables/one';

	const CHARACTERS = JSON.parse(characters);

	//
	let classId: string = CHARACTERS[0]._id;
	// let tableOne: any;
	// const formData = {};

	$: selectedClass = CHARACTERS.find((x: any) => x._id === classId);

	let formData: any = {
		tableOne: ''
	};

	$: console.log(16, formData);
</script>

<form id="create-character-form" class="narrow-container">
	<Label title="Character Class">
		<Select options={CHARACTERS} bind:value={classId} />
	</Label>

	<div class="flex">
		<div class="flex-col">
			<Label title="d4 days of food">
				<Input type="number" placeholder="0" min="1" max="4" />
			</Label>
		</div>

		<div class="flex-col">
			<Label title={`${toDiceString(selectedClass.silver)} silver`}>
				<Input type="number" placeholder="0" />
			</Label>
		</div>
	</div>

	<div class="flex">
		<div class="flex-col">
			<!-- eq table one -->
			<RollTable die={6} options={eqTableOne.rows} bind:group={formData.tableOne} />
			<!-- eq table three -->
			<!-- <RollTable die={6} options={eqTableOne.rows} /> -->
			<!-- armor table  -->
			<!-- <RollTable die={6} options={eqTableOne.rows} /> -->
		</div>
		<div class="flex-col">
			<!-- eq table two -->
			<RollTable die={6} options={eqTableOne.rows} bind:group={formData.tableOne} />
			<!-- weapon table -->
			<!-- <RollTable die={6} options={eqTableOne.rows} /> -->
		</div>
	</div>

	<ScoreRoller scores={selectedClass.abilities} />

	<Label title={`Hit Points (${toDiceString(selectedClass.hitPoints)} + toughness())`}>
		<Input type="number" placeholder="0" />
	</Label>

	<Label title="Name this one">
		<Input />
		<span slot="comments">&hellip; it will not save you</span>
	</Label>

	<Button type="submit">Save This One</Button>
</form>
