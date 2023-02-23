<script>
	/**
	 * @type {string}
	 */
	export let title;
</script>

<label class="label">
	<div>{title}</div>
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
		margin: var(--pad) 0;
	}
	.label > div:first-of-type {
		padding-bottom: var(--padTiny);
	}
	.label > div:nth-of-type(2) {
		padding-top: var(--padTiny);
		text-align: right;
	}
</style>
