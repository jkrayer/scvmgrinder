<script lang="ts">
	import { base } from '$app/paths';
	import { invalidateAll } from '$app/navigation';
	import { deleteCharacter } from '$lib/db';
	import SquareButton from './SquareButton.svelte';
	import Confirm from './Confirm.svelte';

	export let character: Required<Character.CharacterData>;

	// TODO: Move to lib and test
	// const snakCase = (s: string): string => s.toLocaleLowerCase().replace(/\s+/g, '_');
	const image: string = `${character.className.toLocaleLowerCase().replace(/\s+/g, '_')}.png`;

	const handleConfirm = () => {
		deleteCharacter(character).then(() => {
			invalidateAll();
		});
	};
</script>

<article class="row cli-row">
	<figure class="figure">
		<img src={image} width="40" height="40" alt={character.className} />
	</figure>
	<div class="title-col">
		<header><h1 class="heading">{character.name}</h1></header>
		<p class="class-name">{character.className}</p>
	</div>
	<div class="button-col">
		<SquareButton
			tag="a"
			href={`${base}/play/${character._id}`}
			icon="play"
			title={`Play ${character.name}`}
		/>
		<Confirm onClick={handleConfirm}>
			<span slot="message"
				>Cast <span class="heading">{character.name}</span> into oblivion?<br />(press
				<span class="heading">escape</span> to save this soul)</span
			>
			<SquareButton color="secondary" icon="minus" title={`Delete ${character.name}`} />
		</Confirm>
	</div>
</article>

<style>
	.cli-row {
		flex-wrap: nowrap;
		align-items: center;
	}
	.figure {
		margin: 0;
	}
	.heading,
	.class-name {
		margin: 0;
	}
	.heading {
		font: 2rem/1 var(--handwriting);
		color: var(--gray);
	}
	.title-col {
		box-sizing: border-box;
		flex-grow: 1;
		padding: 0 0.625rem;
	}
</style>
