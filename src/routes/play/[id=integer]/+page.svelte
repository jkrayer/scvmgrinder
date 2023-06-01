<script lang="ts">
	import CharacterStore from '$lib/components/Character-Sheet/store';

	import Armor from '$lib/components/Character-Sheet/Armor.svelte';
	import Equipment from '$lib/components/Character-Sheet/Equipment/Equipment.svelte';
	import Features from '$lib/components/Character-Sheet/Features.svelte';
	import Header from '$lib/components/Character-Sheet/Header.svelte';
	import Omens from '$lib/components/Character-Sheet/Omens.svelte';
	import Powers from '$lib/components/Character-Sheet/Powers.svelte';
	import Scores from '$lib/components/Character-Sheet/AbilityScores.svelte';
	import Weapons from '$lib/components/Character-Sheet/Weapons.svelte';

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
	<Armor />
	<div class="row">
		<div class="col-two">
			<Powers />
		</div>
		<div class="col-two">
			<Omens />
		</div>
	</div>
	<Equipment />
	<Features />
{/if}
