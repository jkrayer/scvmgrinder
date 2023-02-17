<script>
	import Label from '../components/Form/Label.svelte';
	import Input from '../components/Form/Input.svelte';
	import Select from '../components/Form/Select.svelte';
	import RollTable from '../components/RollTable.svelte';
	import Button from '../components/Button.svelte';
	import ScoreRoller from '../components/ScoreRoller.svelte';

	const standardSilver = '2d6 x 10';

	const eqTableOne = [
		{ dice: [1, 2], value: 'nothing', label: 'nothing' },
		{ dice: [3], value: 'nothing', label: 'backpack for 7 normal-sized items' },
		{ dice: [4], value: 'nothing', label: 'sack for 10 normal-sized items' },
		{ dice: [5], value: 'nothing', label: 'small wagon or one item above of your choice' },
		{ dice: [6], value: 'nothing', label: 'donkey, not bad' }
	];
</script>

<form>
	<Label title="Character Class">
		<Select options={['fighter', 'cleric']} />
	</Label>

	<Label title="d4 days of food">
		<Input type="number" placeholder="0" min="1" max="4" />
	</Label>

	<Label title={`${standardSilver} silver`}>
		<Input type="number" placeholder="0" />
	</Label>

	<RollTable die={6} options={eqTableOne} />

	<ScoreRoller scores={[{ key: 'strength', name: 'Strength', dice: [3, 'd', 6] }]} />

	<Button type="submit">Save This One</Button>
</form>
