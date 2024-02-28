<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let body: string;
	export let title: string;
	export let uses: number = 0;

	const dispatch = createEventDispatcher<{ use: string }>();

	const handleClick = () => dispatch('use', title);
</script>

<div class="local-row">
	<div class="local-col">
		<div class="local-row">
			<h2 class="sheet-title">{title}&nbsp;</h2>
			<span class="words">({uses})</span>
		</div>
	</div>
	<div class="local-col">
		<div class="local-row row-right">
			<button class="btn primary button" disabled={uses === 0} on:click={handleClick}>use</button>
		</div>
	</div>
</div>
<p class="words">{body}</p>

<style>
	.local-row {
		display: flex;
		align-items: center;
	}

	.local-col {
		flex: 1 1;
	}

	.words {
		font-size: 0.875rem;
	}

	.button {
		padding: var(--padTiny) var(--padSmall);
		font-size: 0.875em;
	}
</style>
