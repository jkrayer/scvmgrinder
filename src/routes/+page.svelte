<script lang="ts">
	export let data: { characters: Required<Character.CharacterData>[] };

	import { base, resolveRoute } from '$app/paths';
	import CharacterListItem from '$lib/components/CharacterListItem.svelte';
</script>

<ol id="class-list" class="clear-list row">
	<li class="col-two"><a href="{base}/create" id="create-character-link">+New Character</a></li>
	{#each data.characters as character}
		<li class="col-two"><CharacterListItem {character} /></li>
	{/each}
</ol>

<style>
	#create-character-link,
	#create-character-link:hover,
	#create-character-link:visited {
		font: 2rem/1 var(--handwriting);
		color: var(--gray);
		text-decoration: none;
	}
</style>
