<script lang="ts">
	import CharacterStore from '../../../lib/components/Character-Sheet/store';
	import Header from '../../../lib/components/Character-Sheet/Header.svelte';

	export let data: { character: Required<Character.CharacterData> };

	CharacterStore.set(data.character);
</script>

{#if $CharacterStore === undefined}
	<!-- TODO ADD LOADING GRAPHIC -->
	wating...
{:else}
	<Header />
{/if}
