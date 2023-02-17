<script>
	import Label from './Form/Label.svelte';
	import Input from './Form/Input.svelte';
	/**
	 * @type {{key:string, name:string, dice: [number, "d", number, ("+" | "-")?, number?]}[]}
	 */
	export let scores;

	/**
	 *
	 * @param dice {[number, "d", number, ("+"|"-")?, number?]}
	 */
	const diceToString = (dice) => dice.join('');
</script>

{#each scores as { name, dice }}
	<Label title={`${name} (${diceToString(dice)})`}>
		<Input type="number" />
	</Label>
{/each}
