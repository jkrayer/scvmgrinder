<script lang="ts">
	import Character from './state/store';

	const format = (s: string): string =>
		s
			.split(':')
			.reduce(
				(acc, part, index) => acc + (index === 0 ? `<span class="prefix">${part}: </span>` : part),
				''
			);
</script>

<h2 class="sheet-title">Features</h2>
<ul class="clear-list row">
	{#each $Character.description as d}
		<li class="col-two">
			{#if d.indexOf(':') > -1}
				{@const m = d.split(':')}
				<span class="prefix">{m[0]}:</span>
				{@html m[1]}
			{:else}
				{d}
			{/if}
		</li>
	{/each}
</ul>

<style>
	.prefix {
		font-weight: 700;
		text-transform: capitalize;
	}
</style>
