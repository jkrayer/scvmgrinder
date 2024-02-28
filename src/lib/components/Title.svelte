<script lang="ts">
	export let title: string;
	export let align: 'left' | 'right' = 'right';

	const rotations: number[] = [-3, -2, -1, 1, 2, 3];
	const index = Math.floor(Math.random() * 6);
	const rotation = rotations[index];
</script>

<section>
	<div class={`title-wrapper ${align}`}>
		<h2 class="h2" style={`transform: rotate(${rotation}deg)`}>
			{#each title.split(/\s/) as word}
				{@html word}<br />
			{/each}
		</h2>
		<slot name="subtitle" />
	</div>
	<slot />
</section>

<style>
	.title-wrapper {
		text-align: right;
		float: right;
	}

	.title-wrapper.left {
		padding-right: 1rem;
		text-align: left;
		float: left;
	}

	.h2 {
		margin: 0.25em 0 0 0;
		font: 2.75rem/1 var(--handwriting);
		color: var(--pink);
	}
</style>
