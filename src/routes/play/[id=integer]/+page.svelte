<script lang="ts">
	import CharacterStore from '$lib/Character-Sheet/state/store';
	import Messages from '$lib/Messages/Messages.svelte';
	import Header from '$lib/Character-Sheet/Header.svelte';
	import Scores from '$lib/Character-Sheet/AbilityScores.svelte';
	import Weapons from '$lib/Character-Sheet/Weapons.svelte';
	import Armor from '$lib/Character-Sheet/Armor.svelte';
	import Powers from '$lib/Character-Sheet/Powers.svelte';
	import Omens from '$lib/Character-Sheet/Omens.svelte';
	import Equipment from '$lib/Character-Sheet/Equipment/Equipment.svelte';
	import Features from '$lib/Character-Sheet/Features.svelte';
	import HomeBanner from '$lib/components/HomeBanner.svelte';

	export let data: { character: Required<Character.CharacterData> };

	CharacterStore.set(data.character);
</script>

{#if $CharacterStore === undefined}
	wating...
{:else}
	<HomeBanner />
	<Messages />
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
