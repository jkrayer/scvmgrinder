<script lang="ts">
	import CharacterStore from '$lib/components/Character-Sheet/store';
	import Header from '$lib/components/Character-Sheet/Header.svelte';
	import Scores from '$lib/components/Character-Sheet/AbilityScores.svelte';
	import Weapons from '$lib/components/Character-Sheet/Weapons.svelte';
	import Equipment from '$lib/components/Character-Sheet/Equipment/Equipment.svelte';

	export let data: { character: Required<Character.CharacterData> };

	CharacterStore.set(data.character);
</script>

{#if $CharacterStore === undefined}
	<!-- TODO ADD LOADING GRAPHIC -->
	wating...
{:else}
	<Header />
	<Scores />
	<Weapons />
	<Equipment />
{/if}
