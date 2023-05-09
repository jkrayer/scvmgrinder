<script lang="ts">
	export let data: { characters: Required<Character.CharacterData>[] };

	import CharacterListItem from '$lib/components/CharacterListItem.svelte';
</script>

<ol id="class-list" class="clear-list row home-row">
	<li class="home-col"><a href="/create" id="create-character-link">+New Character</a></li>
	{#each data.characters as character}
		<li class="home-col"><CharacterListItem {character} /></li>
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

	.home-row {
		gap: 1.25rem;
	}
	.home-col {
		width: calc(50% - 0.625rem);
	}
</style>
