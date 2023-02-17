<script>
	/**
	 * @type {string}
	 */
	export let title;
</script>

<label class="label">
	<div>{title}</div>
	<slot />
</label>

<style>
	.label {
		display: block;
		margin: calc(1.5 * var(--pad)) 0;
	}
	.label > div {
		padding-bottom: var(--padTiny);
	}
</style>
