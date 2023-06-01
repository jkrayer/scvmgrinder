<script lang="ts">
	import Character from './store';
	import Power from './Power.svelte';

	const handleUse = (d: any) => {
		console.log('detail', d);
	};
</script>

<Power
	title="Powers"
	body="(d4+Presence/day) Presence DR12, or -d2 HP and no Powers for 1 hr."
	uses={$Character.powers || 0}
	on:use={handleUse}
/>
