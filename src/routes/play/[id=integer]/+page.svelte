<script lang="ts">
	import CharacterStore from './components/store';
	import Header from './components/Header.svelte';

	export let data: { character: Required<Character.CharacterData> };

	CharacterStore.set(data.character);
</script>

{#if $CharacterStore === undefined}
	<!-- TODO ADD LOADING GRAPHIC -->
	wating...
{:else}
	<Header />
{/if}
