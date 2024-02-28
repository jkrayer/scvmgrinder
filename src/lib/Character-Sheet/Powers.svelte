<script lang="ts">
	import { decPower } from '$lib/Character-Sheet/state';
	import Character from './state/store';
	import Power from './Power.svelte';
</script>

<Power
	title="Powers"
	body="(d4+Presence/day) Presence DR12, or -d2 HP and no Powers for 1 hr."
	uses={$Character.powers || 0}
	on:use={decPower}
/>
