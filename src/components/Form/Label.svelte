<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface $$Props extends HTMLLabelAttributes {
		title: string;
	}

	export let title: string;
</script>

<label class="label" {...$$restProps}>
	<div>{title} <slot name="roll" /></div>
	<slot />
	{#if $$slots.comments}
		<div>
			<slot name="comments" />
		</div>
	{/if}
</label>

<style>
	.label {
		display: block;
	}

	.label > div:first-of-type {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		padding-bottom: var(--padTiny);
	}
	.label > div:nth-of-type(2) {
		padding-top: var(--padTiny);
		text-align: right;
	}
</style>
