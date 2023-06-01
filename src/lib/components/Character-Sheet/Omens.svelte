<script lang="ts">
	import Character from './store';
	import Power from './Power.svelte';

	const handleUse = (d: any) => {
		// TODO: Handle Omen
		console.log('detail', d);
	};
</script>

<Power
	title="Omens"
	body="(d4/day) Maximum damage, Reroll, -d6 damage, DR -4, No Crit/Fumble"
	uses={$Character.omens.current}
	on:use={handleUse}
/>
