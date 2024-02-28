<script lang="ts">
	import { useOmen } from '$lib/Character-Sheet/state';
	import Character from './state/store';
	import Power from './Power.svelte';
</script>

<Power
	title="Omens"
	body="(d4/day) Maximum damage, Reroll, -d6 damage, DR -4, No Crit/Fumble"
	uses={$Character.omens.current}
	on:use={useOmen}
/>
